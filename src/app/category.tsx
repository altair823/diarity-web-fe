'use client'

import Image from 'next/image'
import Link from 'next/link'
import category_home from '/public/category_home.svg'
import category_popular from '/public/category_popular.svg'
import { useUser } from '@/store/authStore'
import { usePathname } from 'next/navigation'

interface CategoryProps {
  isSmallScreen: boolean
}

export function Category({ isSmallScreen }: CategoryProps) {
  const currentPath = usePathname().split('/')[1] || 'home'

  return (
    <div className={isSmallScreen ? 'category-small' : 'category-large'}>
      <ul className='flex flex-col w-full'>
        <li
          className={`${
            isSmallScreen ? 'category-item-small' : 'category-item-large'
          } ${currentPath === 'home' ? 'bg-purple-300' : 'hover:bg-gray-200'}`}
        >
          <Link href='/' className='flex items-center'>
            <Image src={category_home} alt={'Home'} />
            <span className='ml-2 font-bold'>홈</span>
          </Link>
        </li>
        {/*<li*/}
        {/*  className={`${*/}
        {/*    isSmallScreen ? 'category-item-small' : 'category-item-large'*/}
        {/*  } ${currentPath === 'tasks' ? 'bg-purple-300' : 'hover:bg-gray-200'}`}*/}
        {/*  onClick={() => {*/}
        {/*    if (!useUser.getState().isLogin) {*/}
        {/*      window.location.href = '/login'*/}
        {/*    }*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <Link href='/tasks' className='flex items-center'>*/}
        {/*    <Image src={category_home} alt={'Task'} />*/}
        {/*    <span className='ml-2 font-bold'>시간 추적</span>*/}
        {/*  </Link>*/}
        {/*</li>*/}
      </ul>
    </div>
  )
}
