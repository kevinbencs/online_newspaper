import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { Viewport } from 'next'
import "./globals.css";

//components
import Footer from "./_components/footer/footer";
import Main_header_container from "./_components/main_header_container";
import Providers from "./_components/themeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | World Times',
    default: "World Times",
  },
  alternates: {
    types: {
      'application/rss+xml': [
        {
          url: '/api/feed',
          title: 'RSS Feed',
        },
      ],
    },
  },
  description: "News of the world",
  openGraph: {
    title: {
      template: '%s | World Times',
      default: "World Times",
    },
    description: "News of the world",
    type: 'website',
    url: `https://online-newspaper.vercel.app`,
    images: [
      {
        url: 'https://www.dropbox.com/scl/fi/fdbmbhk9caauk7aysp2a5/cover.png?rlkey=d4ypc3jz596br56jnauvi4wlx&dl=1',
        alt: 'Cover image of Word Times',
      }
    ],
  },
  twitter: {
    card: 'summary',
    title: {
      template: '%s | World Times',
      default: "World Times",
    },
    description: "News of the world",
    site: '',
    images: [
      {
        url: 'https://www.dropbox.com/scl/fi/fdbmbhk9caauk7aysp2a5/cover.png?rlkey=d4ypc3jz596br56jnauvi4wlx&dl=1',
        alt: 'Cover image of Word Times',
      }
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    noarchive: false,
    noimageindex: true,
    googleBot: {
      index: true,
      follow: true,
      noarchive: false,
      nocache: false,
      noimageindex: true,
      "max-video-preview": 0,
      "max-image-preview": "large",
    }
  }

};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'light' },
    { media: '(prefers-color-scheme: dark)', color: 'dark' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 2,
  userScalable: true,
}

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
