'use client'

import '../globals.css'
import Head from 'next/head'
import { NavBar } from '../navber'
import { Category } from '@/app/category'
import { ConditionalSidebar } from '@/app/sidebar'
import { koFont, enFont } from '@/app/font'
import { Suspense } from 'react'

function Footer() {
  return (
    <footer className='text-right'>
      <p>© 2025 Diarity</p>
    </footer>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ko' className={`${koFont.variable} ${enFont.variable}`}>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <style>{`
          #menu-toggle:checked ~ #menu {
            display: block;
          }
        `}</style>
        <title>Diarity</title>
      </Head>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <div className='flex flex-col min-h-screen items-center'>
            <NavBar />
            <main className='flex-grow flex lg:w-full justify-evenly'>
              <div className='hidden lg:flex flex-col flex-none w-1/4 max-w-64'>
                <Category isSmallScreen={false} />
              </div>
              <div className='flex flex-col flex-initial w-screen lg:w-1/2 lg:p-4 lg:max-w-screen-md'>
                {children}
              </div>
              <div className='hidden lg:flex flex-col flex-none w-1/4 max-w-64'>
                <ConditionalSidebar />
              </div>
            </main>
            <Footer />
          </div>
        </Suspense>
      </body>
    </html>
  )
}
