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
  title: "Yavuz Taş — AI Developer & Freelancer",
  description:
    "Automation systems, OCR tools, trading bots and AI assistants.",
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