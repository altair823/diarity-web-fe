'use client'

import '../globals.css'
import React from 'react'
import { enFont, koFont } from '@/app/font'
import Head from 'next/head'

export default function NolayoutLayout({
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
      <body>{children}</body>
    </html>
  )
}
