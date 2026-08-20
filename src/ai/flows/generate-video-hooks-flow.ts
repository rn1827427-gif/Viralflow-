'use server';
/**
 * @fileOverview A Genkit flow for generating viral-style video titles and summaries.
 *
 * - generateVideoHooks - A function that generates catchy titles and summaries for videos.
 * - GenerateVideoHooksInput - The input type for the generateVideoHooks function.
 * - GenerateVideoHooksOutput - The return type for the generateVideoHooks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateVideoHooksInputSchema = z.object({
  videoTitle: z.string().describe('The original title of the video.'),
  videoDescription: z.string().describe('The original description of the video.'),
  videoKeywords: z.array(z.string()).describe('A list of keywords related to the video content.'),
});
export type GenerateVideoHooksInput = z.infer<typeof GenerateVideoHooksInputSchema>;

const GenerateVideoHooksOutputSchema = z.object({
  viralTitle: z.string().describe('A catchy, viral-style title for the video.'),
  viralSummary: z.string().describe('A concise, engaging summary for the video, optimized for virality.'),
});
export type GenerateVideoHooksOutput = z.infer<typeof GenerateVideoHooksOutputSchema>;

export async function generateVideoHooks(input: GenerateVideoHooksInput): Promise<GenerateVideoHooksOutput> {
  return generateVideoHooksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateVideoHooksPrompt',
  input: {schema: GenerateVideoHooksInputSchema},
  output: {schema: GenerateVideoHooksOutputSchema},
  prompt: `You are an expert viral content creator for a video platform called ViralFyre. Your goal is to generate extremely catchy, attention-grabbing titles and summaries for videos that will make them go viral.
      
Consider the following video metadata:

Original Title: {{{videoTitle}}}
Original Description: {{{videoDescription}}}
Keywords: {{#each videoKeywords}}- {{{this}}}
{{/each}}

Generate a viral-style title and a compelling summary for this video. The summary should be concise and designed to maximize clicks and views. Ensure the tone is exciting and encourages engagement.`,
});

const generateVideoHooksFlow = ai.defineFlow(
  {
    name: 'generateVideoHooksFlow',
    inputSchema: GenerateVideoHooksInputSchema,
    outputSchema: GenerateVideoHooksOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
