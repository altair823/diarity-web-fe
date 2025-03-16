import { create } from 'zustand'

interface CommentState {
  text: string
  setText: (text: string) => void
}

export const useComment = create<CommentState>((set) => ({
  text: '',
  setText: (text) => set({ text }),
}))
