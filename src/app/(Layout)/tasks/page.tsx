'use client'

import { TaskNewButton } from '@/app/(Layout)/tasks/taskNewButton'
import { TaskBar } from '@/app/(Layout)/tasks/task'

export default function TasksPage() {
  return (
    <div className={'w-screen lg:w-full'}>
      <TaskBar />
      <TaskNewButton />
    </div>
  )
}
