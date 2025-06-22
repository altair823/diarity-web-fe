'use client'

import { use } from 'react'
import { useGetUserPosts, useGetUserProfile } from '@/apiRequests/user'
import { Post } from '@/app/(Layout)/page'
import { PostSummaryBox } from '@/app/(Layout)/posts/post'
import { useRouter } from 'next/navigation'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
function UserPostsPage({ params }: { params: { userId: Promise<string> } }) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { userId } = use(params)
  const { userProfile, isLoading: isProfileLoading } = useGetUserProfile(userId)
  const { userPosts, isError, isLoading } = useGetUserPosts(userId)
  const router = useRouter()
  if (isProfileLoading) return <div>Loading user profile...</div>
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading user posts</div>
  const userDisplayName = userProfile!.usersInfo.displayName

  return (
    <div>
      <h2 className={'m-4 text-lg'}>
        <button
          className={'text-lg text-purple-700 font-bold'}
          onClick={
            () => router.push(`/users/${userId}`) // Navigate to user profile page
          }
        >
          {userDisplayName}
        </button>{' '}
        님의 글
      </h2>
      {userPosts.length > 0 ? (
        userPosts.map((post: Post) => (
          <PostSummaryBox key={post.id} post={post} contentMaxLength={400} />
        ))
      ) : (
        <div className='m-4'>작성한 글이 없습니다...</div>
      )}
    </div>
  )
}

export default UserPostsPage
