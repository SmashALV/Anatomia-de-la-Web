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

interface SectionInfo {
  tag: string;
  icon: ElementType;
  description: string;
  visualClass: string;
}

const sections: SectionInfo[] = [
  {
    tag: '<header>',
    icon: PanelTop,
    description:
      'Represents introductory content, typically a group of introductory or navigational aids. It may contain some heading elements but also a logo, a search form, an author name, and other elements.',
    visualClass: 'border-red-500',
  },
  {
    tag: '<nav>',
    icon: Navigation,
    description:
      'Represents a section of a page whose purpose is to provide navigation links, either within the current document or to other documents. Common examples of navigation sections are menus, tables of contents, and indexes.',
    visualClass: 'border-blue-500',
  },
  {
    tag: '<main>',
    icon: PanelLeft, // Using PanelLeft as a placeholder for main content area
    description:
      'Represents the dominant content of the <body> of a document. The main content area consists of content that is directly related to or expands upon the central topic of a document, or the central functionality of an application.',
    visualClass: 'border-green-500',
  },
  {
    tag: '<article>',
    icon: FileText,
    description:
      'Represents a self-contained composition in a document, page, application, or site, which is intended to be independently distributable or reusable (e.g., in syndication). Examples include: a forum post, a magazine or newspaper article, or a blog entry.',
    visualClass: 'border-yellow-500',
  },
  {
    tag: '<aside>',
    icon: PanelRight,
    description:
      'Represents a portion of a document whose content is only indirectly related to the document\'s main content. Asides are frequently presented as sidebars or call-out boxes.',
    visualClass: 'border-purple-500',
  },
  {
    tag: '<footer>',
    icon: PanelBottom,
    description:
      'Represents a footer for its nearest sectioning content or sectioning root element. A footer typically contains information about the author of the section, copyright data or links to related documents.',
    visualClass: 'border-orange-500',
  },
];

export default function SectionExplorer() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-6 w-6 text-accent" />
          HTML Section Explorer
        </CardTitle>
        <CardDescription>
          Understand the purpose of common HTML5 semantic sectioning elements.
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
                <div
                  className={`rounded border-2 ${section.visualClass} p-4 text-center text-sm bg-muted/30`}
                >
                  Visual Representation of <code>{section.tag}</code>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
