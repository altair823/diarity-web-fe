'use client'

import { useNextCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'

import '@schedule-x/theme-default/dist/index.css'
import { useState } from 'react'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createResizePlugin } from '@schedule-x/resize'
import { createEventModalPlugin } from '@schedule-x/event-modal'

export function CalendarApp() {
  const eventsService = useState(() => createEventsServicePlugin())[0]

  const eventModal = createEventModalPlugin()
  const calendar = useNextCalendarApp({
    views: [
      // createViewDay(),
      createViewWeek(),
      // createViewMonthGrid(),
      // createViewMonthAgenda(),,
    ],
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: '2025-04-06 10:00',
        end: '2025-04-06 12:00',
        description: 'Event 1 description',
        _options: {
          disableDND: false,
          disableResize: true,
        },
      },
    ],
    plugins: [
      eventsService,
      createDragAndDropPlugin(),
      createResizePlugin(),
      eventModal,
    ],
    callbacks: {
      onRender: () => {
        // get all events
        eventsService.getAll()
      },
    },
  })
  eventModal.close() // close the modal

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}
