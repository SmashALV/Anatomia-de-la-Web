'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Square } from 'lucide-react'; // Using a generic square icon

export default function BoxModelDemo() {
  const [padding, setPadding] = useState(10);
  const [border, setBorder] = useState(2);
  const [margin, setMargin] = useState(15);
  // State to prevent hydration errors with initial slider values
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const boxStyle = isClient ? {
    padding: `${padding}px`,
    border: `${border}px solid hsl(var(--accent))`, // Use accent color for border
    margin: `${margin}px`,
    backgroundColor: 'hsl(var(--secondary))', // Use secondary background
    color: 'hsl(var(--secondary-foreground))', // Use secondary text color
    transition: 'all 0.2s ease-in-out',
  } : {};

   const contentStyle = {
    backgroundColor: 'hsl(var(--card))', // Use card background for content
    color: 'hsl(var(--card-foreground))',
    padding: '10px',
    textAlign: 'center' as const, // Ensure correct type for textAlign
    fontSize: '0.875rem', // text-sm
    borderRadius: 'calc(var(--radius) - 4px)', // sm border radius
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
           <Square className="h-6 w-6 text-accent" />
          CSS Box Model Demo
        </CardTitle>
        <CardDescription>
          Visualize how content, padding, border, and margin interact. Adjust the sliders below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Interactive Box Visualization */}
          <div className="flex items-center justify-center rounded-md border bg-muted p-8">
            <div
              style={boxStyle}
              className="relative flex items-center justify-center"
            >
              <div style={contentStyle}>Content</div>
              {/* Labels for different parts */}
              {isClient && (
                 <>
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded bg-muted px-1 text-xs text-muted-foreground">
                    Margin ({margin}px)
                  </span>
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded bg-muted px-1 text-xs text-muted-foreground">
                    Margin ({margin}px)
                  </span>
                   <span className="absolute -left-5 top-1/2 -translate-y-1/2 transform -rotate-90 whitespace-nowrap rounded bg-muted px-1 text-xs text-muted-foreground">
                    Margin ({margin}px)
                  </span>
                    <span className="absolute -right-5 top-1/2 -translate-y-1/2 transform rotate-90 whitespace-nowrap rounded bg-muted px-1 text-xs text-muted-foreground">
                    Margin ({margin}px)
                  </span>
                  <span className="absolute left-1/2 top-0.5 -translate-x-1/2 transform whitespace-nowrap text-xs text-accent">
                    Border ({border}px)
                  </span>
                   <span className="absolute left-1/2 bottom-0.5 -translate-x-1/2 transform whitespace-nowrap text-xs text-accent">
                    Border ({border}px)
                  </span>
                   <span className="absolute left-0.5 top-1/2 -translate-y-1/2 transform -rotate-90 whitespace-nowrap text-xs text-accent">
                    Border ({border}px)
                  </span>
                   <span className="absolute right-0.5 top-1/2 -translate-y-1/2 transform rotate-90 whitespace-nowrap text-xs text-accent">
                    Border ({border}px)
                  </span>
                   <span className="absolute left-1/2 top-[calc(50%-1.5rem)] -translate-x-1/2 transform whitespace-nowrap text-xs text-secondary-foreground/80">
                    Padding ({padding}px)
                  </span>
                     <span className="absolute left-1/2 bottom-[calc(50%-1.5rem)] -translate-x-1/2 transform whitespace-nowrap text-xs text-secondary-foreground/80">
                    Padding ({padding}px)
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-6">
            <div>
              <Label htmlFor="padding-slider" className="mb-2 block text-sm font-medium">
                Padding ({padding}px)
              </Label>
              <Slider
                id="padding-slider"
                defaultValue={[10]}
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
                defaultValue={[2]}
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
                defaultValue={[15]}
                max={50}
                step={1}
                onValueChange={(value) => isClient && setMargin(value[0])}
                disabled={!isClient}
                aria-label="Margin"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
