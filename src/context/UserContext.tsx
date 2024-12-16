import { createContext, useContext, useState, ReactNode } from 'react'

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
  const [loginInfo, setUser] = useState<UserStatus | null>(null)

  return (
    <UserContext.Provider value={{ loginInfo, setUser }}>
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
