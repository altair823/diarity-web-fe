import './globals.css'
import Image from 'next/image'
import diarity_logo from '/public/diarity-logo.svg'
import new_button from '/public/new.svg'
import notification_button from '/public/notifications.svg'
import Link from 'next/link'
import { LoginButton, TryLogin } from '@/app/auth'
import { Category } from '@/app/category'
import { useEffect, useState } from 'react'
import { Profile } from '@/app/profile'
import { useUser } from '@/store/authStore'

export function NavBar() {
  const [categoryOpen, setCategoryOpen] = useState(false)
  const currentCategory = 'home'
  return (
    <header className='w-screen'>
      <nav className='bg-gray-300 border-gray-200'>
        <div className='px-6 bg-gray-300 shadow-md flex flex-wrap items-center py-0'>
          <div className='lg:hidden pr-5'>
            <button
              onClick={() => setCategoryOpen(!categoryOpen)}
              className='block text-gray-800 hover:text-gray-700 focus:text-gray-700 focus:outline-none'
            >
              <span className='sr-only'>Open category</span>
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 17 14'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M1 1h15M1 7h15M1 13h15'
                />
              </svg>
            </button>
          </div>

          <div className='flex-1 flex items-center'>
            <Link href='/' className='flex text-lg font-semibold'>
              <Image
                src={diarity_logo}
                alt='Diarity Logo'
                className={'h-auto w-10'}
              />
              <div className='english-text font-bold text-3xl m-3 text-purple-600'>
                Diarity
              </div>
            </Link>
          </div>
          <ConditionalMenu />
        </div>
      </nav>
      <div
        className={`${categoryOpen ? 'block' : 'hidden'} lg:hidden bg-gray-300`}
      >
        <Category isSmallScreen={true} />
      </div>
    </header>
  )
}

function ConditionalMenu() {
  const [loading, setLoading] = useState(true)
  const user = useUser((state) => state)

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return null // or return a loading indicator
  }

  const newButton = (
    <li>
      <Link href='/posts/submit'>
        <Image src={new_button} alt='New Button' />
      </Link>
    </li>
  )
  const notificationButton = (
    <li>
      <Link href='#'>
        <Image src={notification_button} alt='Notification Button' />
      </Link>
    </li>
  )
  const profile = (
    <li className='py-2 lg:py-0'>
      <Profile />
    </li>
  )
  const loginButton = (
    <li className='py-2 lg:py-0'>
      <LoginButton />
    </li>
  )

  return (
    <div className='flex items-center w-auto' id='menu'>
      <ul className='text-xl text-center justify-center gap-x-5 flex items-center'>
        {user.isLogin ? newButton : null}
        {user.isLogin ? notificationButton : null}
        {user.isLogin ? profile : loginButton}
      </ul>
    </div>
  )
}

export default ConditionalMenu
