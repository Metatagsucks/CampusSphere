'use server';

/**
 * @fileOverview Provides a flow to summarize student reviews and ratings for internships or courses.
 *
 * - summarizeReviews - A function that summarizes reviews for a given item.
 * - SummarizeReviewsInput - The input type for the summarizeReviews function, including reviews and ratings.
 * - SummarizeReviewsOutput - The return type for the summarizeReviews function, providing a concise summary.
 */

import {ai} from '@/ai/genkit';
import {
  SummarizeReviewsInputSchema,
  SummarizeReviewsOutputSchema,
  type SummarizeReviewsInput,
  type SummarizeReviewsOutput,
} from '@/ai/types';

export type { SummarizeReviewsInput, SummarizeReviewsOutput };

export async function summarizeReviews(input: SummarizeReviewsInput): Promise<SummarizeReviewsOutput> {
  return summarizeReviewsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeReviewsPrompt',
  input: {schema: SummarizeReviewsInputSchema},
  output: {schema: SummarizeReviewsOutputSchema},
  prompt: `You are an AI assistant that summarizes student reviews and ratings for {{itemType}}s.

  Summarize the following reviews for the {{itemType}} named {{itemName}}:

  {{#each reviews}}
  Review:
  Rating: {{this.rating}}
  Text: {{this.text}}
  {{/each}}
  \n\
  Provide a concise summary of the reviews, highlighting the overall sentiment and key points.`, // added keypoints
});

const summarizeReviewsFlow = ai.defineFlow(
  {
    name: 'summarizeReviewsFlow',
    inputSchema: SummarizeReviewsInputSchema,
    outputSchema: SummarizeReviewsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      return {
        summary: 'Could not generate a summary at this time. Please try again later.',
      };
    }
    return output;
  }
);
