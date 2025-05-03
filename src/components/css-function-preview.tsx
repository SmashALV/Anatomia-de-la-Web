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

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
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
         <div className="mb-2 text-xs text-muted-foreground">Container:</div>
         <span style={{ display: displayValue }} className="inline-block border border-dashed border-accent bg-accent/20 p-2 text-sm">
           Element 1
         </span>
         <span style={{ display: displayValue }} className="inline-block border border-dashed border-accent bg-accent/20 p-2 text-sm">
           Element 2
         </span>
         <span className="inline-block border border-dashed border-foreground/30 p-2 text-sm">Adjacent Element</span>
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

  return (
     <div className="space-y-4">
      <div className="flex items-center gap-4">
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
         The <code>position</code> property specifies the type of positioning method used for an element (static, relative, absolute, fixed, or sticky). Properties like <code>top</code>, <code>right</code>, <code>bottom</code>, and <code>left</code> only work on non-static elements.
       </p>
      <div className="relative rounded border p-4 bg-muted/30 min-h-[200px] overflow-auto">
         <div className="mb-2 text-xs text-muted-foreground">Relative Container:</div>
         <div className="h-32"> {/* Add height to container for sticky/fixed demo */}
          <div className="border border-dashed border-foreground/30 p-2 text-sm mb-2">Sibling Element 1</div>
            <div
              style={{ position: positionValue as any, top: '10px', left: '10px' }}
              className={cn(
                "border border-dashed border-accent bg-accent/20 p-2 text-sm w-32 h-16 z-10",
                positionValue === 'absolute' && 'bg-blue-200', // Example styling
                positionValue === 'fixed' && 'bg-green-200',
                positionValue === 'sticky' && 'bg-yellow-200 top-2' // Sticky needs a top offset
              )}
            >
              Positioned Element
               {positionValue === 'relative' && <span className="text-xs block">(top: 10px, left: 10px relative to original)</span>}
               {positionValue === 'absolute' && <span className="text-xs block">(top: 10px, left: 10px relative to container)</span>}
                {positionValue === 'fixed' && <span className="text-xs block">(top: 10px, left: 10px relative to viewport)</span>}
                 {positionValue === 'sticky' && <span className="text-xs block">(top: 10px relative to scroll container)</span>}
            </div>
          <div className="border border-dashed border-foreground/30 p-2 text-sm mt-2">Sibling Element 2</div>
         </div>
          {/* Add more content to enable scrolling for sticky */}
          <div className="h-48 border border-dashed border-foreground/30 p-2 text-sm mt-4">Scrollable Content Area</div>
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
          Flexbox is a one-dimensional layout model for arranging items in rows or columns. Properties like <code>flex-direction</code>, <code>justify-content</code>, and <code>align-items</code> control item distribution and alignment.
        </p>
      <div style={flexContainerStyle} className="rounded border p-4 bg-muted/30">
         <div className={cn(flexItemStyle, alignItems === 'stretch' ? '' : 'h-12')}>Item 1</div>
         <div className={cn(flexItemStyle, alignItems === 'stretch' ? '' : 'h-16')}>Item 2</div>
         <div className={cn(flexItemStyle, alignItems === 'stretch' ? '' : 'h-10')}>Item 3</div>
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
         CSS Grid Layout is a two-dimensional layout system for the web. It lets you lay content out in rows and columns. <code>grid-template-columns</code> defines the columns, and <code>gap</code> sets the space between items.
       </p>
      <div style={gridContainerStyle} className="rounded border p-4 bg-muted/30">
         <div className={gridItemStyle}>Item 1</div>
         <div className={gridItemStyle}>Item 2</div>
         <div className={gridItemStyle}>Item 3</div>
         <div className={gridItemStyle}>Item 4</div>
         <div className={gridItemStyle}>Item 5</div>
         <div className={gridItemStyle}>Item 6</div>
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
          CSS Function Preview
        </CardTitle>
        <CardDescription>
          Explore common CSS properties and see their effects live.
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
