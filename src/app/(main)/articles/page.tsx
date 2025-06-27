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
import journalArticles from '@/data/journal-articles.json';
import conferencePapers from '@/data/conference-papers.json';
import type { Publication } from '@/lib/types';

export default function ArticlesPage() {
  const allPublications: Publication[] = [...journalArticles, ...conferencePapers].sort((a, b) => b.year - a.year);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          Articles & Publications
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A collection of my published work, including peer-reviewed journal articles and conference papers.
        </p>
      </header>
      <div className="space-y-6">
        {allPublications.map((item, index) => (
          <Card key={index} className="transition-shadow duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">
                 <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary/80 transition-colors"
                >
                  {item.title}
                </a>
              </CardTitle>
              <CardDescription className="pt-2">
                {item.authors.join(', ')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {item.journal ? (
                  <em>{item.journal}</em>
                ) : (
                  <em>{item.conference}</em>
                )}
                , {item.year}
              </p>
            </CardContent>
             <CardFooter className="gap-4">
              <Button asChild>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Publication
                </a>
              </Button>
               {item.doi && (
                <Button asChild variant="link">
                  <a href={`https://doi.org/${item.doi}`} target="_blank" rel="noopener noreferrer">
                    DOI: {item.doi}
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
