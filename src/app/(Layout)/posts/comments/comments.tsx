'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useCommentInput } from '@/store/commentInputStore'
import { createComment } from '@/apiRequests/post'
import Image from 'next/image'
import { useUser } from '@/store/authStore'
import { likeComment, unlikeComment } from '@/apiRequests/like'
import {
  saveScrollPosition,
  restoreScrollPosition,
  scrollToBottom,
} from '@/utility/scroll'
import { timeDiff } from '@/utility/time'

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

  useEffect(() => {
    scrollToBottom()
  }, [])

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
                    createComment(text, postId).then(() => {
                      window.location.reload()
                    })
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
  postId,
  likesCount,
  commentId,
  initialLiked,
  likeCallback,
  unlikeCallback,
}: {
  postId: string
  likesCount: number
  commentId: string
  initialLiked: boolean
  likeCallback: (postId: string, commentId: string) => Promise<Response>
  unlikeCallback: (postId: string, commentId: string) => Promise<Response>
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
      await unlikeCallback(postId, commentId)
      setCount(count - 1)
    } else {
      await likeCallback(postId, commentId)
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

function CommentButtons({
  postId,
  comment,
  parentCommentId,
}: {
  postId: number
  comment: Comment
  parentCommentId?: number
}) {
  const [isChildCommentOpen, setIsChildCommentOpen] = useState(false)
  const [childCommentText, setChildCommentText] = useState('')
  useEffect(() => {
    restoreScrollPosition()
  }, [])
  return (
    <div className={`w-full`}>
      <div className={`flex flex-row gap-1 w-fit`}>
        <CommentLikeButton
          postId={postId.toString()}
          likesCount={comment.likesCount}
          commentId={comment.id.toString()}
          initialLiked={comment.isLiked}
          likeCallback={likeComment}
          unlikeCallback={unlikeComment}
        />
        <div
          className={
            'flex flex-row gap-1 bg-gray-200 hover:bg-purple-500 p-2 pt-1 pb-1 rounded-full group'
          }
          onClick={(event) => {
            event.stopPropagation()
            setIsChildCommentOpen(true)
          }}
        >
          <svg
            className={'fill-current group-hover:text-white h-4 w-4'}
            viewBox={'0 0 18 18'}
          >
            <path d='M1.5 16.5V3c0-.413.147-.766.44-1.06.294-.293.647-.44 1.06-.44h12c.412 0 .766.147 1.06.44.293.294.44.647.44 1.06v9c0 .412-.147.766-.44 1.06-.294.293-.647.44-1.06.44H4.5l-3 3ZM3.862 12H15V3H3v9.844L3.862 12Z' />
          </svg>
          <p
            className={
              'text-xs font-bold text-black group-hover:text-white ml-1'
            }
          >
            답글
          </p>
        </div>
      </div>
      {isChildCommentOpen && (
        <div className={'mt-2'}>
          <textarea
            className='block w-full p-2 bg-white placeholder-gray-400 text-black rounded-2xl focus:outline-none'
            rows={2}
            placeholder={'Reply to this comment'}
            value={childCommentText}
            onChange={(e) => setChildCommentText(e.target.value)}
          />
          <div className={'flex justify-end'}>
            <button
              className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-4 rounded-2xl mt-2 w-fit'
              onClick={() => {
                createComment(
                  childCommentText,
                  postId.toString(),
                  parentCommentId?.toString()
                ).then(() => {
                  setIsChildCommentOpen(false)
                  setChildCommentText('')
                  saveScrollPosition()
                  window.location.reload()
                })
              }}
            >
              등록
            </button>
            <button
              className='ml-2 bg-gray-400 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded-2xl mt-2 w-fit'
              onClick={() => {
                setIsChildCommentOpen(false)
                setChildCommentText('')
              }}
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export function ChildCommentBox({
  postId,
  parentComment,
  childComments,
}: {
  postId: number
  parentComment: Comment
  childComments: Comment[]
}) {
  const currentTime = new Date()
  return (
    <div className={'mt-4 pl-8'}>
      {childComments.map((childComment) => (
        <div key={childComment.id} className={'pb-4'}>
          <div className={'flex flex-row items-start justify-start'}>
            <Image
              src={childComment.picture}
              alt={'profile-image'}
              width={30}
              height={30}
              className='rounded-2xl mr-4'
            />
            <div className={'w-full max-w-full'}>
              <div className={'flex flex-row items-center justify-between'}>
                <p className={'text-sm text-gray-500 font-bold'}>
                  {childComment.displayName}
                </p>
                <p className={'text-xs text-gray-400'}>
                  {timeDiff(currentTime, childComment.createdAt)}
                </p>
              </div>
              <p className={'text-sm break-words pb-4'}>
                {childComment.parentCommentId === parentComment.id ? (
                  <span className={'text-sm text-gray-500 font-bold mr-2'}>
                    @{parentComment.displayName}
                  </span>
                ) : (
                  <span className={'text-sm text-gray-500 font-bold mr-2'}>
                    @
                    {
                      childComments.filter(
                        (c: Comment) => c.id === childComment.parentCommentId
                      )[0].displayName
                    }
                  </span>
                )}
                {childComment.content}
              </p>
              <div className={'flex flex-row items-center justify-start gap-2'}>
                <CommentButtons
                  postId={postId}
                  comment={childComments.find((c) => c.id === childComment.id)!}
                  parentCommentId={childComment.id}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Comments는 트리 구조로 되어있지만 최상위 부모 댓글 외에는 모두 최상위 부모 댓글의 자식 댓글로
// 간주된다. 따라서 map을 사용하여 각 최상위 부모 댓글에 대한 모든 자식 댓글을 저장한다.
// 그러나 childComments 속 parentCommentId는 최상위 부모 댓글의 id가 아니라
// childComments가 가리키는 부모 댓글의 id이다.
function organizeComments(comments: Comment[]) {
  // 모든 댓글을 ID로 매핑
  const commentMap = new Map<number, Comment>()
  comments.forEach((comment) => {
    commentMap.set(comment.id, comment)
  })

  // 최상위 부모 댓글 필터링
  const parentComments = comments.filter((comment) => !comment.parentCommentId)

  // 최상위 부모 댓글별 자식 댓글 맵 생성
  const childrenByParent = new Map<number, Comment[]>()

  // 각 자식 댓글의 최상위 부모를 찾는 함수
  function findRootParent(comment: Comment): number {
    if (!comment.parentCommentId) return comment.id

    const parent = commentMap.get(comment.parentCommentId)
    if (!parent) return comment.id // 부모를 찾을 수 없으면 자신을 반환

    return findRootParent(parent)
  }

  // 모든 자식 댓글을 순회하며 최상위 부모 찾기
  comments
    .filter((comment) => comment.parentCommentId)
    .forEach((comment) => {
      const rootParentId = findRootParent(comment)

      if (!childrenByParent.has(rootParentId)) {
        childrenByParent.set(rootParentId, [])
      }

      childrenByParent.get(rootParentId)?.push(comment)
    })

  return { parentComments, childrenByParent }
}

export function CommentBox({
  postId,
  comments,
}: {
  postId: number
  comments: Comment[]
}) {
  const currentTime = new Date()

  const { parentComments, childrenByParent } = organizeComments(comments)

  return (
    <div className={'w-full max-w-full'}>
      {parentComments.map((comment) => (
        <div key={comment.id} className={'pb-8'}>
          <div className={'flex flex-row items-start justify-start'}>
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
                <CommentButtons
                  postId={postId}
                  comment={comment}
                  parentCommentId={comment.id}
                />
              </div>
            </div>
          </div>
          {childrenByParent.get(comment.id) && (
            <ChildCommentBox
              postId={postId}
              parentComment={comment}
              childComments={childrenByParent.get(comment.id)!}
            />
          )}
        </div>
      ))}
    </div>
  )
}
