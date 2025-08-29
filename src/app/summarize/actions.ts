'use server';

import { generateProjectSummary, GenerateProjectSummaryInput, GenerateProjectSummaryOutput } from '@/ai/flows/portfolio-project-summary';

export async function summarizeProjectAction(input: GenerateProjectSummaryInput): Promise<GenerateProjectSummaryOutput> {
  return generateProjectSummary(input);
}
