import { Bot } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2 p-2">
      <Bot className="h-8 w-8 text-primary" />
      <h1 className="text-2xl font-headline font-bold text-white">
        VibeGen
      </h1>
    </div>
  );
}
