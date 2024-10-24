import type { Metadata } from 'next';
import '@/styles/main.css';
import { fonts } from '@/assets/fonts';

export const metadata: Metadata = {
  title: 'Tempo',
  description: 'A Music + Tech experience by Aria',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fonts.helios.variable} ${fonts.wsupreme.variable}`}>
        {children}
      </body>
    </html>
  );
}
