import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import projectsData from '@/data/projects.json';
import type { Project } from '@/lib/types';

export default function ProjectsPage() {
  const projects: Project[] = projectsData;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          Projects
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A selection of my projects.
        </p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Link href={project.url} key={index}>
            <Card className="h-full transition-shadow duration-300 hover:shadow-xl">
              <CardContent className="p-4">
                <Image
                  src={project.image}
                  data-ai-hint={project.imageHint}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="rounded-md mb-4 w-full object-cover aspect-[4/3]"
                />
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
