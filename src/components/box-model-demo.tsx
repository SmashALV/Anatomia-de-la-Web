'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Square } from 'lucide-react';
import { CodeBlock } from '@/components/code-block'; // Importa un componente para renderizar código

export default function BoxModelDemo() {
  const [padding, setPadding] = useState(10);
  const [border, setBorder] = useState(2);
  const [margin, setMargin] = useState(15);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Estilos de la caja. Solo se aplican en el cliente después de la hidratación.
  const boxStyle = isClient ? {
    padding: `${padding}px`,
    border: `${border}px solid hsl(var(--accent))`,
    margin: `${margin}px`,
    backgroundColor: 'hsl(var(--secondary))',
    color: 'hsl(var(--secondary-foreground))',
    transition: 'all 0.2s ease-in-out',
  } : {};

  // Estilos del contenido interior.
  const contentStyle = {
    backgroundColor: 'hsl(var(--card))',
    color: 'hsl(var(--card-foreground))',
    padding: '10px',
    textAlign: 'center' as const,
    fontSize: '0.875rem',
    borderRadius: 'calc(var(--radius) - 4px)',
  };

  // Código HTML de ejemplo.
  const htmlCode = `<div class="caja">
  <div class="contenido">Contenido</div>
</div>`;

  // Código CSS de ejemplo, actualizado dinámicamente.
  const cssCode = `.caja {
  padding: ${padding}px; /* Relleno */
  border: ${border}px solid hsl(var(--accent)); /* Borde */
  margin: ${margin}px; /* Margen */
  background-color: hsl(var(--secondary)); /* Color de fondo */
  /* ... otros estilos */
}

.contenido {
  background-color: hsl(var(--card)); /* Color de fondo */
  padding: 10px; /* Relleno */
  /* ... otros estilos */
}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
           <Square className="h-6 w-6 text-accent" />
          Demo del Modelo de Caja CSS
        </CardTitle>
        <CardDescription>
          Visualiza cómo interactúan el contenido, el relleno (padding), el borde (border) y el margen (margin). Ajusta los deslizadores y observa el HTML/CSS correspondiente.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Visualización Interactiva de la Caja */}
          <div className="flex flex-col items-center justify-center rounded-md border bg-muted p-8">
             <div
              style={boxStyle}
              className="relative flex items-center justify-center"
              aria-live="polite" // Anuncia cambios para lectores de pantalla
            >
              <div style={contentStyle}>Contenido</div>
              {/* Etiquetas para las diferentes partes (solo en cliente) */}
              {isClient && (
                 <>
                  {/* Etiquetas de Margen */}
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded bg-muted px-1 text-xs text-muted-foreground">
                    Margen ({margin}px)
                  </span>
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded bg-muted px-1 text-xs text-muted-foreground">
                    Margen ({margin}px)
                  </span>
                   <span className="absolute -left-10 top-1/2 -translate-y-1/2 transform -rotate-90 whitespace-nowrap rounded bg-muted px-1 text-xs text-muted-foreground md:-left-5">
                    Margen ({margin}px)
                  </span>
                    <span className="absolute -right-10 top-1/2 -translate-y-1/2 transform rotate-90 whitespace-nowrap rounded bg-muted px-1 text-xs text-muted-foreground md:-right-5">
                    Margen ({margin}px)
                  </span>

                   {/* Etiquetas de Borde (Dentro del Margen) */}
                  <span className="absolute left-1/2 top-[calc(0px-0.75rem)] -translate-x-1/2 transform whitespace-nowrap text-xs text-accent">
                    Borde ({border}px)
                  </span>
                   <span className="absolute left-1/2 bottom-[calc(0px-0.75rem)] -translate-x-1/2 transform whitespace-nowrap text-xs text-accent">
                     Borde ({border}px)
                  </span>
                   <span className="absolute left-[calc(0px-0.75rem)] top-1/2 -translate-y-1/2 transform -rotate-90 whitespace-nowrap text-xs text-accent">
                     Borde ({border}px)
                  </span>
                   <span className="absolute right-[calc(0px-0.75rem)] top-1/2 -translate-y-1/2 transform rotate-90 whitespace-nowrap text-xs text-accent">
                    Borde ({border}px)
                  </span>

                  {/* Etiquetas de Relleno (Dentro del Borde) */}
                   <span className="absolute left-1/2 top-[calc(0%+1px)] -translate-x-1/2 transform whitespace-nowrap text-xs text-secondary-foreground/80">
                    Relleno ({padding}px)
                  </span>
                     <span className="absolute left-1/2 bottom-[calc(0%+1px)] -translate-x-1/2 transform whitespace-nowrap text-xs text-secondary-foreground/80">
                    Relleno ({padding}px)
                  </span>
                  <span className="absolute left-[calc(0%+1px)] top-1/2 -translate-y-1/2 transform -rotate-90 whitespace-nowrap text-xs text-secondary-foreground/80">
                    Relleno ({padding}px)
                  </span>
                    <span className="absolute right-[calc(0%+1px)] top-1/2 -translate-y-1/2 transform rotate-90 whitespace-nowrap text-xs text-secondary-foreground/80">
                    Relleno ({padding}px)
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Deslizadores y Código */}
          <div className="space-y-6">
             {/* Deslizadores */}
             <div className="space-y-4">
                <div>
                  <Label htmlFor="padding-slider" className="mb-2 block text-sm font-medium">
                    Relleno ({padding}px)
                  </Label>
                  <Slider
                    id="padding-slider"
                    value={[padding]}
                    max={50}
                    step={1}
                    onValueChange={(value) => isClient && setPadding(value[0])}
                    disabled={!isClient}
                    aria-label="Relleno"
                  />
                </div>
                <div>
                  <Label htmlFor="border-slider" className="mb-2 block text-sm font-medium">
                    Borde ({border}px)
                  </Label>
                  <Slider
                    id="border-slider"
                    value={[border]}
                    max={15}
                    step={1}
                    onValueChange={(value) => isClient && setBorder(value[0])}
                    disabled={!isClient}
                    aria-label="Ancho del Borde"
                  />
                </div>
                <div>
                  <Label htmlFor="margin-slider" className="mb-2 block text-sm font-medium">
                    Margen ({margin}px)
                  </Label>
                  <Slider
                    id="margin-slider"
                    value={[margin]}
                    max={50}
                    step={1}
                    onValueChange={(value) => isClient && setMargin(value[0])}
                    disabled={!isClient}
                    aria-label="Margen"
                  />
                </div>
            </div>

            {/* Fragmentos de Código */}
             <div className="space-y-4">
                <div>
                    <h4 className="mb-2 text-sm font-medium">Estructura HTML</h4>
                    <CodeBlock language="html" code={htmlCode} />
                </div>
                 <div>
                    <h4 className="mb-2 text-sm font-medium">CSS Aplicado</h4>
                    <CodeBlock language="css" code={isClient ? cssCode : '/* Ajusta los deslizadores para ver el CSS */'} />
                </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
