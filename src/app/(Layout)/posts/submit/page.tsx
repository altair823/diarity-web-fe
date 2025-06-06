'use client'

import { useEffect } from 'react'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Placeholder } from '@tiptap/extension-placeholder'
import { createPost } from '@/apiRequests/post'
import Image from 'next/image'
import bold_icon from '/public/icons/bold_icon.svg'
import italic_icon from '/public/icons/italic_icon.svg'
import title_icon from '/public/icons/title_icon.svg'
import list_icon from '/public/icons/list_icon.svg'
import numbered_list_icon from '/public/icons/numbered_list_icon.svg'
import add_link_icon from '/public/icons/add_link_icon.svg'
import { redirectTo } from '@/app/common'
import { useUser } from '@/store/authStore'

function PostButton({
  bookNameEditor,
  titleEditor,
  bodyEditor,
}: {
  bookNameEditor: Editor | null
  titleEditor: Editor | null
  bodyEditor: Editor | null
}) {
  if (!titleEditor || !bodyEditor || !bookNameEditor) {
    return <div></div>
  }
  if (titleEditor?.isEmpty || bodyEditor?.isEmpty || bookNameEditor?.isEmpty) {
    // deactivate button
    return (
      <button className='w-16 h-9 text-white bg-gray-300 rounded-2xl text-md'>
        완료
      </button>
    )
  }
  return (
    <button
      className='w-16 h-9 text-white bg-purple-500 rounded-2xl text-md'
      onClick={async () => {
        await createPost({
          bookTitle: bookNameEditor!.getText(),
          title: titleEditor!.getHTML(),
          content: bodyEditor!.getHTML(),
        }).then((res) => {
          if (!res.ok) {
            alert(
              '게시물 작성에 실패했습니다. 내용을 다른 곳에 저장해두시고 잠시 후 다시 시도해 주세요!'
            )
            return
          }
          // redirect to index page
          window.location.href = '/'
        })
      }}
    >
      완료
    </button>
  )
}

function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null
  }
  return (
    <div className='flex space-x-1 border-b'>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded-xl hover:bg-gray-200
        ${editor.isActive('bold') ? 'bg-gray-300' : ''}`}
      >
        <Image src={bold_icon} alt={'bold'} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded-xl hover:bg-gray-200
        ${editor.isActive('italic') ? 'bg-gray-300' : ''}`}
      >
        <Image src={italic_icon} alt={'italic'} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded-xl hover:bg-gray-200
        ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-300' : ''}`}
      >
        <Image src={title_icon} alt={'title'} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded-xl hover:bg-gray-200
        ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-300' : ''}`}
      >
        <Image src={list_icon} alt={'list'} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded-xl hover:bg-gray-200
        ${editor.isActive('bulletList') ? 'bg-gray-300' : ''}`}
      >
        <Image src={numbered_list_icon} alt={'numbered list'} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded-xl hover:bg-gray-200
        ${editor.isActive('orderedList') ? 'bg-gray-300' : ''}`}
      >
        <Image src={add_link_icon} alt={'add link'} />
      </button>
    </div>
  )
}

function TitleEditor(content: string) {
  return useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: '제목을 입력하세요',
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          'text-lg h-12 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300',
      },
    },
    immediatelyRender: false,
  })
}

function BookNameEditor(content: string) {
  return useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: '책 제목을 입력하세요',
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          'text-lg h-12 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300',
      },
    },
    immediatelyRender: false,
  })
}

function BodyEditor(content: string) {
  return useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: '내용을 입력하세요',
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          'min-h-32 h-fit p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 ',
      },
    },
    immediatelyRender: false,
  })
}

function NewPost() {
  const titleEditor = TitleEditor('')
  const bookNameEditor = BookNameEditor('')
  const bodyEditor = BodyEditor('')

  useEffect(() => {
    if (!useUser.getState().isLogin) {
      redirectTo('/login')
    }
  }, [])

  return (
    <div className={'w-screen lg:w-full p-4'}>
      <div className={'mt-2 mb-10 '}>
        <p className={'mb-8 text-2xl'}>글쓰기</p>
        <div className={'mb-4'}>
          <EditorContent editor={bookNameEditor} />
        </div>
        <EditorContent editor={titleEditor} />
      </div>

      <div className={'mb-4'}>
        <Toolbar editor={bodyEditor} />
      </div>

      <div>
        <EditorContent editor={bodyEditor} />
      </div>

      <div className={'mt-2 flex justify-end'}>
        <PostButton
          bookNameEditor={bookNameEditor}
          titleEditor={titleEditor}
          bodyEditor={bodyEditor}
        />
      </div>
    </div>
  )
}

export default NewPost
