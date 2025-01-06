'use client'

import { PostDetailBox } from '../post'
import { useGetPost } from '@/apiRequests/post'
import { use } from 'react'

const PostPage = ({ params }) => {
  const unwrappedParams = use(params)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { postId } = unwrappedParams
  const { post, isError, isLoading } = useGetPost(postId)
  console.log(postId)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading post</div>
  return (
    <div>
      <PostDetailBox post={post} />
    </div>
  )
}

export default PostPage
