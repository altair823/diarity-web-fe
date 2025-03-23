export function likePost(postId: string) {
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${postId}/like`, {
    method: 'POST',
    credentials: 'include',
  })
}

export function unlikePost(postId: string) {
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${postId}/like`, {
    method: 'DELETE',
    credentials: 'include',
  })
}

export function likeComment(commentId: string) {
  return fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/comments/${commentId}/like`,
    {
      method: 'POST',
      credentials: 'include',
    }
  )
}

export function unlikeComment(commentId: string) {
  return fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/comments/${commentId}/like`,
    {
      method: 'DELETE',
      credentials: 'include',
    }
  )
}
