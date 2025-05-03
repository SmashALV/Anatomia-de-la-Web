import { CodeXml } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <CodeXml className="h-6 w-6 mr-2 text-accent" />
          <span className="text-lg font-bold text-foreground">
            Anatomía Web
          </span>
        </div>
        {/* La navegación podría ir aquí si fuera necesario */}
      </div>
    </header>
  );
}
