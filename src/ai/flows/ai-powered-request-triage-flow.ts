'use server';
/**
 * @fileOverview This file implements a Genkit flow for triaging service requests.
 *
 * - aiPoweredRequestTriage - A function that uses AI to categorize and extract details from a service request description.
 * - AiPoweredRequestTriageInput - The input type for the aiPoweredRequestTriage function.
 * - AiPoweredRequestTriageOutput - The return type for the aiPoweredRequestTriage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiPoweredRequestTriageInputSchema = z.object({
  requestDescription: z
    .string()
    .describe(
      'A detailed description of the guest\'s service request, which might be vague or fall under the "other" category.'
    ),
});
export type AiPoweredRequestTriageInput = z.infer<
  typeof AiPoweredRequestTriageInputSchema
>;

const AiPoweredRequestTriageOutputSchema = z.object({
  suggestedCategory: z
    .enum([
      'Housekeeping',
      'Room Service',
      'Maintenance',
      'Guest Service',
      'Other',
    ])
    .describe(
      'The suggested category for the service request based on its description. Choose from: Housekeeping, Room Service, Maintenance, Guest Service, Other.'
    ),
  extractedDetails: z
    .string()
    .describe(
      'Key details extracted from the request description, summarizing the core issue or need.'
    ),
});
export type AiPoweredRequestTriageOutput = z.infer<
  typeof AiPoweredRequestTriageOutputSchema
>;

export async function aiPoweredRequestTriage(
  input: AiPoweredRequestTriageInput
): Promise<AiPoweredRequestTriageOutput> {
  return aiPoweredRequestTriageFlow(input);
}

const triagePrompt = ai.definePrompt({
  name: 'triageServiceRequestPrompt',
  input: { schema: AiPoweredRequestTriageInputSchema },
  output: { schema: AiPoweredRequestTriageOutputSchema },
  prompt: `You are an AI assistant specialized in triaging hospitality service requests. Your task is to analyze a guest's request description, identify its most suitable category, and extract the most important details.

Available Categories:
- Housekeeping (e.g., room cleaning, fresh towels, bed making)
- Room Service (e.g., food or drink orders, meal delivery)
- Maintenance (e.g., leaky faucet, broken AC, lightbulb replacement)
- Guest Service (e.g., general inquiries, transportation requests, wake-up calls, amenity requests not covered by others)
- Other (for anything that doesn't fit clearly into the above categories)

Request Description: {{{requestDescription}}}

Based on the request description, choose the most appropriate category and summarize the key details that a staff member would need to understand and address the request.`,
});

const aiPoweredRequestTriageFlow = ai.defineFlow(
  {
    name: 'aiPoweredRequestTriageFlow',
    inputSchema: AiPoweredRequestTriageInputSchema,
    outputSchema: AiPoweredRequestTriageOutputSchema,
  },
  async (input) => {
    const { output } = await triagePrompt(input);
    return output!;
  }
);
