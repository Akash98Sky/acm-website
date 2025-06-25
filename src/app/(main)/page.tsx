import { generateCareerSummary } from '@/ai/flows/generate-career-summary';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import resume from '@/data/resume.json';
import type { Resume } from '@/lib/types';

export default async function HomePage() {
  const resumeData: Resume = resume;

  let careerSummary = "Could not generate summary.";
  try {
    const summaryResult = await generateCareerSummary({
      resumeData: JSON.stringify(resumeData),
    });
    careerSummary = summaryResult.careerSummary;
  } catch (error) {
    console.error("Failed to generate career summary:", error);
  }


  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-headline text-4xl font-bold tracking-tight lg:text-5xl">
          About Me
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          An introduction to my professional journey and expertise.
        </p>
      </header>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">AI-Powered Career Summary</CardTitle>
          <CardDescription>A concise overview generated from my resume data.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-base leading-relaxed whitespace-pre-line">
            {careerSummary}
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Biography</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base leading-relaxed">
            {resumeData.basics.summary}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
