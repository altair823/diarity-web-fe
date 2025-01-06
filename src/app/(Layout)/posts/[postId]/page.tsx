'use client'

import { PostDetailBox } from '../post'
import { useGetPost } from '@/apiRequests/post'
import { use } from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const PostPage = ({ params }) => {
  const unwrappedParams = use(params)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { postId } = unwrappedParams
  const { post, isError, isLoading } = useGetPost(postId)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading post</div>
  post.createdAt = new Date(post.createdAt)
  post.updatedAt = new Date(post.updatedAt)
  return (
    <div>
      <PostDetailBox post={post} />
    </div>
  )
}

export default PostPage
