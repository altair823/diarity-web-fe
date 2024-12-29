import { useUser } from '@/context/UserContext'
import { useEffect, useState } from 'react'
import { Profile } from '@/app/profile'
import Image from 'next/image'
import google_logo from '/public/google_logo.svg'
import { redirectToAbsolute } from '@/app/common'

function CheckLogin(): boolean {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkAuthStatus = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/status`,
        {
          method: 'GET',
          credentials: 'include',
        }
      )
      if (response.status === 200) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    }

    checkAuthStatus()
  }, [isLoggedIn])

  return isLoggedIn
}

async function Logout() {
  // Delete cookies
  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  })
  // Delete user info
  localStorage.removeItem('loginInfo')

  // Refresh page
  window.location.href = '/'
}

async function Auth() {
  redirectToAbsolute(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login/google`)
}

function LoginButton() {
  const { setUser } = useUser()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const isUserLoggedIn = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/status`,
        {
          method: 'GET',
          credentials: 'include',
        }
      )
      if (response.status === 401) {
        const refreshResult = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`,
          {
            method: 'POST',
            credentials: 'include',
          }
        )
        if (refreshResult.status === 201) {
          return isUserLoggedIn()
        }
        return
      }
      const data = await response.json()
      setUser(data)
      setIsLoggedIn(true)
    }
    isUserLoggedIn().then((r) => r)
  }, [setUser])
  return (
    <div>
      {isLoggedIn ? (
        <Profile />
      ) : (
        <button
          onClick={Auth}
          className='text-black bg-purple-300 p-1 pl-9 pr-9 rounded-md'
        >
          로그인
        </button>
      )}
    </div>
  )
}

function GoogleLoginButton() {
  return (
    <div>
      <div className={'w-screen flex justify-center'}>
        <button
          onClick={Auth}
          className='text-black bg-white p-1 pl-4 max-h-12 rounded-3xl flex items-center justify-between w-4/5 md:w-2/6 min-w-80'
        >
          Google 계정으로 로그인
          <Image src={google_logo} alt='Google Logo' />
        </button>
      </div>
    </div>
  )
}

export { LoginButton, Logout, CheckLogin, GoogleLoginButton }
