import React, { useEffect, useRef, useState } from 'react'
import { useCommentInput } from '@/store/commentInputStore'
import { createComment } from '@/apiRequests/post'
import Image from 'next/image'
import { useUser } from '@/store/authStore'
import { likeComment, unlikeComment } from '@/apiRequests/likePost'

export interface Comment {
  id: number
  userId: number
  displayName: string
  picture: string
  content: string
  likesCount: number
  isLiked: boolean
  postId: number
  parentCommentId?: number
  createdAt: Date
  modifiedAt: Date
}

export function CommentInputBox({ postId }: { postId: string }) {
  const { text, setText } = useCommentInput()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [text])

  return (
    <div className={`w-full`}>
      <div className=''>
        <label
          htmlFor='large-input'
          className='block mb-2 text-sm font-medium text-gray-900'
        ></label>
        <div className={'bg-purple-200 p-4 rounded-2xl'}>
          <div
            className={`w-full bg-white flex flex-col items-center justify-center rounded-2xl`}
          >
            <textarea
              id='large-input'
              ref={textareaRef}
              className='block w-full p-2 bg-white placeholder-gray-400 text-black rounded-2xl focus:outline-none'
              rows={1}
              placeholder={'어떻게 생각하세요?'}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {text && (
              <div
                className={
                  'w-full flex flex-col items-end justify-center mb-1 mr-1'
                }
              >
                <button
                  className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-2xl'
                  onClick={() => {
                    createComment(text, postId).then(() =>
                      window.location.reload()
                    )
                  }}
                >
                  등록
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function CommentLikeButton({
  likesCount,
  commentId,
  initialLiked,
  likeCallback,
  unlikeCallback,
}: {
  likesCount: number
  commentId: string
  initialLiked: boolean
  likeCallback: (commentId: string) => Promise<Response>
  unlikeCallback: (commentId: string) => Promise<Response>
}) {
  const [isLiked, setIsLiked] = useState(initialLiked)
  const [count, setCount] = useState(likesCount)

  const handleLike = async (event: React.MouseEvent) => {
    event.stopPropagation()

    if (!useUser.getState().isLogin) {
      window.location.href = '/login'
      return
    }

    if (isLiked) {
      await unlikeCallback(commentId)
      setCount(count - 1)
    } else {
      await likeCallback(commentId)
      setCount(count + 1)
    }
    setIsLiked(!isLiked)
  }

  return (
    <div
      className={`flex flex-row gap-1 w-fit
        ${isLiked ? 'text-white bg-purple-500 hover:bg-purple-400' : ' bg-gray-200 hover:bg-purple-400'} 
         p-2 pt-1 pb-1 rounded-full group`}
      onClick={handleLike}
    >
      <svg
        className={`fill-current group-hover:text-white
         h-4 w-4`}
        viewBox={'0 0 18 18'}
      >
        <path d='M13.5 15.75H5.25V6L10.5.75l.938.938c.087.087.159.206.215.356.056.15.085.293.085.431v.262L10.913 6h4.837c.4 0 .75.15 1.05.45.3.3.45.65.45 1.05V9c0 .088-.012.181-.038.281-.024.1-.05.194-.075.281l-2.25 5.288c-.112.25-.3.463-.562.638a1.465 1.465 0 0 1-.825.262Zm-6.75-1.5h6.75L15.75 9V7.5H9l1.012-4.125L6.75 6.638v7.612ZM5.25 6v1.5H3v6.75h2.25v1.5H1.5V6h3.75Z' />
      </svg>
      <p
        className={`text-xs font-bold
        ${isLiked ? 'text-white' : 'text-black group-hover:text-white'} 
        ml-1`}
      >
        {count}
      </p>
    </div>
  )
}

function CommentButton({ commentsCount }: { commentsCount: number }) {
  return (
    <div
      className={
        'flex flex-row gap-1 bg-gray-200 hover:bg-purple-500 p-2 pt-1 pb-1 rounded-full group'
      }
      onClick={(event) => {
        event.stopPropagation()
      }}
    >
      <svg
        className={'fill-current group-hover:text-white h-4 w-4'}
        viewBox={'0 0 18 18'}
      >
        <path d='M1.5 16.5V3c0-.413.147-.766.44-1.06.294-.293.647-.44 1.06-.44h12c.412 0 .766.147 1.06.44.293.294.44.647.44 1.06v9c0 .412-.147.766-.44 1.06-.294.293-.647.44-1.06.44H4.5l-3 3ZM3.862 12H15V3H3v9.844L3.862 12Z' />
      </svg>
      <p className={'text-xs font-bold text-black group-hover:text-white ml-1'}>
        {commentsCount}
      </p>
    </div>
  )
}

export function CommentBox({ comments }: { comments: Comment[] }) {
  const currentTime = new Date()
  const timeDiff = (currentTime: Date, commentTime: Date) => {
    const diff = currentTime.getTime() - commentTime.getTime()
    if (diff < 60000) {
      return '방금 전'
    } else if (diff < 3600000) {
      return `${Math.floor(diff / 60000)}분 전`
    } else if (diff < 86400000) {
      return `${Math.floor(diff / 3600000)}시간 전`
    } else {
      return `${Math.floor(diff / 86400000)}일 전`
    }
  }

  const childCommentsCount = (comment: Comment) => {
    return comments.filter((c) => c.parentCommentId === comment.id).length
  }

  const parentComments = comments.filter((comment) => !comment.parentCommentId)
  parentComments.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
  const childComments = new Map()
  comments
    .filter((c) => c.parentCommentId)
    .forEach((comment) => {
      if (childComments.has(comment.parentCommentId)) {
        childComments.get(comment.parentCommentId).push(comment)
      } else {
        childComments.set(comment.parentCommentId, [comment])
      }
    })
  childComments.keys().forEach((parentCommentsId) => {
    childComments
      .get(parentCommentsId)
      .sort(
        (a: Comment, b: Comment) =>
          a.createdAt.getTime() - b.createdAt.getTime()
      )
  })

  return (
    <div className={'w-full max-w-full'}>
      {parentComments.map((comment) => (
        <div key={comment.id} className={'pb-8'}>
          <div className={'flex flex-row items-center justify-start'}>
            <Image
              src={comment.picture}
              alt={'profile-image'}
              width={30}
              height={30}
              className='rounded-2xl mr-4'
            />
            <div className={'w-full max-w-full'}>
              <div className={'flex flex-row items-center justify-between'}>
                <p className={'text-sm text-gray-500 font-bold'}>
                  {comment.displayName}
                </p>
                <p className={'text-xs text-gray-400'}>
                  {timeDiff(currentTime, comment.createdAt)}
                </p>
              </div>
              <p className={'text-sm break-words pb-4'}>{comment.content}</p>
              <div className={'flex flex-row items-center justify-start gap-2'}>
                <CommentLikeButton
                  likesCount={comment.likesCount}
                  commentId={comment.id.toString()}
                  initialLiked={comment.isLiked}
                  likeCallback={likeComment}
                  unlikeCallback={unlikeComment}
                />
                <CommentButton commentsCount={childCommentsCount(comment)} />
              </div>
            </div>
          </div>
          {childComments.get(comment.id)?.map((childComment: Comment) => (
            <div key={childComment.id} className={'pl-8'}>
              {childComment.content}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
