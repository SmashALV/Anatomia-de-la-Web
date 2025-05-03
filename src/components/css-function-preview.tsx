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
import { Brush, LayoutGrid, Rows, Move } from 'lucide-react'; // Icons for CSS concepts
import { cn } from '@/lib/utils';
import { CodeBlock } from '@/components/code-block'; // Import code block component

// --- Display Property ---
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

  const htmlCode = `<span class="element">Element 1</span>
<span class="element">Element 2</span>
<span class="adjacent">Adjacent Element</span>`;

  const cssCode = `.element {
  display: ${displayValue};
  /* Other styles like border, padding */
}`;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <Label htmlFor="display-select" className="w-20 shrink-0">Property:</Label>
        <Select value={displayValue} onValueChange={setDisplayValue}>
          <SelectTrigger id="display-select" className="w-full md:w-[200px]">
            <SelectValue placeholder="Select display" />
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
        The <code>display</code> property specifies the display behavior (the type of rendering box) of an element.
      </p>
      <div className="rounded border p-4 bg-muted/30 min-h-[150px]">
         <div className="mb-2 text-xs text-muted-foreground">Visual Demo:</div>
         <div className="border border-dashed border-foreground/10 p-2"> {/* Outer container for context */}
             <span style={{ display: displayValue }} className="inline-block border border-dashed border-accent bg-accent/20 p-2 text-sm">
               Element 1
             </span>
             <span style={{ display: displayValue }} className="inline-block border border-dashed border-accent bg-accent/20 p-2 text-sm">
               Element 2
             </span>
             <span className="inline-block border border-dashed border-foreground/30 p-2 text-sm">Adjacent Element</span>
         </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">HTML Structure</h4>
        <CodeBlock language="html" code={htmlCode} />
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">CSS Applied</h4>
        <CodeBlock language="css" code={cssCode} />
      </div>
    </div>
  );
};


// --- Position Property ---
const positionOptions = [
  { value: 'static', label: 'static (default)' },
  { value: 'relative', label: 'relative' },
  { value: 'absolute', label: 'absolute' },
  { value: 'fixed', label: 'fixed' },
  { value: 'sticky', label: 'sticky' },
];

const PositionDemo = () => {
  const [positionValue, setPositionValue] = useState('static');
  const topValue = '10px'; // Example offset
  const leftValue = '10px'; // Example offset

  const htmlCode = `<div class="container">
  <div class="sibling">Sibling Element 1</div>
  <div class="positioned-element">
    Positioned Element
  </div>
  <div class="sibling">Sibling Element 2</div>
  <!-- More content for scrolling -->
</div>`;

  const cssCode = `.container {
  position: relative; /* Needed for absolute positioning context */
  /* Other styles */
}

.positioned-element {
  position: ${positionValue};
  top: ${positionValue !== 'static' ? topValue : 'auto'};
  left: ${positionValue !== 'static' ? leftValue : 'auto'};
  /* Add z-index, background, etc. as needed */
}`;

   const explanationMap: Record<string, string> = {
      static: 'Default flow, top/left/etc. have no effect.',
      relative: `Offset ${topValue}/${leftValue} from its normal position. Still part of the normal flow.`,
      absolute: `Positioned relative to the nearest positioned ancestor (the container with 'position: relative'). Taken out of normal flow.`,
      fixed: `Positioned relative to the viewport. Stays in the same place even when scrolling. Taken out of normal flow.`,
      sticky: `Acts like 'relative' until it hits a specified threshold (e.g., top: ${topValue}) during scroll, then acts like 'fixed'. Needs a scrollable ancestor.`
   }

  return (
     <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <Label htmlFor="position-select" className="w-20 shrink-0">Property:</Label>
        <Select value={positionValue} onValueChange={setPositionValue}>
          <SelectTrigger id="position-select" className="w-full md:w-[200px]">
            <SelectValue placeholder="Select position" />
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
         The <code>position</code> property specifies the type of positioning method. Offsets (<code>top</code>, <code>left</code>, etc.) apply differently based on the value. {explanationMap[positionValue]}
       </p>
      <div className="relative rounded border p-4 bg-muted/30 min-h-[200px] overflow-auto">
         <div className="mb-2 text-xs text-muted-foreground">Visual Demo (Scroll inside):</div>
         <div className="h-32"> {/* Add height to container for sticky/fixed demo */}
          <div className="border border-dashed border-foreground/30 p-2 text-sm mb-2">Sibling Element 1</div>
            <div
              style={{
                  position: positionValue as any,
                  top: positionValue !== 'static' ? topValue : undefined, // Only apply offset if not static
                  left: positionValue !== 'static' ? leftValue : undefined,
                  zIndex: positionValue === 'absolute' || positionValue === 'fixed' ? 10 : undefined, // Bring forward if absolute/fixed
                  background: positionValue === 'absolute' ? 'hsl(var(--accent)/0.3)' :
                              positionValue === 'fixed' ? 'hsl(120, 60%, 70%)' : // Greenish for fixed
                              positionValue === 'sticky' ? 'hsl(50, 60%, 70%)' : // Yellowish for sticky
                              'hsl(var(--accent)/0.2)' // Default accent background
               }}
              className={cn(
                "border border-dashed border-accent p-2 text-sm w-32", // Base styles
                positionValue === 'sticky' && 'top-2' // Needs offset for sticky behavior
              )}
            >
              Positioned Element
              {positionValue === 'relative' && <span className="text-xs block mt-1 opacity-80">(relative offset)</span>}
              {positionValue === 'absolute' && <span className="text-xs block mt-1 opacity-80">(absolute to container)</span>}
              {positionValue === 'fixed' && <span className="text-xs block mt-1 opacity-80">(fixed to viewport)</span>}
              {positionValue === 'sticky' && <span className="text-xs block mt-1 opacity-80">(sticky at top: {topValue})</span>}
            </div>
          <div className="border border-dashed border-foreground/30 p-2 text-sm mt-2">Sibling Element 2</div>
         </div>
          {/* Add more content to enable scrolling for sticky */}
          <div className="h-48 border border-dashed border-foreground/30 p-2 text-sm mt-4">Scrollable Content Area</div>
      </div>
        <div className="space-y-2">
            <h4 className="text-sm font-medium">HTML Structure</h4>
            <CodeBlock language="html" code={htmlCode} />
        </div>
        <div className="space-y-2">
            <h4 className="text-sm font-medium">CSS Applied</h4>
            <CodeBlock language="css" code={cssCode} />
        </div>
    </div>
  );
};


