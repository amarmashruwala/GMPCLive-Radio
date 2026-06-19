import type {Metadata} from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'GMPC LIVE RADIO | Golden Hour Broadcast',
  description: 'Watch, listen, and interact with our DJs live — music for the mind, body, and soul. Curated by Benson & Nubian.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning className="bg-[#e5e7eb] text-[#191c1f] antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
