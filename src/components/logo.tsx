import { Bot } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Bot className="h-6 w-6 text-primary" />
      <span className="text-xl font-headline font-bold text-white">
        VibeGen
      </span>
    </div>
  );
}
