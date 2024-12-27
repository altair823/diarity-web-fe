'use client'

import { CheckLogin, GoogleLoginButton } from '@/app/auth'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  CheckLogin().then((result) => {
    if (result) {
      router.push('/')
    }
  })
  return (
    <div
      className={
        'bg-gray-300 md:bg-gray-100 h-screen w-screen p-7 md:rounded-2xl  md:w-2/5 md:h-1/5 md:min-h-64 md:min-w-96 flex flex-col md:justify-center items-center'
      }
    >
      <div className={'flex flex-col h-48 items-center justify-between'}>
        <h1 className={'english-text text-4xl'}>Log In</h1>
        <p>계속 진행하려면 로그인이 필요합니다. </p>
        <GoogleLoginButton />
      </div>
    </div>
  )
}
