import { Task } from '@/app/(Layout)/tasks/task'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TaskState {
  task: Task
  resetTask: () => void
  setTask: (task: Task) => void
  setTitle: (title: string) => void
  setDescription: (description: string) => void
  setOnProgress: (completed: boolean) => void
  setColor: (color: string) => void
}

export const useTaskStore = create(
  persist<TaskState>(
    (set) => ({
      task: {
        id: 0,
        title: '',
        description: '',
        onProgress: false,
        color: 'gray',
      },
      resetTask: () =>
        set({
          task: {
            id: 0,
            title: '',
            description: '',
            onProgress: false,
            color: 'gray',
          },
        }),
      setTask: (task: Task) =>
        set({
          task: {
            ...task,
          },
        }),
      setTitle: (title: string) =>
        set((state) => ({
          task: {
            ...state.task,
            title,
          },
        })),
      setDescription: (description: string) =>
        set((state) => ({
          task: {
            ...state.task,
            description,
          },
        })),
      setOnProgress: (onProgress: boolean) =>
        set((state) => ({
          task: {
            ...state.task,
            onProgress,
          },
        })),
      setColor: (color: string) =>
        set((state) => ({
          task: {
            ...state.task,
            color,
          },
        })),
    }),
    {
      name: 'task-storage',
    }
  )
)
