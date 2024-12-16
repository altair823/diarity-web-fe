import { useUser } from '@/context/UserContext'
import Image from 'next/image'
import defaultProfile from '/public/default_profile_image.svg'
import { Logout } from '@/app/login'
import { useState } from 'react'

export function GetProfileImage() {
  const { loginInfo } = useUser()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className='relative'>
      <Image
        src={loginInfo?.user.picture || defaultProfile}
        alt='Profile Picture'
        width={30}
        height={30}
        className='rounded-full cursor-pointer'
        onClick={toggleMenu}
      />
      {isMenuOpen && (
        <div className='absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg text-base'>
          <ul>
            <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
              프로필
            </li>
            <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>설정</li>
            <li
              className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
              onClick={Logout}
            >
              로그아웃
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
