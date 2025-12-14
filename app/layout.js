import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Yavuz Taş — AI Developer & Freelancer | Smart Automation & Trading Bots",
  description:
    "AI Developer specializing in smart automation systems, advanced OCR solutions, trading bots, and machine learning applications. Freelance developer creating innovative AI-powered tools.",
  keywords: ["AI Developer", "Machine Learning", "Trading Bots", "OCR", "Automation", "Freelancer", "Yavuz Taş", "Binance Bot", "PDF OCR"],
  authors: [{ name: "Yavuz Taş" }],
  creator: "Yavuz Taş",
  openGraph: {
    title: "Yavuz Taş — AI Developer & Freelancer",
    description: "AI Developer specializing in smart automation systems, advanced OCR solutions, and trading bots.",
    url: "https://yavuzsite.vercel.app",
    siteName: "Yavuz Taş Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://yavuzsite.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yavuz Taş - AI Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yavuz Taş — AI Developer & Freelancer",
    description: "AI Developer specializing in smart automation systems and trading bots.",
    images: ["https://yavuzsite.vercel.app/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white font-sans min-h-screen flex flex-col`}
      >
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}