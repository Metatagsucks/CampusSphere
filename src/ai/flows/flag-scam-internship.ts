'use server';
/**
 * @fileOverview AI agent to scan and flag suspicious internship postings.
 *
 * - flagScamInternship - Function to detect potential internship scams.
 * - FlagScamInternshipInput - Input type for the flagScamInternship function.
 * - FlagScamInternshipOutput - Return type for the flagScamInternship function.
 */

import {ai} from '@/ai/genkit';
import {
  FlagScamInternshipInputSchema,
  FlagScamInternshipOutputSchema,
  type FlagScamInternshipInput,
  type FlagScamInternshipOutput,
} from '@/ai/types';

export type { FlagScamInternshipInput, FlagScamInternshipOutput };

export async function flagScamInternship(input: FlagScamInternshipInput): Promise<FlagScamInternshipOutput> {
  return flagScamInternshipFlow(input);
}

const prompt = ai.definePrompt({
  name: 'flagScamInternshipPrompt',
  input: {schema: FlagScamInternshipInputSchema},
  output: {schema: FlagScamInternshipOutputSchema},
  prompt: `You are an AI-powered scam detection agent specializing in identifying fraudulent internship postings.

  Analyze the provided internship description and determine the likelihood of it being a scam.

  Provide a boolean value for isScam, a confidence score (0-1) for confidenceScore, and a detailed explanation for reason.

  Internship Description: {{{internshipDescription}}}`,  
});

const flagScamInternshipFlow = ai.defineFlow(
  {
    name: 'flagScamInternshipFlow',
    inputSchema: FlagScamInternshipInputSchema,
    outputSchema: FlagScamInternshipOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
