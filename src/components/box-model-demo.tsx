'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Square } from 'lucide-react';
import { CodeBlock } from '@/components/code-block'; // Import a component to render code

export default function BoxModelDemo() {
  const [padding, setPadding] = useState(10);
  const [border, setBorder] = useState(2);
  const [margin, setMargin] = useState(15);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const boxStyle = isClient ? {
    padding: `${padding}px`,
    border: `${border}px solid hsl(var(--accent))`,
    margin: `${margin}px`,
    backgroundColor: 'hsl(var(--secondary))',
    color: 'hsl(var(--secondary-foreground))',
    transition: 'all 0.2s ease-in-out',
  } : {};

  const contentStyle = {
    backgroundColor: 'hsl(var(--card))',
    color: 'hsl(var(--card-foreground))',
    padding: '10px',
    textAlign: 'center' as const,
    fontSize: '0.875rem',
    borderRadius: 'calc(var(--radius) - 4px)',
  };

  const htmlCode = `<div class="box">
  <div class="content">Content</div>
</div>`;

  const cssCode = `.box {
  padding: ${padding}px;
  border: ${border}px solid hsl(var(--accent));
  margin: ${margin}px;
  background-color: hsl(var(--secondary));
  /* ... other styles */
}

.content {
  background-color: hsl(var(--card));
  padding: 10px;
  /* ... other styles */
}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
           <Square className="h-6 w-6 text-accent" />
          CSS Box Model Demo
        </CardTitle>
        <CardDescription>
          Visualize how content, padding, border, and margin interact. Adjust the sliders below and see the corresponding HTML/CSS.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Interactive Box Visualization */}
          <div className="flex flex-col items-center justify-center rounded-md border bg-muted p-8">
             <div
              style={boxStyle}
              className="relative flex items-center justify-center"
              aria-live="polite" // Announce changes for screen readers
            >
              <div style={contentStyle}>Content</div>
              {/* Labels for different parts */}
              {isClient && (
                 <>
                  {/* Margin Labels */}
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded bg-muted px-1 text-xs text-muted-foreground">
                    Margin ({margin}px)
                  </span>
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded bg-muted px-1 text-xs text-muted-foreground">
                    Margin ({margin}px)
                  </span>
                   <span className="absolute -left-10 top-1/2 -translate-y-1/2 transform -rotate-90 whitespace-nowrap rounded bg-muted px-1 text-xs text-muted-foreground md:-left-5">
                    Margin ({margin}px)
                  </span>
                    <span className="absolute -right-10 top-1/2 -translate-y-1/2 transform rotate-90 whitespace-nowrap rounded bg-muted px-1 text-xs text-muted-foreground md:-right-5">
                    Margin ({margin}px)
                  </span>

                   {/* Border Labels (Inside Margin) */}
                  <span className="absolute left-1/2 top-[calc(0px-0.75rem)] -translate-x-1/2 transform whitespace-nowrap text-xs text-accent">
                    Border ({border}px)
                  </span>
                   <span className="absolute left-1/2 bottom-[calc(0px-0.75rem)] -translate-x-1/2 transform whitespace-nowrap text-xs text-accent">
                     Border ({border}px)
                  </span>
                   <span className="absolute left-[calc(0px-0.75rem)] top-1/2 -translate-y-1/2 transform -rotate-90 whitespace-nowrap text-xs text-accent">
                     Border ({border}px)
                  </span>
                   <span className="absolute right-[calc(0px-0.75rem)] top-1/2 -translate-y-1/2 transform rotate-90 whitespace-nowrap text-xs text-accent">
                    Border ({border}px)
                  </span>

                  {/* Padding Labels (Inside Border) */}
                   <span className="absolute left-1/2 top-[calc(0%+1px)] -translate-x-1/2 transform whitespace-nowrap text-xs text-secondary-foreground/80">
                    Padding ({padding}px)
                  </span>
                     <span className="absolute left-1/2 bottom-[calc(0%+1px)] -translate-x-1/2 transform whitespace-nowrap text-xs text-secondary-foreground/80">
                    Padding ({padding}px)
                  </span>
                  <span className="absolute left-[calc(0%+1px)] top-1/2 -translate-y-1/2 transform -rotate-90 whitespace-nowrap text-xs text-secondary-foreground/80">
                    Padding ({padding}px)
                  </span>
                    <span className="absolute right-[calc(0%+1px)] top-1/2 -translate-y-1/2 transform rotate-90 whitespace-nowrap text-xs text-secondary-foreground/80">
                    Padding ({padding}px)
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Sliders and Code */}
          <div className="space-y-6">
             {/* Sliders */}
             <div className="space-y-4">
                <div>
                  <Label htmlFor="padding-slider" className="mb-2 block text-sm font-medium">
                    Padding ({padding}px)
                  </Label>
                  <Slider
                    id="padding-slider"
                    value={[padding]}
                    max={50}
                    step={1}
                    onValueChange={(value) => isClient && setPadding(value[0])}
                    disabled={!isClient}
                    aria-label="Padding"
                  />
                </div>
                <div>
                  <Label htmlFor="border-slider" className="mb-2 block text-sm font-medium">
                    Border ({border}px)
                  </Label>
                  <Slider
                    id="border-slider"
                    value={[border]}
                    max={15}
                    step={1}
                    onValueChange={(value) => isClient && setBorder(value[0])}
                    disabled={!isClient}
                    aria-label="Border Width"
                  />
                </div>
                <div>
                  <Label htmlFor="margin-slider" className="mb-2 block text-sm font-medium">
                    Margin ({margin}px)
                  </Label>
                  <Slider
                    id="margin-slider"
                    value={[margin]}
                    max={50}
                    step={1}
                    onValueChange={(value) => isClient && setMargin(value[0])}
                    disabled={!isClient}
                    aria-label="Margin"
                  />
                </div>
            </div>

            {/* Code Snippets */}
             <div className="space-y-4">
                <div>
                    <h4 className="mb-2 text-sm font-medium">HTML Structure</h4>
                    <CodeBlock language="html" code={htmlCode} />
                </div>
                 <div>
                    <h4 className="mb-2 text-sm font-medium">CSS Applied</h4>
                    <CodeBlock language="css" code={isClient ? cssCode : '/* Adjust sliders to see CSS */'} />
                </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}