'use server';
/**
 * @fileOverview AI agent to scan and flag suspicious internship postings.
 *
 * - flagScamInternship - Function to detect potential internship scams.
 * - FlagScamInternshipInput - Input type for the flagScamInternship function.
 * - FlagScamInternshipOutput - Return type for the flagScamInternship function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FlagScamInternshipInputSchema = z.object({
  internshipDescription: z
    .string()
    .describe('The full description of the internship posting.'),
});
export type FlagScamInternshipInput = z.infer<typeof FlagScamInternshipInputSchema>;

const FlagScamInternshipOutputSchema = z.object({
  isScam: z
    .boolean()
    .describe(
      'A boolean value indicating whether the internship is likely a scam (true) or not (false).'      
    ),
  confidenceScore: z
    .number()
    .describe(
      'A numerical score (0-1) indicating the confidence level of the scam detection. Higher values indicate higher confidence in the scam detection.'
    ),
  reason: z
    .string()
    .describe(
      'A detailed explanation of why the internship is flagged as a potential scam, including specific red flags or suspicious patterns found in the description.'
    ),
});

export type FlagScamInternshipOutput = z.infer<typeof FlagScamInternshipOutputSchema>;

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
