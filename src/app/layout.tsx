import "./globals.css";

import Head from "next/head";
import Image from "next/image";
import type { Metadata } from "next";
import diarity_logo from "/public/diarity-logo.svg";
import localFont from "next/font/local";
import new_button from "/public/new.svg";
import notification_button from "/public/notifications.svg";

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

const k2dMedium = localFont({
  src: "./fonts/K2D-Medium.ttf",
  variable: "--font-k2d",
  weight: "400",
});

const k2dBold = localFont({
  src: "./fonts/K2D-Bold.ttf",
  variable: "--font-k2d-bold",
  weight: "700",
});

export const metadata: Metadata = {
  title: "Diarity",
  description: "기록을 기록하세요",
};

function NavBar() {
  return (
    <header className="w-screen">
      <nav className="lg:px-16 px-6 bg-gray-300  shadow-md flex flex-wrap items-center lg:py-0 py-2">
        <div className="flex-1 flex justify-between items-center">
          <a href="/" className="flex text-lg font-semibold">
            <Image src={diarity_logo} alt="Diarity Logo" />
            <div className="text-2xl m-3 text-purple-600">
              <p className={k2dBold.className}>Diarity</p>
            </div>
          </a>
        </div>
        <label htmlFor="menu-toggle" className="cursor-pointer lg:hidden block">
          <svg
            className="fill-current text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>
        <input className="hidden" type="checkbox" id="menu-toggle" />
        <div
          className="hidden lg:flex lg:items-center lg:w-auto w-full"
          id="menu"
        >
          <nav>
            <ul className="text-xl text-center items-center gap-x-5 pt-4 md:gap-x-4 lg:text-lg lg:flex  lg:pt-0">
              <li className="py-2 lg:py-0 ">
                <a
                  className="text-red-600 hover:pb-4 hover:border-b-4 hover:border-yellow-400"
                  href="/"
                >
                  <Image src={new_button} alt="New Button" />
                </a>
              </li>
              <li className="py-2 lg:py-0 ">
                <a
                  className="text-red-600 hover:pb-4 hover:border-b-4 hover:border-yellow-400"
                  href="#"
                >
                  <Image src={notification_button} alt="Notification Button" />
                </a>
              </li>
              <li className="py-2 lg:py-0 ">
                <a
                  className="text-red-600 hover:pb-4 hover:border-b-4 hover:border-yellow-400"
                  href="#"
                >
                  Apps
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </nav>
      {/* <nav className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-14 items-center">
          <Image src={diarity_logo} alt="Diarity Logo" className="block size-9" />
          <div className="text-2xl m-3 text-purple-600">
            <p className={k2dBold.className}>
              Diarity
            </p>
          </div>
        </div>
      </nav> */}
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
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>

        <style>{`
      #menu-toggle:checked + #menu {
        display: block;
      }
    `}</style>
      </Head>
      <body>
        <div className="flex flex-col min-h-screen items-center">
          <NavBar />
          <main className="flex-grow flex w-4/6">
            <div className="md:">
              <div className="flex flex-col flex-none w-1/5 sm:w-0 md:w-0 lg:w-1/5 p-4 bg-gray-100">
                {/* Left Column Content */}
                Left Column
              </div>
            </div>
            <div className="flex flex-col flex-initial w-2/3 p-4 bg-white">
              {/* Main Content */}
              {children}
            </div>
            <div className="flex flex-col flex-initial w-1/4 p-4 bg-gray-100">
              {/* Right Column Content */}
              Right Column
            </div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
