'use client';

import { useState, useTransition, useEffect, useRef, useActionState, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { handleGenerateImage, handleEnhanceImage } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { Download, Wand2, Loader2, Image as ImageIcon } from 'lucide-react';
import { SubmitButton } from './submit-button';
import { useAuth } from '@/lib/firebase/auth';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';

const initialState = {
  imageUrl: undefined,
  error: undefined,
};

export default function ImageGenerator() {
  const { user } = useAuth();
  const [state, formAction] = useActionState(handleGenerateImage, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const [enhancedImageUrl, setEnhancedImageUrl] = useState<string | null>(null);
  const [isEnhancing, startEnhancingTransition] = useTransition();
  const [showLimitDialog, setShowLimitDialog] = useState(false);
  const [generationCount, setGenerationCount] = useState(0);

  const limit = useMemo(() => (user ? 10 : 1), [user]);
  const storageKey = useMemo(() => {
    return user ? `vibegen_count_${user.uid}` : 'vibegen_count_guest';
  }, [user]);

  useEffect(() => {
    const storedCount = localStorage.getItem(storageKey);
    setGenerationCount(storedCount ? parseInt(storedCount, 10) : 0);
  }, [storageKey]);
  
  const currentImageUrl = enhancedImageUrl || state.imageUrl;
  const remainingCount = Math.max(0, limit - generationCount);

  useEffect(() => {
    if (state.error && state.error !== 'Limit reached') {
      toast({
        title: 'Generation Failed',
        description: state.error,
        variant: 'destructive',
      });
    }
    if (state.imageUrl) {
        setEnhancedImageUrl(null);
        toast({
            title: 'Image Generated!',
            description: `You have ${remainingCount} generations left.`,
        });
    }
  }, [state, toast, remainingCount]);

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
    link.download = `vibegen-art.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleFormActionWrapper = (formData: FormData) => {
    if (generationCount >= limit) {
      setShowLimitDialog(true);
      return;
    }

    const newCount = generationCount + 1;
    localStorage.setItem(storageKey, newCount.toString());
    setGenerationCount(newCount);
    
    formAction(formData);
  };
  
  return (
    <>
    <Card className="w-full max-w-4xl shadow-2xl bg-card/50 backdrop-blur-sm border-border/20">
      <form ref={formRef} action={handleFormActionWrapper}>
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
          <p className="text-sm text-muted-foreground text-center mt-2">
            You have {remainingCount} free generation{remainingCount !== 1 ? 's' : ''} remaining.
          </p>
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
    <AlertDialog open={showLimitDialog} onOpenChange={setShowLimitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {user ? 'Upgrade to Keep Creating' : 'Create an Account to Continue'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {user
                ? `You've used all ${limit} of your free image generations.`
                : "You've used your free image generation. Create a free account to get more."}
              {' '}
              Please view our pricing options to unlock more features.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="secondary" onClick={() => setShowLimitDialog(false)}>Cancel</Button>
            <AlertDialogAction asChild>
              <Button onClick={() => router.push('/pricing')}>View Pricing</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
