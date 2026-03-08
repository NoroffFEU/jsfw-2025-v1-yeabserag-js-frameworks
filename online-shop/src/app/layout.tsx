import "./globals.css";
import type { Metadata } from "next";
import { CartProvider } from "../context/CartContext";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Online Shop",
  description: "A minimal online shop built with Next.js and TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
          <Toaster position="top-right" />
        </CartProvider>
      </body>
    </html>
  );
}