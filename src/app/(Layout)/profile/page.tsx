'use client'

import { useGetUserProfile } from '@/apiRequests/task'
import { useUser } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function ProfilePage() {
  const router = useRouter()
  const { userProfile, isLoading } = useGetUserProfile()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!useUser.getState().isLogin) {
      router.push('/login')
    }
  }, [router])

  if (!mounted || isLoading) {
    return <div>Loading...</div>
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
            alt={userProfile?.usersInfo.name || 'default profile image'}
          />
          <h2>
            {userProfile?.usersInfo.role === 'ADMIN' && (
              <span className='text-red-500 font-bold'>관리자 </span>
            )}
            {userProfile?.usersInfo.name}
            <span> 님 안녕하세요!</span>
          </h2>
        </div>
      </div>
      <div className='bg-gray-100 m-4 p-4 rounded-2xl'>
        <h2 className='text-lg font-bold'>내 정보</h2>
        <div className='flex flex-col gap-2 pt-4'>
          <p>작성한 글 수: {userProfile?.postsCount}</p>
          <p>작성한 댓글 수: {userProfile?.commentsCount}</p>
        </div>
      </div>
    </div>
  )
}
