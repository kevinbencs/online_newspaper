import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

//components
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Main_header_container from "./components/main_header_container";
import Providers from "./components/themeProvider";

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
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>
          <Main_header_container Children={children} />
          <Footer />
        </Providers>

      </body>
    </html>
  );
}
