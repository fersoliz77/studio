// src/ai/flows/portfolio-chat-assistant.ts
'use server';

import { ai, MessageData } from '@/ai/genkit';
import { z } from 'genkit';

// Helper to create Genkit-compatible message parts
function createMessagePart(role: 'user' | 'model', content: string): MessageData {
  return {
    role,
    parts: [{ text: content }],
  };
}

const ChatAssistantInputSchema = z.object({
  message: z.string().describe('The user\'s current message.'),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).optional().describe('Previous conversation history.'),
  portfolioContext: z.string().describe('Structured information about the portfolio for the AI to reference.'),
});
export type ChatAssistantInput = z.infer<typeof ChatAssistantInputSchema>;

const ChatAssistantOutputSchema = z.object({
  response: z.string().describe('The AI\'s conversational response.'),
});
export type ChatAssistantOutput = z.infer<typeof ChatAssistantOutputSchema>;

export const portfolioChatAssistantFlow = ai.defineFlow(
  {
    name: 'portfolioChatAssistantFlow',
    inputSchema: ChatAssistantInputSchema,
    outputSchema: ChatAssistantOutputSchema,
  },
  async ({ message, history, portfolioContext }) => {
    const personaInstruction = `You are a helpful and friendly AI assistant for a developer\'s online portfolio named Fer Soliz.
    Your goal is to answer questions about Fer Soliz\'s projects, skills, experience, and general information based ONLY on the provided context.
    Be concise, professional, and engaging.
    If you don\'t know the answer based on the provided context, politely state that you don\'t have that information.

    Here is the portfolio information you should use:
    ${portfolioContext}
    `;

    const fullChatPrompt: MessageData[] = [];

    if (!history || history.length === 0) {
      // For the first message, put persona instruction and user message as separate parts within a single user role
      fullChatPrompt.push({
        role: 'user',
        parts: [
          { text: personaInstruction },
          { text: message }
        ],
      });
    } else {
      // Add existing history (ensuring correct format) and the current user message.
      fullChatPrompt.push(
        ...history.map(msg => createMessagePart(msg.role, msg.content)),
        createMessagePart('user', message)
      );
    }

    const modelResponse = await ai.generate({
      prompt: fullChatPrompt,
      output: { schema: ChatAssistantOutputSchema },
      config: { temperature: 0.7 },
    });

    if (!modelResponse.output()) {
      throw new Error('Model did not return a valid output.');
    }

    return { response: modelResponse.output()!.response };
  }
);
