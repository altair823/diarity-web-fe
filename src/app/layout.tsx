import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";

const _geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const _geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Diarity",
  description: "기록을 기록하세요",
};

function Title() {
  return (
    <header>
      <h1 className="text-center text-indigo-400 font-bold text-5xl">Diarity</h1>
      <h4 className="text-right">Powered by NestJS</h4>
    </header>
  );
}

function Footer() {
  return (
    <footer className="text-right">
      <p>© 2024 Diarity</p>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Title />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
