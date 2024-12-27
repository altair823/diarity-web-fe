'use client'

import { Editor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { CheckLogin } from '@/app/auth'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import bold_icon from '/public/icons/bold_icon.svg'
import italic_icon from '/public/icons/italic_icon.svg'
import title_icon from '/public/icons/title_icon.svg'
import list_icon from '/public/icons/list_icon.svg'
import numbered_list_icon from '/public/icons/numbered_list_icon.svg'
import add_link_icon from '/public/icons/add_link_icon.svg'
import Image from 'next/image'
import { Placeholder } from '@tiptap/extension-placeholder'

function TitleEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: '제목을 입력하세요',
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'text-lg w-full h-12 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300',
      },
    },
  })
  return <EditorContent editor={editor} />
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

function BodyEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: '내용을 입력하세요',
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'w-full min-h-32 h-fit p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 ',
      },
    },
  })
  return (
    <div>
      <div className={'mb-4'}>
        <Toolbar editor={editor} />
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}

function PostButton() {
  return (
    <button
      className='w-16 h-8 text-white bg-purple-500 rounded-2xl text-sm'
      onClick={() => console.log('Post')}
    >
      완료
    </button>
  )
}

function NewPost() {
  const router = useRouter()
  useEffect(() => {
    CheckLogin().then((result) => {
      if (!result) {
        router.push('/login')
      }
    })
  }, [router])
  return (
    <div>
      <div className={'mt-2 mb-10 '}>
        <p className={'mb-8 text-2xl'}>글쓰기</p>
        <TitleEditor />
      </div>
      <BodyEditor />
      <div className={'mt-2 flex justify-end'}>
        <PostButton />
      </div>
    </div>
  )
}

export default NewPost
