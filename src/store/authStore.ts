import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UserInfo {
  id: number
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

  id: number | null
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
            id: user.id,
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
            id: null,
            isLogin: false,
            email: null,
            name: null,
            displayName: null,
            role: null,
            picture: null,
          })
        },
        id: null,
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
