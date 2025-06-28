'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BanIcon, ExternalLink, Search } from 'lucide-react';
import papers from '@/data/conference-papers.json';
import type { ConferencePaper } from '@/lib/types';

const ITEMS_PER_PAGE = 5;

export default function ConferencePapersPage() {
  const typedPapers: ConferencePaper[] = useMemo(() => [...papers].sort((a, b) => b.year - a.year), []);

  const categories = useMemo(() => {
    const allCategories = typedPapers.map(paper => paper.category).filter(Boolean);
    const uniqueCategories = [...new Set(allCategories as string[])];
    return ['All', ...uniqueCategories.sort()];
  }, [typedPapers]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPapers = useMemo(() => {
    let filtered = typedPapers;

    if (activeCategory !== 'All') {
      filtered = filtered.filter((paper) => paper.category === activeCategory);
    }
    
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (paper) =>
          paper.title.toLowerCase().includes(lowercasedTerm) ||
          (paper.conference && paper.conference.toLowerCase().includes(lowercasedTerm)) ||
          paper.authors.some((author) => author.toLowerCase().includes(lowercasedTerm))
      );
    }
    
    return filtered;
  }, [typedPapers, searchTerm, activeCategory]);

  const totalPages = Math.ceil(filteredPapers.length / ITEMS_PER_PAGE);

  const currentPapers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPapers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPapers, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers: (number | string)[] = [];
    const pageRangeDisplayed = 1;

    if (totalPages > 0) pageNumbers.push(1);

    if (currentPage > pageRangeDisplayed + 2) {
      pageNumbers.push('...');
    }

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

    if (totalPages > 1 && !pageNumbers.includes(totalPages)) {
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
        <h1 className="text-4xl font-bold tracking-tight">Conference Papers</h1>
        <p className="text-lg text-muted-foreground">
          Explore my published conference papers, showcasing my research contributions and insights in various fields.
        </p>
      </header>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search papers by title, conference, or keywords"
          className="pl-10 h-12"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? 'secondary' : 'ghost'}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Recent Papers</h2>
        <div className="space-y-6">
          {currentPapers.length > 0 ? (
            currentPapers.map((paper, index) => (
              <Card key={index} className="transition-shadow duration-300 hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    <a href={paper.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary/80 transition-colors">
                      {paper.title}
                    </a>
                  </CardTitle>
                  <CardDescription>
                    <span>Authors: {paper.authors.join(', ')}</span>
                    <p className="text-sm text-muted-foreground pt-2">
                      Presented at <em>{paper.conference}</em>, {paper.year}
                    </p>
                  </CardDescription>
                </CardHeader>
                <CardFooter className="gap-4">
                  <Button asChild disabled={!paper.url} variant={paper.url ? 'default' : 'outline'}>
                    <a href={paper.url} target="_blank" rel="noopener noreferrer">
                      {paper.url ? <ExternalLink className="mr-2 h-4 w-4" /> :
                        <BanIcon className="mr-1 h-4 w-4" />}
                      View Paper
                    </a>
                  </Button>
                  {paper.doi && (
                    <Button asChild variant="link">
                      <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener noreferrer">
                        DOI: {paper.doi}
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground text-center py-8">No papers found.</p>
          )}
        </div>
      </section>
      
      {renderPagination()}
    </div>
  );
}
