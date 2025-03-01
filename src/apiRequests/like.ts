export function like(postId: string) {
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${postId}/like`, {
    method: 'POST',
    credentials: 'include',
  })
}
