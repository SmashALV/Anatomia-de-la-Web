'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Brush, LayoutGrid, Rows, Move } from 'lucide-react'; // Iconos para conceptos CSS
import { cn } from '@/lib/utils';
import { CodeBlock } from '@/components/code-block'; // Importa el componente de bloque de código

// --- Propiedad Display ---
const displayOptions = [
  { value: 'block', label: 'block' },
  { value: 'inline', label: 'inline' },
  { value: 'inline-block', label: 'inline-block' },
  { value: 'flex', label: 'flex' },
  { value: 'grid', label: 'grid' },
  { value: 'none', label: 'none' },
];

const DisplayDemo = () => {
  const [displayValue, setDisplayValue] = useState('block');

  const htmlCode = `<span class="elemento">Elemento 1</span>
<span class="elemento">Elemento 2</span>
<span class="adyacente">Elemento Adyacente</span>`;

  const cssCode = `.elemento {
  display: ${displayValue};
  /* Otros estilos como borde, relleno */
}`;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <Label htmlFor="display-select" className="w-20 shrink-0">Propiedad:</Label>
        <Select value={displayValue} onValueChange={setDisplayValue}>
          <SelectTrigger id="display-select" className="w-full md:w-[200px]">
            <SelectValue placeholder="Selecciona display" />
          </SelectTrigger>
          <SelectContent>
            {displayOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <p className="text-sm text-muted-foreground">
        La propiedad <code>display</code> especifica el comportamiento de visualización (el tipo de caja de renderizado) de un elemento.
      </p>
      <div className="rounded border p-4 bg-muted/30 min-h-[150px]">
         <div className="mb-2 text-xs text-muted-foreground">Demo Visual:</div>
         <div className="border border-dashed border-foreground/10 p-2"> {/* Contenedor externo para contexto */}
             <span style={{ display: displayValue }} className="inline-block border border-dashed border-accent bg-accent/20 p-2 text-sm">
               Elemento 1
             </span>
             <span style={{ display: displayValue }} className="inline-block border border-dashed border-accent bg-accent/20 p-2 text-sm">
               Elemento 2
             </span>
             <span className="inline-block border border-dashed border-foreground/30 p-2 text-sm">Elemento Adyacente</span>
         </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Estructura HTML</h4>
        <CodeBlock language="html" code={htmlCode} />
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">CSS Aplicado</h4>
        <CodeBlock language="css" code={cssCode} />
      </div>
    </div>
  );
};


// --- Propiedad Position ---
const positionOptions = [
  { value: 'static', label: 'static (predeterminado)' },
  { value: 'relative', label: 'relative' },
  { value: 'absolute', label: 'absolute' },
  { value: 'fixed', label: 'fixed' },
  { value: 'sticky', label: 'sticky' },
];

