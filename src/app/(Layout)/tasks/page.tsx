'use client'

import { TaskNewButton } from '@/app/(Layout)/tasks/taskNewButton'
import { TaskBar } from '@/app/(Layout)/tasks/task'
import { useUser } from '@/store/authStore'
import { useEffect } from 'react'
import { redirectTo } from '@/app/common'

export default function TasksPage() {
  const isLogin = useUser((state) => state.isLogin)

  useEffect(() => {
    console.log('isLogin 상태:', isLogin)
    if (isLogin === false) {
      redirectTo('/login')
    }
  }, [isLogin])
  return (
    <div className={'w-screen lg:w-full'}>
      <TaskBar />
      <TaskNewButton />
    </div>
  )
}
