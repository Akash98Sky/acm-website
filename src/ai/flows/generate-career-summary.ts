'use server';

/**
 * @fileOverview An AI agent to generate a career summary based on JSON Resume data.
 *
 * - generateCareerSummary - A function that generates a career summary.
 * - GenerateCareerSummaryInput - The input type for the generateCareerSummary function.
 * - GenerateCareerSummaryOutput - The return type for the generateCareerSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCareerSummaryInputSchema = z.object({
  resumeData: z.string().describe('JSON Resume data as a string.'),
});
export type GenerateCareerSummaryInput = z.infer<typeof GenerateCareerSummaryInputSchema>;

const GenerateCareerSummaryOutputSchema = z.object({
  careerSummary: z.string().describe('A compelling career summary.'),
});
export type GenerateCareerSummaryOutput = z.infer<typeof GenerateCareerSummaryOutputSchema>;

export async function generateCareerSummary(input: GenerateCareerSummaryInput): Promise<GenerateCareerSummaryOutput> {
  return generateCareerSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCareerSummaryPrompt',
  input: {schema: GenerateCareerSummaryInputSchema},
  output: {schema: GenerateCareerSummaryOutputSchema},
  prompt: `You are a career expert specializing in writing compelling career summaries.

  Based on the following JSON Resume data, generate a concise and engaging career summary that highlights the key skills, experiences, and achievements of the candidate.

  JSON Resume Data: {{{resumeData}}}
  `,
});

const generateCareerSummaryFlow = ai.defineFlow(
  {
    name: 'generateCareerSummaryFlow',
    inputSchema: GenerateCareerSummaryInputSchema,
    outputSchema: GenerateCareerSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
