import Image from 'next/image';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import type { Resume, Publication } from '@/lib/types';
import resumeData from '@/data/resume.json';
import journalArticles from '@/data/journal-articles.json';
import conferencePapers from '@/data/conference-papers.json';


const ListItem = ({ primary, secondary }: { primary: string; secondary: string }) => (
  <div className="flex justify-between items-center py-3 border-b">
    <p className="text-sm text-foreground/80">{primary}</p>
    <p className="text-sm text-right text-foreground/60">{secondary}</p>
  </div>
);

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <section className="space-y-4">
    <h2 className="text-2xl font-bold">{title}</h2>
    {children}
  </section>
);

export default function HomePage() {
  const resume: Resume = resumeData;
  const featuredJournal: Publication | undefined = journalArticles[0];
  const featuredConference: Publication | undefined = conferencePapers[0];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="flex flex-col items-center text-center space-y-4">
        <Avatar className="h-28 w-28">
          <AvatarImage src={resume.basics.image} alt={resume.basics.name} data-ai-hint="woman portrait" />
          <AvatarFallback>{resume.basics.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-4xl font-bold">{resume.basics.name}</h1>
          <p className="text-lg text-muted-foreground">{resume.basics.label}</p>
          <p className="text-sm text-muted-foreground">{resume.basics.location}</p>
        </div>
      </header>

      <Section title="About Me">
        <p className="text-foreground/80 leading-relaxed">{resume.basics.summary}</p>
      </Section>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
        <div className="space-y-6">
          <Section title="Education">
            <div>
              {resume.education.map((edu, i) => (
                <ListItem key={i} primary={edu.degree} secondary={`${edu.institution}, ${edu.period}`} />
              ))}
            </div>
          </Section>
          
          <Section title={resume.interests.title}>
            <p className="text-sm text-foreground/80">{resume.interests.description}</p>
          </Section>
        </div>
        
        <div className="space-y-6">
          <Section title="PhD Awardees">
            <div>
              {resume.awards.map((award, i) => (
                <ListItem key={i} primary={award.awardee} secondary={award.details} />
              ))}
            </div>
          </Section>

          <Section title="PhD Scholars">
             <div>
              {resume.references.map((scholar, i) => (
                <ListItem key={i} primary={scholar.name} secondary={scholar.details} />
              ))}
            </div>
          </Section>
        </div>
      </div>

      <Section title="Book Chapters">
        <div className="grid md:grid-cols-2 gap-6">
          {resume.publications.bookChapters.map((chapter, i) => (
            <Card key={i} className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl font-semibold leading-tight">{chapter.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{chapter.details}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Featured">
        <div className="grid md:grid-cols-2 gap-6">
          {featuredJournal && (
            <Card>
              <CardContent className="p-4">
                <Image src="https://placehold.co/600x400.png" data-ai-hint="abstract art" alt={featuredJournal.title} width={600} height={400} className="rounded-md mb-4 aspect-[4/3] object-cover" />
                <h3 className="font-semibold">{featuredJournal.title}</h3>
                <p className="text-sm text-muted-foreground">Published in Journal of Design Studies</p>
              </CardContent>
            </Card>
          )}
          {featuredConference && (
             <Card>
              <CardContent className="p-4">
                <Image src="https://placehold.co/600x400.png" data-ai-hint="abstract curve" alt={featuredConference.title} width={600} height={400} className="rounded-md mb-4 aspect-[4/3] object-cover" />
                <h3 className="font-semibold">{featuredConference.title}</h3>
                <p className="text-sm text-muted-foreground">Presented at the Interactions Design Conference</p>
              </CardContent>
            </Card>
          )}
        </div>
      </Section>
    </div>
  );
}
