'use client';

import type { ElementType } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  PanelTop,
  Navigation,
  PanelLeft,
  PanelRight,
  PanelBottom,
  FileText,
  Code,
} from 'lucide-react';
import { CodeBlock } from '@/components/code-block'; // Import code block component

interface SectionInfo {
  tag: string;
  icon: ElementType;
  description: string;
  visualClass: string;
  exampleHtml: string;
}

const sections: SectionInfo[] = [
  {
    tag: '<header>',
    icon: PanelTop,
    description:
      'Represents introductory content, often containing headings, logos, search forms, or navigation. It provides context for the main content.',
    visualClass: 'border-red-500',
    exampleHtml: `<header>
  <h1>Main Page Title</h1>
  <nav>...</nav>
</header>`,
  },
  {
    tag: '<nav>',
    icon: Navigation,
    description:
      'Contains major navigation links for the site or page. Helps users find their way around.',
    visualClass: 'border-blue-500',
    exampleHtml: `<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>`,
  },
  {
    tag: '<main>',
    icon: PanelLeft,
    description:
      'Encloses the dominant content unique to this specific page. There should only be one <main> element per page.',
    visualClass: 'border-green-500',
    exampleHtml: `<main>
  <h2>Article Title</h2>
  <p>This is the primary content...</p>
</main>`,
  },
  {
    tag: '<article>',
    icon: FileText,
    description:
      'Represents a self-contained piece of content that could stand alone (e.g., blog post, forum comment, news story). Often used within <main>.',
    visualClass: 'border-yellow-500',
    exampleHtml: `<article>
  <h3>Blog Post Title</h3>
  <p>Content of the post...</p>
</article>`,
  },
  {
    tag: '<aside>',
    icon: PanelRight,
    description:
      'Contains content tangentially related to the main content around it (e.g., sidebars, pull quotes, advertising).',
    visualClass: 'border-purple-500',
    exampleHtml: `<aside>
  <h4>Related Links</h4>
  <ul>...</ul>
</aside>`,
  },
  {
    tag: '<footer>',
    icon: PanelBottom,
    description:
      'Typically contains authorship information, copyright data, or links to related documents for the nearest sectioning ancestor (like <article> or <body>).',
    visualClass: 'border-orange-500',
    exampleHtml: `<footer>
  <p>&copy; 2024 Your Website</p>
</footer>`,
  },
];

export default function SectionExplorer() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-6 w-6 text-accent" />
          HTML Semantic Sections
        </CardTitle>
        <CardDescription>
          Learn the purpose and see examples of common HTML5 sectioning elements. These tags help structure your page and improve accessibility and SEO.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {sections.map((section) => (
            <AccordionItem value={section.tag} key={section.tag}>
              <AccordionTrigger className="text-base font-medium hover:no-underline">
                <div className="flex items-center gap-2">
                  <section.icon className="h-5 w-5 text-accent" />
                  <code>{section.tag}</code>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 px-2">
                <p className="text-sm text-muted-foreground">
                  {section.description}
                </p>
                {/* Visual Representation */}
                <div
                  className={`rounded border-2 ${section.visualClass} p-4 text-center text-sm bg-muted/30`}
                >
                  Visual Area for <code>{section.tag}</code>
                </div>
                 {/* Example HTML */}
                 <div>
                    <h4 className="mb-2 text-sm font-medium">Example Usage (HTML)</h4>
                    <CodeBlock language="html" code={section.exampleHtml} />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}