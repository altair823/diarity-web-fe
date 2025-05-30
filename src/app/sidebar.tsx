import { LoginButton } from '@/app/auth'
import { useUser } from '@/store/authStore'
import { useEffect, useState } from 'react'
import { useRecentVisited } from '@/store/recentVisitedStore'

function LandingBanner() {
  return (
    <section>
      <div className={'mt-6 p-5 bg-gray-200 rounded-2xl'}>
        <p className={'font-medium pb-4 text-xl'}>처음이신가요?</p>
        <p className={'pb-4 text-sm'}>로그인하고 더 많은 글을 찾아보세요!</p>
        <LoginButton />
      </div>
    </section>
  )
}

function RecentVisitedSideBar() {
  const recentVisited = useRecentVisited().recentVisitedPages
  return (
    <div>
      <p className={'p-4 pb-0 mt-5'}>최근 방문</p>
      <div className='p-4  rounded-2xl'>
        <ul className={''}>
          {recentVisited.map((page, index) => (
            <li
              key={index}
              className='my-4 px-4 py-2 bg-gray-200 hover:shadow-xl cursor-pointer rounded-2xl'
              onClick={() => {
                window.location.href = page.url
              }}
            >
              <div>{page.title}</div>
              <div className='text-sm text-gray-500'>
                {page.contentSummary}...
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function ConditionalSidebar() {
  const [loading, setLoading] = useState(true)
  const user = useUser((state) => state)
  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return null // or return a loading indicator
  }

  return user.isLogin ? <RecentVisitedSideBar /> : <LandingBanner />
}
