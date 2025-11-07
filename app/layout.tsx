
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thing",
  description: "This is a thing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className='h-screen w-screen overflow-clip px-5 pt-5 pb-24 bg-cyan-800 relative flex items-center justify-center'>
          <div className='bg-teal-100 w-full h-full p-2 shadow-lg shadow-teal-100 overflow-y-auto'>
            {children}
          </div>
          <Navbar />
        </main>
      </body>
    </html>
  );
}
