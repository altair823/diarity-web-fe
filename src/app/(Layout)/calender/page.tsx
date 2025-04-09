import { CalendarApp } from '@/app/(Layout)/calender/calender'

export default function Calender() {
  return (
    <div className={'w-screen lg:w-full mt-4 bg-gray-200 rounded-2xl'}>
      <div className={'m-4'}>
        <CalendarApp />
      </div>
    </div>
  )
}
