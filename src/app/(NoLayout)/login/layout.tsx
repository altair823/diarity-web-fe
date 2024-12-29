'use client'

import React from 'react'

export default function LoginPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <div className='w-screen h-screen bg-gray-700 text-sm md:flex flex-col justify-center items-center'>
        {children}
      </div>
    </section>
  )
}
