import { useUser } from '@/context/UserContext'
import { useEffect, useState } from 'react'
import { Profile } from '@/app/profile'

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

async function Login() {
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

  console.log(loginInfo?.user.name)

  return (
    <div>
      {isLoggedIn ? (
        <Profile />
      ) : (
        <button
          onClick={Login}
          className='text-black bg-purple-300 p-1 pl-9 pr-9 rounded-md'
        >
          로그인
        </button>
      )}
    </div>
  )
}

export { LoginButton, Logout }
