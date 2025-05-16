export function like(postId: string) {
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

export function likeComment(postId: string, commentId: string) {
  return fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${postId}/comments/${commentId}/like`,
    {
      method: 'POST',
      credentials: 'include',
    }
  )
}

export function unlikeComment(postId: string, commentId: string) {
  return fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${postId}/comments/${commentId}/like`,
    {
      method: 'DELETE',
      credentials: 'include',
    }
  )
}
