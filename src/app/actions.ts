'use server';

import { generateImage, enhanceImageResolution } from '@/ai/flows';
import { z } from 'zod';

const generateImageSchema = z.object({
  prompt: z.string().min(1, 'Prompt cannot be empty.'),
});

interface ActionState {
  imageUrl?: string;
  error?: string;
}

export async function handleGenerateImage(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const validatedFields = generateImageSchema.safeParse({
    prompt: formData.get('prompt'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.prompt?.[0] || 'Invalid prompt.',
    };
  }
  
  try {
    const result = await generateImage({ prompt: validatedFields.data.prompt });
    return { imageUrl: result.imageUrl };
  } catch (e) {
    console.error(e);
    return { error: e instanceof Error ? e.message : 'An unknown error occurred during image generation.' };
  }
}

interface EnhanceActionState {
    enhancedImageUrl?: string;
    error?: string;
}

export async function handleEnhanceImage(imageUrl: string): Promise<EnhanceActionState> {
    if (!imageUrl) {
        return { error: 'No image to enhance.' };
    }

    try {
        const result = await enhanceImageResolution({ photoDataUri: imageUrl });
        return { enhancedImageUrl: result.enhancedPhotoDataUri };
    } catch (e) {
        console.error(e);
        return { error: e instanceof Error ? e.message : 'An unknown error occurred during image enhancement.' };
    }
}