// --- Flexbox Property ---
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
    minHeight: '150px', // Ensure container has height
  };

  const htmlCode = `<div class="flex-container">
  <div class="flex-item">Item 1</div>
  <div class="flex-item">Item 2</div>
  <div class="flex-item">Item 3</div>
</div>`;

  const cssCode = `.flex-container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  min-height: 150px; /* For demo */
  /* Other styles */
}

.flex-item {
  /* Styles for items like border, padding */
  ${alignItems === 'stretch' ? '' : (flexDirection.includes('row') ? '/* height: auto; (default) */' : '/* width: auto; (default) */')}
  ${alignItems !== 'stretch' ? (flexDirection.includes('row') ? 'height: 50px; /* Example fixed height */' : 'width: 80px; /* Example fixed width */') : ''}
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
          Flexbox arranges items along a main axis (controlled by <code>flex-direction</code>). <code>justify-content</code> aligns items along the main axis, and <code>align-items</code> aligns them along the cross axis.
        </p>
      <div className="rounded border p-4 bg-muted/30">
           <div className="mb-2 text-xs text-muted-foreground">Visual Demo:</div>
            <div style={flexContainerStyle} className="border border-dashed border-foreground/10">
             <div className={cn(flexItemStyle, alignItems === 'stretch' ? '' : (flexDirection.startsWith('row') ? 'h-12' : 'w-20'))}>Item 1</div>
             <div className={cn(flexItemStyle, alignItems === 'stretch' ? '' : (flexDirection.startsWith('row') ? 'h-16' : 'w-16'))}>Item 2</div>
             <div className={cn(flexItemStyle, alignItems === 'stretch' ? '' : (flexDirection.startsWith('row') ? 'h-10' : 'w-24'))}>Item 3</div>
          </div>
      </div>
       <div className="space-y-2">
            <h4 className="text-sm font-medium">HTML Structure</h4>
            <CodeBlock language="html" code={htmlCode} />
        </div>
        <div className="space-y-2">
            <h4 className="text-sm font-medium">CSS Applied</h4>
            <CodeBlock language="css" code={cssCode} />
        </div>
    </div>
  );
};


// --- Grid Property ---
const gridTemplateColumnsOptions = ['1fr 1fr 1fr', 'repeat(3, 1fr)', '100px 1fr 100px', 'auto 1fr auto'];
const gapOptions = ['0px', '8px', '16px', '24px']; // Using pixels for simplicity

const GridDemo = () => {
  const [gridTemplateColumns, setGridTemplateColumns] = useState('1fr 1fr 1fr');
  const [gap, setGap] = useState('8px');

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: gridTemplateColumns,
    gap: gap,
  };

  const htmlCode = `<div class="grid-container">
  <div class="grid-item">Item 1</div>
  <div class="grid-item">Item 2</div>
  <div class="grid-item">Item 3</div>
  <div class="grid-item">Item 4</div>
  <div class="grid-item">Item 5</div>
  <div class="grid-item">Item 6</div>
</div>`;

  const cssCode = `.grid-container {
  display: grid;
  grid-template-columns: ${gridTemplateColumns};
  gap: ${gap};
  /* Other styles */
}

.grid-item {
  /* Styles for items like border, padding */
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
         CSS Grid creates layouts in rows and columns. <code>grid-template-columns</code> defines the track sizing function for columns, and <code>gap</code> defines the space between grid cells.
       </p>
      <div className="rounded border p-4 bg-muted/30">
          <div className="mb-2 text-xs text-muted-foreground">Visual Demo:</div>
           <div style={gridContainerStyle} className="border border-dashed border-foreground/10">
             <div className={gridItemStyle}>Item 1</div>
             <div className={gridItemStyle}>Item 2</div>
             <div className={gridItemStyle}>Item 3</div>
             <div className={gridItemStyle}>Item 4</div>
             <div className={gridItemStyle}>Item 5</div>
             <div className={gridItemStyle}>Item 6</div>
          </div>
      </div>
        <div className="space-y-2">
            <h4 className="text-sm font-medium">HTML Structure</h4>
            <CodeBlock language="html" code={htmlCode} />
        </div>
        <div className="space-y-2">
            <h4 className="text-sm font-medium">CSS Applied</h4>
            <CodeBlock language="css" code={cssCode} />
        </div>
    </div>
  );
};


// --- Main Component ---
export default function CssFunctionPreview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brush className="h-6 w-6 text-accent" />
          CSS Property Preview
        </CardTitle>
        <CardDescription>
          Explore common CSS layout properties, see their effects live, and view the corresponding code.
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
              <LayoutGrid className="mr-2 h-4 w-4 transform rotate-90" /> Flexbox {/* Rotated grid for flex icon */}
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