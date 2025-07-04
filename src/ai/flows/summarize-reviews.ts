'use server';

/**
 * @fileOverview Provides a flow to summarize student reviews and ratings for internships or courses.
 *
 * - summarizeReviews - A function that summarizes reviews for a given item.
 * - SummarizeReviewsInput - The input type for the summarizeReviews function, including reviews and ratings.
 * - SummarizeReviewsOutput - The return type for the summarizeReviews function, providing a concise summary.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeReviewsInputSchema = z.object({
  reviews: z.array(
    z.object({
      text: z.string().describe('The text of the review.'),
      rating: z.number().describe('The rating given in the review.'),
    })
  ).describe('An array of student reviews with text and rating.'),
  itemType: z.enum(['internship', 'course']).describe('The type of item being reviewed.'),
  itemName: z.string().describe('The name of the item being reviewed.'),
});
export type SummarizeReviewsInput = z.infer<typeof SummarizeReviewsInputSchema>;

const SummarizeReviewsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the reviews and ratings.'),
});
export type SummarizeReviewsOutput = z.infer<typeof SummarizeReviewsOutputSchema>;

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
    return output!;
  }
);
