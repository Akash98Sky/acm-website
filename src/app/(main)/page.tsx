
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Award, GraduationCap } from 'lucide-react';

import type { Resume } from '@/lib/types';
import resumeData from '@/data/resume.json';


const ListItem = ({ primary, secondary }: { primary: string; secondary: string }) => (
  <div className="flex justify-between items-center py-3 border-b">
    <p className="text-sm text-foreground/80">{primary}</p>
    <p className="text-sm text-right text-foreground/60">{secondary}</p>
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
        
        <Section title={resume.interests.title}>
          <div className="flex flex-wrap gap-2">
            {resume.interests.description.split(', ').map((interest, i) => (
              <Badge key={i} variant="secondary" className="text-base">{interest.replace('.', '')}</Badge>
            ))}
          </div>
        </Section>
      </div>

      <Section title="PhD Awardees" icon={Award}>
        <div>
          {resume.awards.map((award, i) => (
            <ListItem key={i} primary={award.awardee} secondary={award.details} />
          ))}
        </div>
      </Section>

      <Section title="PhD Scholars" icon={GraduationCap}>
          <div>
          {resume.references.map((scholar, i) => (
            <ListItem key={i} primary={scholar.name} secondary={scholar.details} />
          ))}
        </div>
      </Section>

      <Section title="Book Chapters">
        <div className="grid md:grid-cols-2 gap-6">
          {resume.publications.bookChapters.map((chapter, i) => (
            <Card key={i} className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg font-semibold leading-tight">{chapter.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{chapter.details}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
