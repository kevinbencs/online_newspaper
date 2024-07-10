import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

//components
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Sidebar from "./components/sidebar/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "World Times",
  description: "News of the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="emerald">
      <body className={inter.className}>
        <Header />
        <Sidebar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
