
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Award, GraduationCap } from 'lucide-react';
import type { ComponentType } from 'react';
import type { BookChapter, Resume } from '@/lib/types';

import resumeData from '@/data/resume.json';
import bookChaptersData from '@/data/book-chapters.json';


const ListItem = ({ primary, secondary, icon: Icon }: { primary: string; secondary: string; icon?: ComponentType<{ className?: string }> }) => (
  <div className="flex items-center gap-4 py-3 border-b">
    {Icon && <Icon className="h-5 w-5 text-primary shrink-0" />}
    <div className="flex-1 flex justify-between items-center">
      <p className="text-sm text-foreground/80">{primary}</p>
      <p className="text-sm text-right text-foreground/60">{secondary}</p>
    </div>
  </div>
);

const Section = ({ title, icon: Icon, children }: { title: string, icon?: React.ComponentType<{ className?: string }>, children: React.ReactNode }) => (
  <section className="space-y-4">
    <div className="flex items-center gap-3">
      {Icon && <Icon className="h-6 w-6 text-primary" />}
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
    {children}
  </section>
);

export default function HomePage() {
  const resume: Resume = resumeData;
  const bookChapters: BookChapter[] = bookChaptersData;

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="flex flex-col items-center text-center space-y-4">
        <Image
          src={resume.basics.image}
          alt={resume.basics.name}
          width={160}
          height={240}
          className="rounded-lg shadow-xl object-cover"
          data-ai-hint="man portrait"
          priority
        />
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
        <Section title="Education">
          <div>
            {resume.education.map((edu, i) => (
              <ListItem key={i} primary={edu.degree} secondary={`${edu.institution}, ${edu.period}`} />
            ))}
          </div>
        </Section>

        <Section title="Research Interests">
          <div className="flex flex-wrap gap-2">
            {resume.researchInterests.map((interest, i) => (
              <Badge key={i} variant="secondary" className="text-base">{interest.replace('.', '')}</Badge>
            ))}
          </div>
        </Section>
      </div>

      <Section title="PhD Awardees">
        <div>
          {resume.guided.awardees.map((awardee, i) => (
            <ListItem key={i} primary={awardee.name} secondary={awardee.thesisTitle} icon={Award} />
          ))}
        </div>
      </Section>

      <Section title="PhD Scholars">
        <div>
          {resume.guided.scholars.map((scholar, i) => (
            <ListItem key={i} primary={scholar.name} secondary={scholar.thesisTitle} icon={GraduationCap} />
          ))}
        </div>
      </Section>

      <Section title="Book Chapters">
        <div className="grid md:grid-cols-2 gap-6">
          {bookChapters.map((chapter, i) => (
            <Card key={i} className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg font-semibold leading-tight">
                  {chapter.title}
                </CardTitle>
                <CardDescription className='pt-1'>
                  <p className="text-sm text-muted-foreground">{chapter.details}</p>
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
