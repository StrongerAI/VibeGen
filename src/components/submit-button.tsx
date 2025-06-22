'use client';

import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { Loader2, Sparkles } from 'lucide-react';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} size="lg">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate
        </>
      )}
    </Button>
  );
}
