'use client'

import { Post } from '../page'
import DOMPurify from 'dompurify'

export function PostSummaryBox({ post }: { post: Post }) {
  const title = DOMPurify.sanitize(post.title, { USE_PROFILES: { html: true } })
  const content = DOMPurify.sanitize(post.content, {
    USE_PROFILES: { html: true },
  })
  const author = DOMPurify.sanitize(post.authorDisplayName, {
    USE_PROFILES: { html: true },
  })
  const createdAt = new Date(post.createdAt)
  const handleAuthorClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    window.location.href = `/users/${post.authorEmail}`
  }
  return (
    <div
      className={
        'bg-gray-200 pt-2 pr-4 pl-4 pb-4 lg:pr-6 lg:pl-6 rounded-xl mb-6 cursor-pointer hover:bg-gray-100'
      }
      onClick={() => {
        window.location.href = `/posts/${post.postId}`
      }}
    >
      <div className='flex flex-col'>
        <div className={'flex justify-between items-start'}>
          <h1
            className={'font-bold text-lg break-words'}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p className={'text-xs text-gray-500 mt-4 min-w-16'}>
            {createdAt.toLocaleDateString()}
          </p>
        </div>
        <p
          dangerouslySetInnerHTML={{ __html: author }}
          className={
            'pt-2 text-xs w-fit text-gray-500 cursor-pointer hover:text-purple-500'
          }
          onClick={handleAuthorClick}
        />
        <p
          dangerouslySetInnerHTML={{ __html: content }}
          className={'pt-4 break-words'}
        />
      </div>
    </div>
  )
}

function dateToString(date: Date) {
  const dateString = date.toLocaleDateString()
  const timeString = date.toLocaleTimeString()
  return `${dateString} ${timeString}`
}

export function PostDetailBox({ post }: { post: Post }) {
  const title = DOMPurify.sanitize(post.title, { USE_PROFILES: { html: true } })
  const content = DOMPurify.sanitize(post.content, {
    USE_PROFILES: { html: true },
  })
  const author = DOMPurify.sanitize(post.authorDisplayName, {
    USE_PROFILES: { html: true },
  })
  const handleAuthorClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    window.location.href = `/users/${post.authorEmail}`
  }
  return (
    <div
      className={
        'bg-gray-200 pt-2 pr-4 pl-4 pb-4 lg:pr-6 lg:pl-6 rounded-xl mb-6'
      }
    >
      <div className='flex flex-col'>
        <div className={'flex justify-between items-start'}>
          <h1
            className={'font-bold text-lg break-words'}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <div className={'flex flex-col flex-end min-w-20 mt-4 right'}>
            <p className={'text-xs text-gray-500 text-end'}>
              {post.createdAt.toLocaleDateString()}
            </p>
            <p className={'text-xs text-gray-500 text-end'}>
              {post.createdAt.toLocaleTimeString()}
            </p>
          </div>
        </div>
        <p
          dangerouslySetInnerHTML={{ __html: author }}
          className={
            'pt-4 text-xs w-fit text-gray-500 cursor-pointer hover:text-purple-500'
          }
          onClick={handleAuthorClick}
        />
        <p
          dangerouslySetInnerHTML={{ __html: content }}
          className={'pt-4 break-words'}
        />
      </div>
    </div>
  )
}