const PositionDemo = () => {
  const [positionValue, setPositionValue] = useState('static');
  const topValue = '10px'; // Desplazamiento de ejemplo
  const leftValue = '10px'; // Desplazamiento de ejemplo

  const htmlCode = `<div class="contenedor">
  <div class="hermano">Elemento Hermano 1</div>
  <div class="elemento-posicionado">
    Elemento Posicionado
  </div>
  <div class="hermano">Elemento Hermano 2</div>
  <!-- Más contenido para desplazamiento -->
</div>`;

  const cssCode = `.contenedor {
  position: relative; /* Necesario para contexto de posicionamiento absoluto */
  /* Otros estilos */
}

.elemento-posicionado {
  position: ${positionValue};
  top: ${positionValue !== 'static' ? topValue : 'auto'};
  left: ${positionValue !== 'static' ? leftValue : 'auto'};
  /* Añadir z-index, background, etc. según sea necesario */
}`;

   const explanationMap: Record<string, string> = {
      static: 'Flujo normal, top/left/etc. no tienen efecto.',
      relative: `Desplazado ${topValue}/${leftValue} desde su posición normal. Sigue siendo parte del flujo normal.`,
      absolute: `Posicionado relativo al ancestro posicionado más cercano (el contenedor con 'position: relative'). Sacado del flujo normal.`,
      fixed: `Posicionado relativo a la ventana gráfica (viewport). Permanece en el mismo lugar incluso al hacer scroll. Sacado del flujo normal.`,
      sticky: `Actúa como 'relative' hasta que alcanza un umbral especificado (ej. top: ${topValue}) durante el scroll, luego actúa como 'fixed'. Necesita un ancestro con scroll.`
   }

  return (
     <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <Label htmlFor="position-select" className="w-20 shrink-0">Propiedad:</Label>
        <Select value={positionValue} onValueChange={setPositionValue}>
          <SelectTrigger id="position-select" className="w-full md:w-[200px]">
            <SelectValue placeholder="Selecciona posición" />
          </SelectTrigger>
          <SelectContent>
            {positionOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
       <p className="text-sm text-muted-foreground">
         La propiedad <code>position</code> especifica el tipo de método de posicionamiento. Los desplazamientos (<code>top</code>, <code>left</code>, etc.) se aplican de forma diferente según el valor. {explanationMap[positionValue]}
       </p>
      <div className="relative rounded border p-4 bg-muted/30 min-h-[200px] overflow-auto">
         <div className="mb-2 text-xs text-muted-foreground">Demo Visual (Haz scroll dentro):</div>
         <div className="h-32"> {/* Añadir altura al contenedor para demo sticky/fixed */}
          <div className="border border-dashed border-foreground/30 p-2 text-sm mb-2">Elemento Hermano 1</div>
            <div
              style={{
                  position: positionValue as any,
                  top: positionValue !== 'static' ? topValue : undefined, // Solo aplica desplazamiento si no es static
                  left: positionValue !== 'static' ? leftValue : undefined,
                  zIndex: positionValue === 'absolute' || positionValue === 'fixed' ? 10 : undefined, // Traer al frente si es absolute/fixed
                  background: positionValue === 'absolute' ? 'hsl(var(--accent)/0.3)' :
                              positionValue === 'fixed' ? 'hsl(120, 60%, 70%)' : // Verdoso para fixed
                              positionValue === 'sticky' ? 'hsl(50, 60%, 70%)' : // Amarillento para sticky
                              'hsl(var(--accent)/0.2)' // Fondo de acento predeterminado
               }}
              className={cn(
                "border border-dashed border-accent p-2 text-sm w-32", // Estilos base
                positionValue === 'sticky' && 'top-2' // Necesita desplazamiento para comportamiento sticky
              )}
            >
              Elemento Posicionado
              {positionValue === 'relative' && <span className="text-xs block mt-1 opacity-80">(desplazamiento relativo)</span>}
              {positionValue === 'absolute' && <span className="text-xs block mt-1 opacity-80">(absoluto al contenedor)</span>}
              {positionValue === 'fixed' && <span className="text-xs block mt-1 opacity-80">(fijo a la ventana)</span>}
              {positionValue === 'sticky' && <span className="text-xs block mt-1 opacity-80">(sticky en top: {topValue})</span>}
            </div>
          <div className="border border-dashed border-foreground/30 p-2 text-sm mt-2">Elemento Hermano 2</div>
         </div>
          {/* Añadir más contenido para habilitar scroll para sticky */}
          <div className="h-48 border border-dashed border-foreground/30 p-2 text-sm mt-4">Área de Contenido con Scroll</div>
      </div>
        <div className="space-y-2">
            <h4 className="text-sm font-medium">Estructura HTML</h4>
            <CodeBlock language="html" code={htmlCode} />
        </div>
        <div className="space-y-2">
            <h4 className="text-sm font-medium">CSS Aplicado</h4>
            <CodeBlock language="css" code={cssCode} />
        </div>
    </div>
  );
};


// --- Propiedad Flexbox ---
const flexDirectionOptions = ['row', 'row-reverse', 'column', 'column-reverse'];
const justifyContentOptions = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'];
const alignItemsOptions = ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'];

const FlexboxDemo = () => {
  const [flexDirection, setFlexDirection] = useState('row');
  const [justifyContent, setJustifyContent] = useState('flex-start');
  const [alignItems, setAlignItems] = useState('stretch');

  const flexContainerStyle = {
    display: 'flex',
    flexDirection: flexDirection as any,
    justifyContent: justifyContent,
    alignItems: alignItems,
    minHeight: '150px', // Asegura que el contenedor tenga altura
  };

  const htmlCode = `<div class="flex-container">
  <div class="flex-item">Ítem 1</div>
  <div class="flex-item">Ítem 2</div>
  <div class="flex-item">Ítem 3</div>
</div>`;

  const cssCode = `.flex-container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  min-height: 150px; /* Para la demo */
  /* Otros estilos */
}

.flex-item {
  /* Estilos para ítems como borde, relleno */
  ${alignItems === 'stretch' ? '' : (flexDirection.includes('row') ? '/* height: auto; (predeterminado) */' : '/* width: auto; (predeterminado) */')}
  ${alignItems !== 'stretch' ? (flexDirection.includes('row') ? 'height: 50px; /* Altura fija de ejemplo */' : 'width: 80px; /* Ancho fijo de ejemplo */') : ''}
}`;

  const flexItemStyle = "border border-dashed border-accent bg-accent/20 p-2 text-sm";

  return (
    <div className="space-y-4">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div>
            <Label htmlFor="flex-direction-select" className="mb-1 block text-sm font-medium">flex-direction</Label>
            <Select value={flexDirection} onValueChange={setFlexDirection}>
              <SelectTrigger id="flex-direction-select"><SelectValue /></SelectTrigger>
              <SelectContent>{flexDirectionOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
            </Select>
         </div>
          <div>
            <Label htmlFor="justify-content-select" className="mb-1 block text-sm font-medium">justify-content</Label>
            <Select value={justifyContent} onValueChange={setJustifyContent}>
              <SelectTrigger id="justify-content-select"><SelectValue /></SelectTrigger>
              <SelectContent>{justifyContentOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
            </Select>
         </div>
          <div>
            <Label htmlFor="align-items-select" className="mb-1 block text-sm font-medium">align-items</Label>
            <Select value={alignItems} onValueChange={setAlignItems}>
              <SelectTrigger id="align-items-select"><SelectValue /></SelectTrigger>
              <SelectContent>{alignItemsOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
            </Select>
         </div>
       </div>
        <p className="text-sm text-muted-foreground">
          Flexbox organiza los ítems a lo largo de un eje principal (controlado por <code>flex-direction</code>). <code>justify-content</code> alinea los ítems a lo largo del eje principal, y <code>align-items</code> los alinea a lo largo del eje transversal.
        </p>
      <div className="rounded border p-4 bg-muted/30">
           <div className="mb-2 text-xs text-muted-foreground">Demo Visual:</div>
            <div style={flexContainerStyle} className="border border-dashed border-foreground/10">
             <div className={cn(flexItemStyle, alignItems === 'stretch' ? '' : (flexDirection.startsWith('row') ? 'h-12' : 'w-20'))}>Ítem 1</div>
             <div className={cn(flexItemStyle, alignItems === 'stretch' ? '' : (flexDirection.startsWith('row') ? 'h-16' : 'w-16'))}>Ítem 2</div>
             <div className={cn(flexItemStyle, alignItems === 'stretch' ? '' : (flexDirection.startsWith('row') ? 'h-10' : 'w-24'))}>Ítem 3</div>
          </div>
      </div>
       <div className="space-y-2">
            <h4 className="text-sm font-medium">Estructura HTML</h4>
            <CodeBlock language="html" code={htmlCode} />
        </div>
        <div className="space-y-2">
            <h4 className="text-sm font-medium">CSS Aplicado</h4>
            <CodeBlock language="css" code={cssCode} />
        </div>
    </div>
  );
};


// --- Propiedad Grid ---
const gridTemplateColumnsOptions = ['1fr 1fr 1fr', 'repeat(3, 1fr)', '100px 1fr 100px', 'auto 1fr auto'];
const gapOptions = ['0px', '8px', '16px', '24px']; // Usando píxeles por simplicidad

const GridDemo = () => {
  const [gridTemplateColumns, setGridTemplateColumns] = useState('1fr 1fr 1fr');
  const [gap, setGap] = useState('8px');

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: gridTemplateColumns,
    gap: gap,
  };

  const htmlCode = `<div class="grid-container">
  <div class="grid-item">Ítem 1</div>
  <div class="grid-item">Ítem 2</div>
  <div class="grid-item">Ítem 3</div>
  <div class="grid-item">Ítem 4</div>
  <div class="grid-item">Ítem 5</div>
  <div class="grid-item">Ítem 6</div>
</div>`;

  const cssCode = `.grid-container {
  display: grid;
  grid-template-columns: ${gridTemplateColumns};
  gap: ${gap};
  /* Otros estilos */
}

.grid-item {
  /* Estilos para ítems como borde, relleno */
}`;


  const gridItemStyle = "border border-dashed border-accent bg-accent/20 p-4 text-sm text-center";

  return (
    <div className="space-y-4">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div>
            <Label htmlFor="grid-cols-select" className="mb-1 block text-sm font-medium">grid-template-columns</Label>
            <Select value={gridTemplateColumns} onValueChange={setGridTemplateColumns}>
              <SelectTrigger id="grid-cols-select"><SelectValue /></SelectTrigger>
              <SelectContent>{gridTemplateColumnsOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
            </Select>
         </div>
          <div>
            <Label htmlFor="grid-gap-select" className="mb-1 block text-sm font-medium">gap</Label>
            <Select value={gap} onValueChange={setGap}>
              <SelectTrigger id="grid-gap-select"><SelectValue /></SelectTrigger>
              <SelectContent>{gapOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
            </Select>
         </div>
       </div>
       <p className="text-sm text-muted-foreground">
         CSS Grid crea diseños en filas y columnas. <code>grid-template-columns</code> define la función de dimensionamiento de las pistas para las columnas, y <code>gap</code> define el espacio entre las celdas de la cuadrícula.
       </p>
      <div className="rounded border p-4 bg-muted/30">
          <div className="mb-2 text-xs text-muted-foreground">Demo Visual:</div>
           <div style={gridContainerStyle} className="border border-dashed border-foreground/10">
             <div className={gridItemStyle}>Ítem 1</div>
             <div className={gridItemStyle}>Ítem 2</div>
             <div className={gridItemStyle}>Ítem 3</div>
             <div className={gridItemStyle}>Ítem 4</div>
             <div className={gridItemStyle}>Ítem 5</div>
             <div className={gridItemStyle}>Ítem 6</div>
          </div>
      </div>
        <div className="space-y-2">
            <h4 className="text-sm font-medium">Estructura HTML</h4>
            <CodeBlock language="html" code={htmlCode} />
        </div>
        <div className="space-y-2">
            <h4 className="text-sm font-medium">CSS Aplicado</h4>
            <CodeBlock language="css" code={cssCode} />
        </div>
    </div>
  );
};


// --- Componente Principal ---
export default function CssFunctionPreview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brush className="h-6 w-6 text-accent" />
          Vista Previa de Propiedades CSS
        </CardTitle>
        <CardDescription>
          Explora propiedades comunes de diseño CSS, observa sus efectos en vivo y mira el código correspondiente.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="display" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4">
            <TabsTrigger value="display">
              <Rows className="mr-2 h-4 w-4" /> Display
            </TabsTrigger>
            <TabsTrigger value="position">
               <Move className="mr-2 h-4 w-4" /> Position
            </TabsTrigger>
            <TabsTrigger value="flexbox">
              <LayoutGrid className="mr-2 h-4 w-4 transform rotate-90" /> Flexbox {/* Rejilla rotada para ícono flex */}
            </TabsTrigger>
            <TabsTrigger value="grid">
              <LayoutGrid className="mr-2 h-4 w-4" /> Grid
            </TabsTrigger>
          </TabsList>
          <TabsContent value="display"><DisplayDemo /></TabsContent>
          <TabsContent value="position"><PositionDemo /></TabsContent>
          <TabsContent value="flexbox"><FlexboxDemo /></TabsContent>
          <TabsContent value="grid"><GridDemo /></TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
