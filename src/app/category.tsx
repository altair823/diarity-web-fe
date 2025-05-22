'use client'

import Image from 'next/image'
import Link from 'next/link'
import category_home from '/public/category_home.svg'
import { usePathname } from 'next/navigation'

interface CategoryProps {
  isSmallScreen: boolean
}

export function Category({ isSmallScreen }: CategoryProps) {
  const currentPath = usePathname().split('/')[1] || 'home'
  console.log(currentPath)

  return (
    <div className={isSmallScreen ? 'category-small' : 'category-large'}>
      <ul className='flex flex-col w-full'>
        <li
          className={`${
            isSmallScreen ? 'category-item-small' : 'category-item-large'
          } ${currentPath === 'home' ? 'bg-purple-300' : ' bg-gray-100 hover:bg-gray-200'}`}
        >
          <Link href='/' className='flex items-center'>
            <Image src={category_home} alt={'Home'} />
            <span className='ml-2 font-bold'>홈</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}
