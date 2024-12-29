import Image from 'next/image'
import category_home from '/public/category_home.svg'
import category_popular from '/public/category_popular.svg'

interface CategoryProps {
  isSmallScreen: boolean
  currentCategory: string
}

export function Category({ isSmallScreen, currentCategory }: CategoryProps) {
  return (
    <div className={isSmallScreen ? 'category-small' : 'category-large'}>
      <ul className='flex flex-col w-full'>
        <li
          className={`${
            isSmallScreen ? 'category-item-small' : 'category-item-large'
          } ${currentCategory === 'home' ? 'bg-purple-300' : 'hover:bg-gray-200'}`}
        >
          <a href='#' className='flex items-center'>
            <Image src={category_home} alt={'Home'} />
            <span className='ml-2 font-bold'>홈</span>
          </a>
        </li>
        {/* 추후에 인기 게시물 조회 기능이 개발되면 추가될 예정 */}
        {/*<li*/}
        {/*  className={`${*/}
        {/*    isSmallScreen ? 'category-item-small' : 'category-item-large'*/}
        {/*  } ${currentCategory === 'popular' ? 'bg-purple-300' : 'hover:bg-gray-200'}`}*/}
        {/*>*/}
        {/*  <a href='#' className='flex items-center'>*/}
        {/*    <Image src={category_popular} alt={'Popular'} />*/}
        {/*    <span className='ml-2 font-bold'>인기</span>*/}
        {/*  </a>*/}
        {/*</li>*/}
      </ul>
    </div>
  )
}
