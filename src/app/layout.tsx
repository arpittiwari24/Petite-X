import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./contexts/Providers";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import IsPremiumContextProvider from "./contexts/Premium";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Petite-X",
  description: "Url Shortening service for your long urls",
  keywords: "Url, Url-Shortening, url shortener, link shortener, link , url"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://app.lemonsqueezy.com/js/lemon.js" defer></script>
      </head>
      <body className={inter.className}>
        <Providers>
          <IsPremiumContextProvider>
          <Navbar />
            {children}
          <Footer />
          </IsPremiumContextProvider>
        </Providers>
      </body>
    </html>
  );
}
