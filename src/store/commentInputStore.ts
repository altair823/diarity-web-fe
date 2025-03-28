import { create } from 'zustand'

interface CommentInputState {
  text: string
  setText: (text: string) => void
}

export const useCommentInput = create<CommentInputState>((set) => ({
  text: '',
  setText: (text) => set({ text }),
}))
