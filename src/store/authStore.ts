import { create } from 'zustand'

interface UserInfo {
  email: string
  name: string
  role: string
  picture: string
}

interface UserState {
  isLogin: boolean | null
  login: (user: UserInfo) => void
  logout: () => void

  email: string | null
  name: string | null
  displayName: string | null
  role: string | null
  picture: string | null
}

export const useUser = create<UserState>((set) => {
  return {
    login: (user: UserInfo) => {
      set({
        isLogin: true,
        email: user.email,
        name: user.name,
        displayName: user.name,
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
})
