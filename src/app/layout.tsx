import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./contexts/Providers";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import IsPremiumContextProvider from "./contexts/Premium";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TidyL",
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
      <body className={inter.className}>
         <Toaster position="top-center" />
        <Providers>
          <IsPremiumContextProvider>
          <Navbar />
            {children} 
          </IsPremiumContextProvider>
        </Providers>
      </body>
    </html>
  );
}
