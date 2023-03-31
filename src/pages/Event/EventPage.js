import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import './EventPage.css'
import React, { useEffect, useState } from 'react'
import { INITIAL_EVENTS, createEventId } from './EventList'
import { Container } from '@mui/system'
import { Box, Table, TableBody, TableCell, TableRow } from '@mui/material'
import { UserListHead } from 'src/sections/@dashboard/user'
import { useDispatch } from 'react-redux'
import { eventAddApi } from 'src/Redux/actions'

const TABLE_HEAD = [
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'event', label: 'Event', alignRight: false },
];

export default function EventPage() {
  const [weekendsVisible, setWeekendsVisible] = useState()
  const [currentEvents, setCurrentEvents] = useState([])
  const [eventData, setEventData] = useState()
  const [holidayEvent, setHolidayEvent] = useState()
  const dispatch=useDispatch()

  const getFunction = () => {
    const colorData = [
      '#2196f3',
      '#31dc7f',
      '#2cc0c1',
      '#dc3131',
      '#d25ee6',
      '#dc9931',
      '#ffeb3b',
      '#307cbf'
    ]

    const BASE_CALENDAR_URL = "https://www.googleapis.com/calendar/v3/calendars";
    const BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY =
      "holiday@group.v.calendar.google.com"; // Calendar Id. This is public but apparently not documented anywhere officialy.
    const API_KEY = "AIzaSyBQe3Zh0Z0aNzrzRaH7I6-UUhfy8l8P2nc";
    const CALENDAR_REGION = "en.indian";
    const url = `${BASE_CALENDAR_URL}/${CALENDAR_REGION}%23${BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY}/events?key=${API_KEY}`


    fetch(url).then(response => response.json()).then(data => {
      const holidays = data.items;
      const holidayData = holidays?.map((item) => {
        item?.end?.date
        const random = Math.ceil(Math.random() * 7);
        const dataColor = colorData[random];
        console.log("dataColor", dataColor)

        const eventColor = { "color": dataColor }
        const getDateData = { "end": item?.end?.date }
        const getDateDAtaDAta = { "start": item?.start?.date }
        const getHolidayName = { "title": item?.summary }
        const mergeObject = { ...getDateData, ...getDateDAtaDAta, ...getHolidayName, ...eventColor }
        console.log("mergeObject",mergeObject)
        // dispatch(eventAddApi(mergeObject))
        return mergeObject
      })
      if (holidayData) {
        const filterData=holidayData?.splice(0, 20).map(_data => {
          return _data;
})

        const filterDataData=filterData?.map((item)=>{
          if(item){
            dispatch(eventAddApi(item))
          }
        })
        console.log("filterData",filterDataData)
        setHolidayEvent(holidayData)
        console.log("holiday", holidays)
        console.log("holiday", holidayData)

      }

    })
  }

  useEffect(() => {
    apiPostFunction()
    getFunction()
  }, [])

  const apiPostFunction = () => {
    setTimeout(() => {
      const data = currentEvents
      if (data) {
        setEventData(data)
      }
      console.log("eventData", eventData)
    }, 1000);
  }

  const handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }
  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }
  const handleEventClick = (clickInfo) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }
  const handleEvents = (events) => {
    setCurrentEvents(events)

  }
  const handleWeekendsToggle = () => {
    setWeekendsVisible({
      weekendsVisible: weekendsVisible
    })
  }
  const renderSidebar = () => {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2>All Events ({currentEvents.length})</h2>
          <Table>
          <UserListHead
            headLabel={TABLE_HEAD}
          />
            <TableBody >
            {currentEvents.map(renderSidebarEvent)}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }
  function renderSidebarEvent(event) {

    return (
      <>
      <TableRow style={{}}>
            <TableCell align="center">{formatDate(event?.start, { year: 'numeric', month: 'short', day: 'numeric' })}</TableCell>
            <TableCell align="center">{event?.title}</TableCell>
            </TableRow>
      </>
    )
  }

  return (
    <div className='event-page'>
      {
        holidayEvent ? <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          initialEvents={holidayEvent}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        /* you can update a remote database when these fire:
        eventAdd={function(){}}
        eventChange={function(){}}
        eventRemove={function(){}}
        */
        /> : ""
      }
      {renderSidebar()}
    </div>
  )
}