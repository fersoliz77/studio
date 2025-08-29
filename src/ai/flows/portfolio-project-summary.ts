// src/ai/flows/portfolio-project-summary.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating professional-sounding descriptions for portfolio projects using AI.
 *
 * - generateProjectSummary - A function that generates a portfolio project description.
 * - GenerateProjectSummaryInput - The input type for the generateProjectSummary function.
 * - GenerateProjectSummaryOutput - The return type for the generateProjectSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectSummaryInputSchema = z.object({
  projectName: z.string().describe('The name of the project.'),
  keywords: z.string().describe('Keywords describing the project, separated by commas.'),
});
export type GenerateProjectSummaryInput = z.infer<typeof GenerateProjectSummaryInputSchema>;

const GenerateProjectSummaryOutputSchema = z.object({
  summary: z.string().describe('A professional-sounding description of the project.'),
});
export type GenerateProjectSummaryOutput = z.infer<typeof GenerateProjectSummaryOutputSchema>;

export async function generateProjectSummary(input: GenerateProjectSummaryInput): Promise<GenerateProjectSummaryOutput> {
  return generateProjectSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectSummaryPrompt',
  input: {schema: GenerateProjectSummaryInputSchema},
  output: {schema: GenerateProjectSummaryOutputSchema},
  prompt: `You are a professional copywriter specializing in creating compelling portfolio project descriptions.

  Based on the following project name and keywords, generate a professional-sounding description of the project.

  Project Name: {{{projectName}}}
  Keywords: {{{keywords}}}
  `,
});

const generateProjectSummaryFlow = ai.defineFlow(
  {
    name: 'generateProjectSummaryFlow',
    inputSchema: GenerateProjectSummaryInputSchema,
    outputSchema: GenerateProjectSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
