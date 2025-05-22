import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UserInfo {
  email: string
  name: string
  role: string
  picture: string
  displayName: string
}

interface UserStore {
  isLogin: boolean | null
  login: (user: UserInfo) => void
  logout: () => void

  email: string | null
  name: string | null
  displayName: string | null
  role: string | null
  picture: string | null
}

export const useUser = create(
  persist<UserStore>(
    (set) => {
      return {
        login: (user: UserInfo) => {
          set({
            isLogin: true,
            email: user.email,
            name: user.name,
            displayName: user.displayName,
            role: user.role,
            picture: user.picture,
          })
        },
        logout: () => {
          set({
            isLogin: false,
            email: null,
            name: null,
            displayName: null,
            role: null,
            picture: null,
          })
        },
        isLogin: null,
        email: null,
        name: null,
        displayName: null,
        role: null,
        picture: null,
      }
    },
    {
      name: 'user-storage',
    }
  )
)
