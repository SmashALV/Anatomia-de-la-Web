import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Import Inter instead of Geist Sans
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

const inter = Inter({ // Use Inter font
  variable: '--font-inter', // Define CSS variable for Inter
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Anatomía Web',
  description: 'Comprende la estructura de la página web, el modelo de caja y las funciones CSS.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      {/* Removed whitespace here */}
      <body
        className={cn(
          'h-full font-sans antialiased', // font-sans will now map to --font-inter
          inter.variable // Apply the Inter font variable
        )}
      >
        {children}
        <Toaster /> {/* Add Toaster for potential notifications */}
      </body>
    </html>
  );
}
