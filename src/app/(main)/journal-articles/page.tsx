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
import articles from '@/data/journal-articles.json';
import type { Publication } from '@/lib/types';

export default function JournalArticlesPage() {
  const typedArticles: Publication[] = articles;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-headline text-4xl font-bold tracking-tight lg:text-5xl">
          Journal Articles
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A collection of my published peer-reviewed journal articles.
        </p>
      </header>
      <div className="space-y-6">
        {typedArticles.map((article, index) => (
          <Card key={index} className="transition-shadow duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {article.title}
                </a>
              </CardTitle>
              <CardDescription className="pt-2">
                {article.authors.join(', ')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                <em>{article.journal}</em>, {article.year}
              </p>
            </CardContent>
            <CardFooter className="gap-4">
              <Button asChild>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Article
                </a>
              </Button>
              {article.doi && (
                <Button asChild variant="link">
                  <a href={`https://doi.org/${article.doi}`} target="_blank" rel="noopener noreferrer">
                    DOI: {article.doi}
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
