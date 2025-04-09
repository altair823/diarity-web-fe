import add_task from '/public/icons/add_task_icon.svg'
import Image from 'next/image'

export function TaskNewButton() {
  return (
    <div className='mr-4 ml-4 lg:mr-0 lg:ml-0'>
      <button
        className='w-full bg-gray-100 px-4 py-2 rounded-xl grid place-items-center border-4 border-gray-300 border-dotted'
        onClick={() => {
          console.log('New Task button clicked')
        }}
      >
        <Image src={add_task} alt={'add task'} className={''} />새 작업 추가
      </button>
    </div>
  )
}
