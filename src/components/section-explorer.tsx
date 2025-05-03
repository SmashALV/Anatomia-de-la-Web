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
import { CodeBlock } from '@/components/code-block'; // Importa el componente de bloque de código

interface SectionInfo {
  tag: string;
  icon: ElementType;
  description: string;
  visualClass: string; // Mantener nombres de clases CSS en inglés
  exampleHtml: string;
}

const sections: SectionInfo[] = [
  {
    tag: '<header>',
    icon: PanelTop,
    description:
      'Representa contenido introductorio, a menudo conteniendo encabezados, logotipos, formularios de búsqueda o navegación. Proporciona contexto para el contenido principal.',
    visualClass: 'border-red-500',
    exampleHtml: `<header>
  <h1>Título Principal de la Página</h1>
  <nav>...</nav>
</header>`,
  },
  {
    tag: '<nav>',
    icon: Navigation,
    description:
      'Contiene los enlaces de navegación principales para el sitio o la página. Ayuda a los usuarios a encontrar su camino.',
    visualClass: 'border-blue-500',
    exampleHtml: `<nav>
  <ul>
    <li><a href="/">Inicio</a></li>
    <li><a href="/acerca-de">Acerca de</a></li>
  </ul>
</nav>`,
  },
  {
    tag: '<main>',
    icon: PanelLeft,
    description:
      'Encierra el contenido dominante único de esta página específica. Solo debe haber un elemento <main> por página.',
    visualClass: 'border-green-500',
    exampleHtml: `<main>
  <h2>Título del Artículo</h2>
  <p>Este es el contenido principal...</p>
</main>`,
  },
  {
    tag: '<article>',
    icon: FileText,
    description:
      'Representa una pieza de contenido autocontenida que podría existir por sí sola (por ejemplo, una publicación de blog, comentario de foro, noticia). A menudo se usa dentro de <main>.',
    visualClass: 'border-yellow-500',
    exampleHtml: `<article>
  <h3>Título de la Publicación del Blog</h3>
  <p>Contenido de la publicación...</p>
</article>`,
  },
  {
    tag: '<aside>',
    icon: PanelRight,
    description:
      'Contiene contenido relacionado tangencialmente con el contenido principal que lo rodea (por ejemplo, barras laterales, citas destacadas, publicidad).',
    visualClass: 'border-purple-500',
    exampleHtml: `<aside>
  <h4>Enlaces Relacionados</h4>
  <ul>...</ul>
</aside>`,
  },
  {
    tag: '<footer>',
    icon: PanelBottom,
    description:
      'Normalmente contiene información de autoría, datos de copyright o enlaces a documentos relacionados para el ancestro de sección más cercano (como <article> o <body>).',
    visualClass: 'border-orange-500',
    exampleHtml: `<footer>
  <p>&copy; 2024 Tu Sitio Web</p>
</footer>`,
  },
];

export default function SectionExplorer() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-6 w-6 text-accent" />
          Secciones Semánticas HTML
        </CardTitle>
        <CardDescription>
          Aprende el propósito y ve ejemplos de elementos comunes de sección HTML5. Estas etiquetas ayudan a estructurar tu página y mejoran la accesibilidad y el SEO.
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
                {/* Representación Visual */}
                <div
                  className={`rounded border-2 ${section.visualClass} p-4 text-center text-sm bg-muted/30`}
                >
                  Área visual para <code>{section.tag}</code>
                </div>
                 {/* Ejemplo HTML */}
                 <div>
                    <h4 className="mb-2 text-sm font-medium">Ejemplo de Uso (HTML)</h4>
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
