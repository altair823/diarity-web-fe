import { create } from 'zustand'

interface PostInfo {
  postId: number
  likesCount: number
}

interface PostState {
  postInfos: { [postId: number]: PostInfo }

  like: (postId: number) => void
  unlike: (postId: number) => void
}

export const usePost = create<PostState>((set) => {
  return {
    postInfos: {},
    like: (postId: number) => {
      set((state) => {
        const postInfo = state.postInfos[postId]
        if (!postInfo) {
          return {
            postInfos: {
              ...state.postInfos,
              [postId]: {
                postId,
                likesCount: 1,
              },
            },
          }
        }
        return {
          postInfos: {
            ...state.postInfos,
            [postId]: {
              ...postInfo,
              likesCount: postInfo.likesCount + 1,
            },
          },
        }
      })
    },
    unlike: (postId: number) => {
      set((state) => {
        const postInfo = state.postInfos[postId]
        if (!postInfo) {
          return state
        }
        return {
          postInfos: {
            ...state.postInfos,
            [postId]: {
              ...postInfo,
              likesCount: postInfo.likesCount - 1,
            },
          },
        }
      })
    },
  }
})
