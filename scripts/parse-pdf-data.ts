import path from 'path';
import fs from 'fs';
import pdf from 'pdf-parse';
import { genkit } from 'genkit';
import googleAI from '@genkit-ai/googleai';
import z from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { configDotenv } from 'dotenv';
import { tavily } from "@tavily/core";
import Fuse from 'fuse.js';

configDotenv();

const ai = genkit({
  plugins: [googleAI()],
  model: googleAI.model('gemini-2.5-flash'),
});

const BookChapterSchema = z.object({
  title: z.string(),
  details: z.string(),
});

const PublicationSchema = z.object({
  title: z.string(),
  authors: z.array(z.string()),
  year: z.number(),
  url: z.string().optional(),
  doi: z.string().optional(),
});

const ConferencePaperSchema = PublicationSchema.extend({
  conference: z.string().describe('Conference name'),
  category: z.enum([
    "Natural Language Processing",
    "Information Retrieval",
    "Sentiment Analysis",
    "Opinion Mining",
    "Soft Computing",
    "Fuzzy Logic",
    "Neural Networks",
    "Big Data Analytics"
  ]).describe('Category of the conference paper'),
});

const JournalArticleSchema = PublicationSchema.extend({
  journal: z.string().describe('Journal name'),
});

async function extractTextFromPDF(pdfPath: string): Promise<string> {
  try {
    const pdfBuffer = fs.readFileSync(pdfPath);
    const { text } = await pdf(pdfBuffer);
    return text;
  } catch (error) {
    console.error('Error reading PDF file:', error);
    throw new Error('Failed to read PDF file');
  }
}

async function updatePublicationUrls<T extends z.infer<typeof PublicationSchema>>(publications: T[], existingData: T[] = []): Promise<T[]> {
  const tavilyClient = tavily({ apiKey: process.env.TAVILY_API_KEY });
  const batchSize = 5; // Adjust batch size as needed
  const allowedHosts = [
    'acm.org',
    'ieee.org',
    'springer.com',
    'sciencedirect.com',
    'jstor.org',
    'tandfonline.com',
    'cambridge.org',
    'oxfordjournals.org',
    'mdpi.com',
    'frontiersin.org',
    'arxiv.org',
    'biorxiv.org',
    'pnas.org',
    'nature.com',
    'sciencemag.org',
    'annualreviews.org',
    'aps.org',
    'elsevier.com',
    'wiley.com',
    'sagepub.com',
    'researchgate.net',
    'academia.edu',
    'google.com',
    'bcrecapc.ac.in',
  ];

  const chunks: T[][] = [];

  for (let i = 0; i < publications.length; i += batchSize) {
    chunks.push(publications.slice(i, i + batchSize).filter(pub => pub.year > 2020));
  }

  const extractFromExistingData = (publication: T): string | undefined => {
    const existingPublication = existingData.find(p =>
      p.title.trim().toLocaleLowerCase() === publication.title.trim().toLocaleLowerCase() &&
      p.year === publication.year
    );
    return existingPublication?.url;
  };

  const extractFromTavily = async (publication: T): Promise<string | undefined> => {
    const slug = `${publication.title} - ${publication.authors[0]} - ${publication.year}`;
    const response = await tavilyClient.search(
      slug,
      {
        maxResults: 5,
        locale: 'en',
        timeout: 3000, // 3 seconds timeout
      }
    );
    const fuse = new Fuse(
      response.results || [], {
      keys: ['title', 'content'],
      isCaseSensitive: false,
      threshold: 0.8, // Adjust threshold for fuzzy matching
      minMatchCharLength: 3, // Minimum characters to match
    });

    return response.results?.find(result => {
      return (
        result.score > 0.7 ||
        publication.authors.some(author => fuse.search(author).length > 0)
      ) &&
        allowedHosts.some(host => result.url.includes(host));
    })?.url;
  };

  for (const chunk of chunks) {
    const tasks: Promise<void>[] = chunk.map(async publication => {
      const url = publication.url || extractFromExistingData(publication) || await extractFromTavily(publication);
      if (url) {
        publication.url = url;
      }
    });

    await Promise.all(tasks);
    console.log(`Processed ${chunk.length} publications for URL extraction.`);
  }

  return publications;
}

