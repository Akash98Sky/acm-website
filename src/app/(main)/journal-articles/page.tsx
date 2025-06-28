'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import journalArticles from '@/data/journal-articles.json';
import type { JournalArticle } from '@/lib/types';
import { ExternalLink, Search } from 'lucide-react';

const ITEMS_PER_PAGE = 5;

export default function JournalArticlesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const allPublications: JournalArticle[] = useMemo(() => [...journalArticles].sort((a, b) => b.year - a.year), []);

  const filteredPublications = useMemo(() => {
    if (!searchTerm) return allPublications;
    return allPublications.filter((pub) =>
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pub.journal && pub.journal.toLowerCase().includes(searchTerm.toLowerCase())) ||
      pub.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [allPublications, searchTerm]);

  const totalPages = Math.ceil(filteredPublications.length / ITEMS_PER_PAGE);

  const currentPublications = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPublications.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPublications, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers: (number | string)[] = [];
    const pageRangeDisplayed = 1;

    // Always show the first page
    pageNumbers.push(1);

    // Ellipsis logic
    if (currentPage > pageRangeDisplayed + 2) {
      pageNumbers.push('...');
    }

    // Pages around current page
    const startPage = Math.max(2, currentPage - pageRangeDisplayed);
    const endPage = Math.min(totalPages - 1, currentPage + pageRangeDisplayed);

    for (let i = startPage; i <= endPage; i++) {
      if (!pageNumbers.includes(i)) {
        pageNumbers.push(i);
      }
    }

    if (currentPage < totalPages - (pageRangeDisplayed + 1)) {
        pageNumbers.push('...');
    }

    // Always show the last page
    if (totalPages > 1) {
        pageNumbers.push(totalPages);
    }
    
    const uniquePageNumbers = [...new Set(pageNumbers)];


    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
          {uniquePageNumbers.map((p, i) => (
            <PaginationItem key={`${p}-${i}`}>
              {p === '...' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(p as number);
                  }}
                  isActive={currentPage === p}
                >
                  {p}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
               className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };
  
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Journal Articles</h1>
        <p className="text-lg text-muted-foreground">
          A collection of my published works and research contributions.
        </p>
      </header>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search articles by title or keyword"
          className="pl-10 h-12"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Recent Publications</h2>
        <div className="space-y-6">
          {currentPublications.length > 0 ? (
            currentPublications.map((item, index) => (
              <Card key={index} className="transition-shadow duration-300 hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary/80 transition-colors"
                    >
                      {item.title}
                    </a>
                  </CardTitle>
                  <CardDescription>
                    <span>Authors: {item.authors.join(', ')}</span>
                    <p className="text-sm text-muted-foreground pt-2">
                      <em>{item.journal}</em>, {item.year}
                    </p>
                  </CardDescription>
                </CardHeader>
                <CardFooter className="gap-4">
                  <Button asChild>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Read Article
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
            ))
          ) : (
            <p className="text-muted-foreground text-center py-8">No publications found.</p>
          )}
        </div>
      </section>

      {renderPagination()}
    </div>
  );
}
