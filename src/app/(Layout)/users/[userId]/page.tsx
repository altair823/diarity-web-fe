'use client'

import { useUser } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { use, useEffect } from 'react'
import Image from 'next/image'
import { redirectTo } from '@/app/common'
import { useGetUserPostsByCount, useGetUserProfile } from '@/apiRequests/user'
import { Post } from '@/app/(Layout)/page'
import { PostSummaryBox } from '@/app/(Layout)/posts/post'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export default function ProfilePage({ params }) {
  const router = useRouter()
  useEffect(() => {
    if (!useUser.getState().isLogin) {
      redirectTo('/login')
    }
  }, [])
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { userId } = use(params)
  const { userProfile, isLoading } = useGetUserProfile(userId)
  const { userPosts } = useGetUserPostsByCount(userId, 3)
  if (isLoading) {
    return <div>Loading...</div>
  }
  let userRole = ''
  if (userProfile.usersInfo.role === 'ADMIN') {
    userRole = '관리자'
  } else if (userProfile.usersInfo.role === 'NORMAL') {
    userRole = '일반 사용자'
  } else if (userProfile.usersInfo.role === 'READ_ONLY') {
    userRole = '읽기 전용 게스트'
  }
  return (
    <div>
      <div className='bg-gray-100 m-4 p-4 rounded-2xl'>
        <div className='flex items-center justify-start gap-4'>
          <Image
            src={
              userProfile?.usersInfo.picture ||
              '/public/default_profile_image.svg'
            }
            width={50}
            height={50}
            className={'rounded-full'}
            alt={userProfile?.usersInfo.name || 'default users image'}
          />
          <h2>
            {userProfile?.usersInfo.role === 'ADMIN' && (
              <span className='text-red-500 font-bold'>관리자 </span>
            )}
            {userProfile?.usersInfo.name}
            <span> 님의 프로필</span>
          </h2>
        </div>
        <p className={'mt-4 text-gray-600'}>
          권한: <span>{userRole || '알 수 없는 권한'}</span>
        </p>
      </div>
      <div className={'m-4 mt-16'}>
        <div className={'p-4 flex items-center justify-between'}>
          <div className={'flex justify-start'}>
            <h2 className='text-lg font-bold'>작성한 글</h2>
            <p className='pl-4 text-sm grid place-items-center text-gray-500'>
              총 {userProfile?.postsCount}개
            </p>
          </div>
          <p
            className=' text-purple-500 hover:underline cursor-pointer'
            onClick={() => {
              router.push(`/users/${userId}/posts`)
            }}
          >
            더 보기
          </p>
        </div>
        <div className='flex flex-col gap-2 pt-4'>
          {userPosts && userPosts.length > 0 ? (
            userPosts.map((post: Post) => (
              <PostSummaryBox key={post.id} post={post} contentMaxLength={10} />
            ))
          ) : (
            <p className={'p-4'}>작성한 글이 없습니다.</p>
          )}

          <p className='flex flex-col items-center text-2xl font-bold}'>⋮</p>
        </div>
      </div>
    </div>
  )
}
