import { useUser } from '@/context/UserContext'
import { useEffect, useState } from 'react'
import { Profile } from '@/app/profile'
import Image from 'next/image'
import google_logo from '/public/google_logo.svg'

async function CheckLogin() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/status`,
    {
      method: 'GET',
      credentials: 'include',
    }
  )
  console.log(response)
  return response.status === 200
}

async function Refresh() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`,
    {
      method: 'POST',
      credentials: 'include',
    }
  )
  console.log(response)
  return response
}

async function Logout() {
  // Delete cookies
  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  })
  // Refresh page
  window.location.href = '/'
}

async function Auth() {
  window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login/google`
}

function LoginButton() {
  const { loginInfo, setUser } = useUser()
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
        const refreshResult = await Refresh()
        if (refreshResult.status === 201) {
          return isUserLoggedIn()
        }
        return
      }
      const data = await response.json()
      setUser(data)
      setIsLoggedIn(true)
    }

    isUserLoggedIn().then((r) => console.log(r))
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
  const { loginInfo, setUser } = useUser()
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
        const refreshResult = await Refresh()
        if (refreshResult.status === 201) {
          return isUserLoggedIn()
        }
        return
      }
      const data = await response.json()
      setUser(data)
      setIsLoggedIn(true)
    }

    isUserLoggedIn().then((r) => console.log(r))
  }, [setUser])

  return (
    <div>
      {isLoggedIn ? (
        <Profile />
      ) : (
        <div className={'w-screen flex justify-center'}>
          <button
            onClick={Auth}
            className='text-black bg-white p-1 pl-4 max-h-12 rounded-3xl flex items-center justify-between w-4/5 md:w-2/6 min-w-80'
          >
            Google 계정으로 로그인
            <Image src={google_logo} alt='Google Logo' />
          </button>
        </div>
      )}
    </div>
  )
}

export { LoginButton, Logout, CheckLogin, GoogleLoginButton }
