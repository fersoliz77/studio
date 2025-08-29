import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SummaryForm } from './summary-form';
import { ArrowLeft } from 'lucide-react';

export default function SummarizePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <Button asChild variant="ghost">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Link>
        </Button>
      </div>
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary font-headline">AI Portfolio Summary Generator</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Generate a professional-sounding summary for your portfolio projects using AI.
          </p>
        </div>
        <SummaryForm />
      </div>
    </div>
  );
}
