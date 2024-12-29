'use client'

import '../globals.css'
import Head from 'next/head'
import { UserProvider } from '@/context/UserContext'
import { NavBar } from '../navber'
import { Category } from '@/app/category'
import { ConditionalSidebar } from '@/app/sidebar'
import { koFont, enFont } from '@/app/font'

function Footer() {
  return (
    <footer className='text-right'>
      <p>© 2024 Diarity</p>
    </footer>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentCategory = 'home' // Set the current category dynamically
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
        <UserProvider>
          <div className='flex flex-col min-h-screen items-center'>
            <NavBar />
            <main className='flex-grow flex lg:w-full justify-evenly'>
              <div className='hidden lg:flex flex-col flex-none w-1/4 max-w-64'>
                <Category
                  isSmallScreen={false}
                  currentCategory={currentCategory}
                />
              </div>
              <div className='flex flex-col flex-initial w-screen lg:w-1/3 lg:p-4 lg:max-w-screen-md'>
                {children}
              </div>
              <div className='hidden lg:flex flex-col flex-none w-1/4 max-w-64'>
                <ConditionalSidebar />
              </div>
            </main>
            <Footer />
          </div>
        </UserProvider>
      </body>
    </html>
  )
}
