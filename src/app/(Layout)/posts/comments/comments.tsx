import { useEffect, useRef } from 'react'
import { useComment } from '@/store/commentStore'
import { createComment } from '@/apiRequests/post'

export function CommentBox({
  commentsCount,
  postId,
}: {
  commentsCount: number
  postId: string
}) {
  const { text, setText } = useComment()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [text])

  return (
    <div className={`w-full`}>
      <div className='mb-6'>
        <label
          htmlFor='large-input'
          className='block mb-2 text-sm font-medium text-gray-900'
        >
          댓글 {commentsCount || '0'}개
        </label>
        <div className={'bg-gray-200 p-4 rounded-2xl'}>
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
