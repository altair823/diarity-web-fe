/*
Task Card Colors
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple',
    'pink',
    'gray',
 */
import play_icon from '/public/icons/play_icon.svg'
import pause_icon from '/public/icons/pause_icon.svg'
import Image from 'next/image'
import { useTaskStore } from '@/store/taskStore'

export interface Task {
  id: number
  title: string
  description: string
  onProgress: boolean
  color: string
}

export function TaskBar() {
  const testTask: Task = {
    id: 1,
    title: 'Test Task',
    description: 'This is a test task',
    onProgress: false,
    color: 'red',
  }
  const { task, setTask, setOnProgress } = useTaskStore()
  setTask(testTask)
  return (
    <div
      className={'m-4 lg:mr-0 lg:ml-0 p-4 rounded-xl'}
      id={`task-${task.color}`}
    >
      <div className='flex items-center justify-start text-xl gap-2'>
        {!task.onProgress ? (
          <button
            onClick={() => {
              console.log('Play button clicked')
              setOnProgress(true)
              console.log(task)
            }}
            className={'hover:drop-shadow-2xl'}
          >
            <Image src={play_icon} alt={'play'} className={'w-10'} />
          </button>
        ) : (
          <button
            onClick={() => {
              console.log('Pause button clicked')
              setOnProgress(false)
              console.log(task)
            }}
          >
            <Image src={pause_icon} alt={'pause'} className={'w-10'} />
          </button>
        )}
        {task.title}
      </div>
    </div>
  )
}