async function extractBookChapters(pdfText: string, outputPath: string) {
  try {
    const prompt = `
      You are an expert at extracting structured data from academic publications.
      Carefully read the provided PDF content and extract all book chapters.
      The output should be a JSON array where each object strictly follows this schema:
      ${zodToJsonSchema(BookChapterSchema)}
      Ensure the JSON output is valid and strictly adheres to the schema.
      If a field is not found for a chapter, omit it from that chapter's object.
      
      PDF Content:
      ${pdfText}
    `;

    const response = await ai.generate({
      prompt,
      output: { format: 'json', schema: z.array(BookChapterSchema).describe('Book Chapters') },
    });

    const extractedData = response.output;

    if (!extractedData || !Array.isArray(extractedData) || !extractedData.every(item => BookChapterSchema.safeParse(item).success)) {
      throw new Error('Extracted data does not match the expected schema');
    }

    fs.writeFileSync(outputPath, JSON.stringify(extractedData, null, 2));
    console.log(`Extracted book chapters data saved to ${outputPath}`);
  } catch (error) {
    console.error('Error extracting book chapters data:', error);
  }
}

async function extractJournalArticles(pdfText: string, outputPath: string) {
  const journalArticleHeaderIndex = pdfText.indexOf('Journal Articles');
  const conferencePaperHeaderIndex = pdfText.indexOf('Conference Paper', journalArticleHeaderIndex);
  if (journalArticleHeaderIndex === -1) {
    console.warn('No journal articles section found in the PDF.');
    return;
  }

  try {
    const prompt = `
      You are an expert at extracting structured data from academic publications.
      Carefully read the provided PDF content and extract all journal articles.
      The output should be a JSON array where each object strictly follows this schema:
      ${zodToJsonSchema(JournalArticleSchema)}
      Ensure the JSON output is valid and strictly adheres to the schema.
      If a field is not found for an article, omit it from that article's object.
      
      PDF Content:
      ${pdfText.slice(journalArticleHeaderIndex, conferencePaperHeaderIndex !== -1 ? conferencePaperHeaderIndex : undefined)}
    `;

    const response = await ai.generate({
      prompt,
      output: { format: 'json', schema: z.array(JournalArticleSchema).describe('Journal Articles') },
    });

    const extractedData = response.output;

    if (!extractedData || !Array.isArray(extractedData) || !extractedData.every(item => JournalArticleSchema.safeParse(item).success)) {
      throw new Error('Extracted data does not match the expected schema');
    }

    const existingData = fs.existsSync(outputPath) ? JSON.parse(fs.readFileSync(outputPath, 'utf-8')) : [];
    const updatedData = await updatePublicationUrls(extractedData, existingData);

    fs.writeFileSync(outputPath, JSON.stringify(updatedData, null, 2));
    console.log(`Extracted journal articles data saved to ${outputPath}`);
  } catch (error) {
    console.error('Error extracting journal articles data:', error);
  }
}

async function extractConferencePapers(pdfText: string, outputPath: string) {
  const conferencePaperHeaderIndex = pdfText.indexOf('Conference Paper');
  if (conferencePaperHeaderIndex === -1) {
    console.warn('No conference papers section found in the PDF.');
    return;
  }

  try {
    const prompt = `
      You are an expert at extracting structured data from academic publications.
      Carefully read the provided PDF content and extract all conference papers.
      The output should be a JSON array where each object strictly follows this schema:
      ${zodToJsonSchema(ConferencePaperSchema)}
      Ensure the JSON output is valid and strictly adheres to the schema.
      If a field is not found for a paper, omit it from that paper's object.
      
      PDF Content:
      ${pdfText.slice(conferencePaperHeaderIndex)}
    `;

    const response = await ai.generate({
      prompt,
      output: { format: 'json', schema: z.array(ConferencePaperSchema).describe('Conference Papers') },
    });

    const extractedData = response.output;

    if (!extractedData || !Array.isArray(extractedData) || !extractedData.every(item => ConferencePaperSchema.safeParse(item).success)) {
      throw new Error('Extracted data does not match the expected schema');
    }

    const existingData = fs.existsSync(outputPath) ? JSON.parse(fs.readFileSync(outputPath, 'utf-8')) : [];
    const updatedData = await updatePublicationUrls(response.output, existingData);

    fs.writeFileSync(outputPath, JSON.stringify(updatedData, null, 2));
    console.log(`Extracted conference papers data saved to ${outputPath}`);
  } catch (error) {
    console.error('Error extracting conference papers data:', error);
  }
}

async function extract() {
  const pdfFilePath = path.join('EMP_1965_AbhoyChandMondal.pdf');
  const bookChaptersDataFilePath = path.join('src', 'data', 'book-chapters.json');
  const conferencePapersDataFilePath = path.join('src', 'data', 'conference-papers.json');
  const journalArticlesDataFilePath = path.join('src', 'data', 'journal-articles.json');

  const pdfText = await extractTextFromPDF(pdfFilePath);
  await extractBookChapters(pdfText, bookChaptersDataFilePath);
  await extractJournalArticles(pdfText, journalArticlesDataFilePath);
  await extractConferencePapers(pdfText, conferencePapersDataFilePath);
}

extract()
  .then(() => console.log('All data extraction tasks completed successfully.'))
  .catch(error => console.error('An error occurred during data extraction:', error));
