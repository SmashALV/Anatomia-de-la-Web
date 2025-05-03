import Header from '@/components/layout/header';
import SectionExplorer from '@/components/section-explorer';
import BoxModelDemo from '@/components/box-model-demo';
import CssFunctionPreview from '@/components/css-function-preview';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="container mx-auto flex-grow p-4 md:p-8">
        <div className="grid gap-8 lg:grid-cols-1">
          {/* Removed lg:grid-cols-2 to stack sections vertically */}
          <SectionExplorer />
          <BoxModelDemo />
          <CssFunctionPreview />
        </div>
      </main>
       <footer className="py-6 text-center text-sm text-muted-foreground">
        Construido con Next.js y ShadCN UI.
      </footer>
    </div>
  );
}
