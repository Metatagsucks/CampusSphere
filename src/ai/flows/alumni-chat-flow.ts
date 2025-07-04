'use server';
/**
 * @fileOverview An AI agent that simulates a chat with an alumnus.
 *
 * - alumniChat - A function that handles the chat conversation.
 * - AlumniChatInput - The input type for the alumniChat function.
 * - AlumniChatOutput - The return type for the alumniChat function.
 */

import {ai} from '@/ai/genkit';
import {
  AlumniChatInputSchema,
  AlumniChatOutputSchema,
  type AlumniChatInput,
  type AlumniChatOutput,
} from '@/ai/types';

export type { AlumniChatInput, AlumniChatOutput };

export async function alumniChat(input: AlumniChatInput): Promise<AlumniChatOutput> {
  return alumniChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'alumniChatPrompt',
  input: {schema: AlumniChatInputSchema},
  output: {schema: AlumniChatOutputSchema},
  prompt: `You are an AI simulating a friendly and helpful alumnus from {{opportunityCompany}}.
You have previously completed the "{{opportunityTitle}}" opportunity.
Your goal is to answer questions from a prospective student based on the provided opportunity description and your simulated experience.
Do not make up information that is not in the description. If you don't know the answer, say so politely.
Keep your answers concise and conversational.

Opportunity Description:
---
{{opportunityDescription}}
---

Conversation History:
---
{{#each chatHistory}}
{{this.role}}: {{this.content}}
{{/each}}
---

Based on the history and the description, provide a helpful response to the last user message.
`,
});

const alumniChatFlow = ai.defineFlow(
  {
    name: 'alumniChatFlow',
    inputSchema: AlumniChatInputSchema,
    outputSchema: AlumniChatOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    
    if (!output) {
      return { response: "I'm sorry, I couldn't generate a response. Please try again." };
    }
    
    return output;
  }
);
