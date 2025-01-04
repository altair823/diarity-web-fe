'use client'

import { useAllPosts } from '@/apiRequests/post'
import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'
import { PostBox } from '@/app/(Layout)/post/post'

export interface Post {
  postId: number
  title: string
  createdAt: Date
  updatedAt: Date
  authorEmail: string
  authorDisplayName: string
  content: string
  images: string[]
  link: string
  isPublic: boolean
}

export default function Home() {
  const { posts, isError, isLoading } = useAllPosts()
  const [sanitizedPosts, setSanitizedPosts] = useState<Post[]>([])

  useEffect(() => {
    if (posts) {
      const sanitized = posts.map((post: Post) => ({
        ...post,
        content: DOMPurify.sanitize(post.content),
      }))
      setSanitizedPosts(sanitized)
    }
  }, [posts])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  const content = sanitizedPosts.map((post: Post) => (
    <div key={post.postId}>
      <div className={'m-4'}>
        <PostBox post={post} />
      </div>
    </div>
  ))

  return <div>{content}</div>
}
