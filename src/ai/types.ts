/**
 * @fileOverview Types and Zod schemas for AI flows.
 */

import { z } from 'genkit';

// For alumni-chat-flow
const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

export const AlumniChatInputSchema = z.object({
  opportunityTitle: z.string().describe('The title of the opportunity.'),
  opportunityCompany: z.string().describe('The company offering the opportunity.'),
  opportunityDescription: z.string().describe('The description of the opportunity.'),
  chatHistory: z.array(ChatMessageSchema).describe('The history of the conversation so far.'),
});
export type AlumniChatInput = z.infer<typeof AlumniChatInputSchema>;

export const AlumniChatOutputSchema = z.object({
  response: z.string().describe('The AI-generated response from the "alumnus".'),
});
export type AlumniChatOutput = z.infer<typeof AlumniChatOutputSchema>;


// For flag-scam-internship
export const FlagScamInternshipInputSchema = z.object({
  internshipDescription: z
    .string()
    .describe('The full description of the internship posting.'),
});
export type FlagScamInternshipInput = z.infer<typeof FlagScamInternshipInputSchema>;

export const FlagScamInternshipOutputSchema = z.object({
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


// For summarize-reviews
export const SummarizeReviewsInputSchema = z.object({
  reviews: z.array(
    z.object({
      text: z.string().describe('The text of the review.'),
      rating: z.number().describe('The rating given in the review.'),
    })
  ).describe('An array of student reviews with text and rating.'),
  itemType: z.enum(['internship', 'course', 'placement']).describe('The type of item being reviewed.'),
  itemName: z.string().describe('The name of the item being reviewed.'),
});
export type SummarizeReviewsInput = z.infer<typeof SummarizeReviewsInputSchema>;

export const SummarizeReviewsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the reviews and ratings.'),
});
export type SummarizeReviewsOutput = z.infer<typeof SummarizeReviewsOutputSchema>;
