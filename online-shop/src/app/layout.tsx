import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Noroff Online Shop",
  description: "A minimal online shop built with Next.js and TypeScript",
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