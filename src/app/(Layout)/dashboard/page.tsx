'use client'

import Link from 'next/link'

export default function Page() {
  return (
    <div>
      <h1>Hello, Next.js!</h1>
      <Link href='/public'>go back</Link>
    </div>
  )
}
