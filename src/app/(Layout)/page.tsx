'use client'

import { useGetAllPosts } from '@/apiRequests/post'
import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'
import { PostSummaryBox } from '@/app/(Layout)/posts/post'

export interface Post {
  id: number
  title: string
  createdAt: Date
  updatedAt: Date
  authorEmail: string
  authorDisplayName: string
  content: string
  images: string[]
  link: string
  isPublic: boolean
  likesCount: number
  commentsCount: number
  isLiked: boolean
}

export default function Home() {
  const { posts, isError, isLoading } = useGetAllPosts()
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

  console.log(posts)
  const content = sanitizedPosts.map((post: Post) => (
    <div key={post.id}>
      <div className={'m-4'}>
        <PostSummaryBox post={post} />
      </div>
    </div>
  ))

  return <div>{content}</div>
}
