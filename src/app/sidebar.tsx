import { LoginButton } from '@/app/auth'
import { useUser } from '@/context/UserContext'

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

function Sidebar() {
  return (
    <div>
      <p className={'p-4 mt-5'}>최근 방문</p>
      <div className='p-4 bg-gray-200 rounded-2xl'>
        <p>...</p>
      </div>
    </div>
  )
}

export function ConditionalSidebar() {
  const { loginInfo } = useUser()
  return loginInfo?.status !== 'success' ? <LandingBanner /> : <Sidebar />
}
