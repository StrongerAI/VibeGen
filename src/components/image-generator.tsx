'use client';

import { useState, useTransition, useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { handleGenerateImage, handleEnhanceImage } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { Download, Wand2, Loader2, Image as ImageIcon } from 'lucide-react';
import { SubmitButton } from './submit-button';

const initialState = {
  imageUrl: undefined,
  error: undefined,
};

export default function ImageGenerator() {
  const [state, formAction] = useFormState(handleGenerateImage, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const [enhancedImageUrl, setEnhancedImageUrl] = useState<string | null>(null);
  const [isEnhancing, startEnhancingTransition] = useTransition();

  const currentImageUrl = enhancedImageUrl || state.imageUrl;

  useEffect(() => {
    if (state.error) {
      toast({
        title: 'Generation Failed',
        description: state.error,
        variant: 'destructive',
      });
    }
    if (state.imageUrl) {
        setEnhancedImageUrl(null); // Reset enhanced image when a new one is generated
        toast({
            title: 'Image Generated!',
            description: 'Your vision has come to life.',
        });
    }
  }, [state, toast]);

  const onEnhance = () => {
    if (!state.imageUrl) return;
    startEnhancingTransition(async () => {
      const result = await handleEnhanceImage(state.imageUrl!);
      if (result.error) {
        toast({
          title: 'Enhancement Failed',
          description: result.error,
          variant: 'destructive',
        });
      } else if (result.enhancedImageUrl) {
        setEnhancedImageUrl(result.enhancedImageUrl);
        toast({
            title: 'Image Enhanced!',
            description: 'The resolution has been successfully upscaled.',
        });
      }
    });
  };

  const onDownload = () => {
    if (!currentImageUrl) return;
    const link = document.createElement('a');
    link.href = currentImageUrl;
    const fileExtension = currentImageUrl.split(';')[0].split('/')[1] || 'png';
    link.download = `visionary-art.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <Card className="w-full max-w-4xl shadow-2xl bg-card/50 backdrop-blur-sm border-border/20">
      <form ref={formRef} action={formAction}>
        <CardHeader>
          <div className="relative">
            <Textarea
              name="prompt"
              placeholder="e.g., A vibrant painting of a synthwave landscape, neon grids, setting sun..."
              className="resize-none text-base p-4 pr-32"
              rows={3}
            />
            <div className="absolute top-1/2 -translate-y-1/2 right-3">
              <SubmitButton />
            </div>
          </div>
        </CardHeader>
      </form>
      <CardContent>
        <div className="aspect-square w-full bg-muted/30 rounded-lg flex items-center justify-center border-2 border-dashed border-border/30 overflow-hidden relative">
          {currentImageUrl ? (
            <Image
              src={currentImageUrl}
              alt="Generated image"
              fill
              className="object-contain"
              unoptimized // data URI
            />
          ) : (
             <div className="text-center text-muted-foreground p-8">
               <ImageIcon className="mx-auto h-12 w-12" />
               <p className="mt-4">Your generated image will appear here</p>
            </div>
          )}
        </div>
      </CardContent>
      {state.imageUrl && (
        <CardFooter className="flex justify-center gap-4">
          <Button onClick={onDownload} variant="secondary" disabled={!currentImageUrl}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button onClick={onEnhance} disabled={isEnhancing || !!enhancedImageUrl}>
            {isEnhancing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            {enhancedImageUrl ? 'Enhanced' : 'Enhance Resolution'}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
