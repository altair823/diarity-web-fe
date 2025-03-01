'use client'

import { Post } from '../page'
import DOMPurify from 'dompurify'
import Image from 'next/image'

import arrow_back from '/public/icons/arrow_back.svg'
import React from 'react'
import { like } from '@/apiRequests/like'

function LikeButton({
  likesCount,
  postId,
  toggled,
}: {
  likesCount: number
  postId: string
  toggled?: boolean
}) {
  if (!toggled) {
    return (
      <div
        className={
          'flex flex-row gap-1 hover:bg-purple-500 p-2 pt-1 pb-1 rounded-full group'
        }
        onClick={(event) => {
          event.stopPropagation()
          like(postId).then((res) => {
            console.log(res)
            window.location.reload()
          })
        }}
      >
        <svg
          className={'fill-current group-hover:text-white h-6 w-6'}
          viewBox={'0 0 18 18'}
        >
          <path d='M13.5 15.75H5.25V6L10.5.75l.938.938c.087.087.159.206.215.356.056.15.085.293.085.431v.262L10.913 6h4.837c.4 0 .75.15 1.05.45.3.3.45.65.45 1.05V9c0 .088-.012.181-.038.281-.024.1-.05.194-.075.281l-2.25 5.288c-.112.25-.3.463-.562.638a1.465 1.465 0 0 1-.825.262Zm-6.75-1.5h6.75L15.75 9V7.5H9l1.012-4.125L6.75 6.638v7.612ZM5.25 6v1.5H3v6.75h2.25v1.5H1.5V6h3.75Z' />
        </svg>
        <p
          className={'text-md font-bold text-black group-hover:text-white ml-1'}
        >
          {likesCount}
        </p>
      </div>
    )
  } else {
    return null
  }
}

function CommentButton({ commentsCount }: { commentsCount: number }) {
  return (
    <div
      className={
        'flex flex-row gap-1 hover:bg-purple-500 p-2 pt-1 pb-1 rounded-full group'
      }
      onClick={(event) => {
        event.stopPropagation()
      }}
    >
      <svg
        className={'fill-current group-hover:text-white h-6 w-6'}
        viewBox={'0 0 18 18'}
      >
        <path d='M1.5 16.5V3c0-.413.147-.766.44-1.06.294-.293.647-.44 1.06-.44h12c.412 0 .766.147 1.06.44.293.294.44.647.44 1.06v9c0 .412-.147.766-.44 1.06-.294.293-.647.44-1.06.44H4.5l-3 3ZM3.862 12H15V3H3v9.844L3.862 12Z' />
      </svg>
      <p className={'text-md font-bold text-black group-hover:text-white ml-1'}>
        {commentsCount}
      </p>
    </div>
  )
}

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
  console.log(post)
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
        <div className={'mt-4 flex flex-row gap-4 -m-2'}>
          {/*Likes*/}
          <LikeButton
            likesCount={post.likesCount}
            postId={post.postId.toString()}
          />
          {/*Comments*/}
          <CommentButton commentsCount={post.commentsCount} />
        </div>
      </div>
    </div>
  )
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
  console.log(post)
  return (
    <div>
      <div className={'bg-gray-200 p-4 pt-2 lg:pr-6 lg:pl-6 rounded-xl m-4'}>
        <div className='flex flex-col'>
          <div className={'flex justify-between'}>
            <div className={'flex items-center'}>
              <div className={'-ml-1 lg:-ml-3 mr-2'}>
                <button
                  onClick={() => {
                    window.history.back()
                  }}
                >
                  <Image
                    src={arrow_back}
                    alt={'back'}
                    className={'hover:bg-gray-100 rounded-full p-1'}
                    style={{
                      width: '35px',
                      maxWidth: '35px',
                    }}
                  />
                </button>
              </div>
              <h1
                className={'font-bold text-lg break-words'}
                dangerouslySetInnerHTML={{ __html: title }}
              />
            </div>
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
          <div className={'mt-4 flex flex-row gap-4 -m-2'}>
            {/*Likes*/}
            <LikeButton
              likesCount={post.likesCount}
              postId={post.postId.toString()}
              toggled={post.isLiked}
            />
            {/*Comments*/}
            <CommentButton commentsCount={post.commentsCount} />
          </div>
        </div>
      </div>
    </div>
  )
}
