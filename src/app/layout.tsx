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
  title: 'Web Anatomy',
  description: 'Understand web page structure, box model, and CSS functions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
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
