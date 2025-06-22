'use server';

/**
 * @fileOverview This file defines a Genkit flow for enhancing the resolution of an image.
 *
 * - enhanceImageResolution - A function that enhances the resolution of an image using AI.
 * - EnhanceImageResolutionInput - The input type for the enhanceImageResolution function.
 * - EnhanceImageResolutionOutput - The return type for the enhanceImageResolution function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceImageResolutionInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo to enhance the resolution of, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type EnhanceImageResolutionInput = z.infer<
  typeof EnhanceImageResolutionInputSchema
>;

const EnhanceImageResolutionOutputSchema = z.object({
  enhancedPhotoDataUri: z
    .string()
    .describe(
      'The enhanced resolution photo, as a data URI that must include a MIME type and use Base64 encoding.'
    ),
});
export type EnhanceImageResolutionOutput = z.infer<
  typeof EnhanceImageResolutionOutputSchema
>;

export async function enhanceImageResolution(
  input: EnhanceImageResolutionInput
): Promise<EnhanceImageResolutionOutput> {
  return enhanceImageResolutionFlow(input);
}

const enhanceImageResolutionPrompt = ai.definePrompt({
  name: 'enhanceImageResolutionPrompt',
  input: {schema: EnhanceImageResolutionInputSchema},
  output: {schema: EnhanceImageResolutionOutputSchema},
  prompt: `Enhance the resolution of the following image. Return the enhanced image as a data URI.

Image: {{media url=photoDataUri}}`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const enhanceImageResolutionFlow = ai.defineFlow(
  {
    name: 'enhanceImageResolutionFlow',
    inputSchema: EnhanceImageResolutionInputSchema,
    outputSchema: EnhanceImageResolutionOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: [
        {media: {url: input.photoDataUri}},
        {text: 'enhance the resolution of this image'},
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media?.url) {
      throw new Error('No enhanced image returned.');
    }

    return {enhancedPhotoDataUri: media.url};
  }
);
