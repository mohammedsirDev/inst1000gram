import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Insta1000gram - 1080p Full HD Instagram Downloader',
  description: 'Download Instagram Reels, Videos, Stories, and Photos in original master Full HD 1080p quality.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-pink-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
