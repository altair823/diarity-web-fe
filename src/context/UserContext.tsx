'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

interface User {
  email: string
  name: string
  role: string
  picture: string
}

interface UserStatus {
  status: string
  user: User
}

interface UserContextType {
  loginInfo: UserStatus | null
  setUser: (user: UserStatus | null) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [loginInfo, setLoginInfo] = useState<UserStatus | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('loginInfo')
      if (storedUser) {
        setLoginInfo(JSON.parse(storedUser))
      }
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (loginInfo) {
      localStorage.setItem('loginInfo', JSON.stringify(loginInfo))
    } else {
      localStorage.removeItem('loginInfo')
    }
  }, [loginInfo])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <UserContext.Provider value={{ loginInfo, setUser: setLoginInfo }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
