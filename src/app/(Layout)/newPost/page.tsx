'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { CheckLogin } from '@/app/auth'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

function NewPage() {
  const router = useRouter()
  useEffect(() => {
    CheckLogin().then((result) => {
      if (!result) {
        router.push('/login')
      }
    })
  })
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
  })
  return <EditorContent editor={editor} />
}

export default NewPage
