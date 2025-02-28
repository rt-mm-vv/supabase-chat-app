import { Metadata } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Supabase Chat App',
  description: 'A real-time chat application built with Next.js and Supabase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}