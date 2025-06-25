import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Portfolio | Abhoy Chand Mondal',
  description: 'A personal portfolio for Professor Abhoy Chand Mondal.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
