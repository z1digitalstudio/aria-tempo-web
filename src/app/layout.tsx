import type { Metadata } from "next";
import "@/styles/main.css";

export const metadata: Metadata = {
  title: "Tempo",
  description: "A Music + Tech experience by Aria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
