export function createPost({
  title,
  content,
  author,
}: {
  title: string
  content: string
  author: string
}) {
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content, author }),
    credentials: 'include',
  })
}
