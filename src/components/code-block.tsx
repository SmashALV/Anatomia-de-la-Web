'use client';

import { Check, Clipboard } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language: string; // e.g., 'html', 'css', 'javascript'
  className?: string;
}

export function CodeBlock({ code, language, className }: CodeBlockProps) {
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 1500); // Reset icon after 1.5 seconds
    });
  };

  return (
    <div className={cn("relative rounded-md border bg-muted/50 p-4 font-mono text-sm", className)}>
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-2 top-2 h-6 w-6 text-muted-foreground hover:bg-muted hover:text-foreground"
        onClick={copyToClipboard}
        aria-label="Copy code"
      >
        {hasCopied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
      </Button>
      <pre>
        <code className={`language-${language}`}>
          {code.trim()}
        </code>
      </pre>
    </div>
  );
}