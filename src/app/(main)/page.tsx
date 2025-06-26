
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

import type { Resume } from '@/lib/types';
import resumeData from '@/data/resume.json';


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
            <div className="flex flex-wrap gap-2">
              {resume.interests.description.split(', ').map((interest, i) => (
                <Badge key={i} variant="secondary" className="text-sm">{interest.replace('.', '')}</Badge>
              ))}
            </div>
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
    </div>
  );
}
