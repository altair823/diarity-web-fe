'use client'

import './globals.css'
import Head from 'next/head'
import { UserProvider } from '@/context/UserContext'
import NavBar from './navber'
import { Category } from '@/app/category'

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
    <html lang='ko'>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <style>{`
          #menu-toggle:checked ~ #menu {
            display: block;
          }
        `}</style>
      </Head>
      <body>
        <UserProvider>
          <div className='flex flex-col min-h-screen items-center'>
            <NavBar />
            <main className='flex-grow flex w-4/6'>
              <div className='hidden md:flex flex-col flex-none w-1/4 max-w-64'>
                <Category
                  isSmallScreen={false}
                  currentCategory={currentCategory}
                />
              </div>
              <div className='flex flex-col flex-initial w-2/3 p-4 max-w-screen-md'>
                {/* Main Content */}
                {children}
              </div>
              <div className='hidden md:flex flex-col flex-none w-1/4 max-w-64 bg-gray-100'>
                {/* Right Column Content */}
                Right Column
              </div>
            </main>
            <Footer />
          </div>
        </UserProvider>
      </body>
    </html>
  )
}
