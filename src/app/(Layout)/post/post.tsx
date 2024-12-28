'use client'

import { Post } from '../page'
import DOMPurify from 'dompurify'

export function PostBox({ post }: { post: Post }) {
  const title = DOMPurify.sanitize(post.title, { USE_PROFILES: { html: true } })
  const content = DOMPurify.sanitize(post.content, {
    USE_PROFILES: { html: true },
  })
  const author = DOMPurify.sanitize(post.authorDisplayName, {
    USE_PROFILES: { html: true },
  })
  const createdAt = new Date(post.createdAt)
  return (
    <div
      className={
        'bg-gray-200 pt-2 pr-4 pl-4 pb-4 lg:pr-6 lg:pl-6 rounded-xl mb-6'
      }
    >
      <div className='flex flex-col'>
        <div className={'flex justify-between items-end'}>
          <h1
            className={'font-bold text-lg'}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p className={'text-xs text-gray-500'}>
            {createdAt.toLocaleDateString()}
          </p>
        </div>
        <p
          dangerouslySetInnerHTML={{ __html: author }}
          className={'pt-2 text-xs text-gray-500'}
        />
        <p dangerouslySetInnerHTML={{ __html: content }} className={'pt-4'} />
      </div>
    </div>
  )
}
