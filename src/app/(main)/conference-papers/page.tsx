import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import papers from '@/data/conference-papers.json';
import type { Publication } from '@/lib/types';

export default function ConferencePapersPage() {
  const typedPapers: Publication[] = papers;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-headline text-4xl font-bold tracking-tight lg:text-5xl">
          Conference Papers
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A selection of my work presented at academic conferences.
        </p>
      </header>
      <div className="space-y-6">
        {typedPapers.map((paper, index) => (
          <Card key={index} className="transition-shadow duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">
                 <a
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {paper.title}
                </a>
              </CardTitle>
              <CardDescription className="pt-2">
                {paper.authors.join(', ')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Presented at <em>{paper.conference}</em>, {paper.year}
              </p>
            </CardContent>
             <CardFooter>
              <Button asChild>
                <a href={paper.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Paper
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
