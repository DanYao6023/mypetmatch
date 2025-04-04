import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Analytics from './components/Analytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pet Match',
  description: 'Find your perfect pet match',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}