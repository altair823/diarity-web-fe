'use client'

import useSWR from 'swr'

const fetcher = (url: string) =>
  fetch(url, {
    method: 'GET',
    credentials: 'include',
  }).then((res) => res.json())

export function createPost({
  title,
  content,
  authorEmail,
}: {
  title: string
  content: string
  authorEmail: string
}) {
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content, authorEmail }),
    credentials: 'include',
  })
}

export function useGetAllPosts() {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
  return { posts: data, isError: error, isLoading }
}

export function useGetPost(id: string) {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${id}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
  return { post: data, isError: error, isLoading }
}

export function createComment(
  content: string,
  postId: string,
  parentCommentId?: string
) {
  return fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${postId}/new-comments`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, parentCommentId }),
      credentials: 'include',
    }
  )
}
