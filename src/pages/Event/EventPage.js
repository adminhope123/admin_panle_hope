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
import { useDispatch, useSelector } from 'react-redux'
import { deleteEventApi, eventAddApi, eventGetApi } from 'src/Redux/actions'
import LoaderComp from '../loader/LoaderComp'

const TABLE_HEAD = [
  { id: 'start', label: 'Start Event', alignRight: false },
  { id: 'end', label: 'End Event', alignRight: false },
  { id: 'event', label: 'Event', alignRight: false },
];

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

export default function EventPage() {
  const [weekendsVisible, setWeekendsVisible] = useState()
  const [currentEvents, setCurrentEvents] = useState([])
  const [eventData, setEventData] = useState()
  const [holidayEvent, setHolidayEvent] = useState()
  const { events } = useSelector(res => res.data)
  const dispatch = useDispatch()

  const getFunction = () => {
    dispatch(eventGetApi())
    console.log("event",events)
    if(events?.length===0){
      ""
    }else{
      const liveDate = new Date().toLocaleDateString('en-CA')
      const getMonthData = liveDate?.slice(8, 10)
      const dataFilter = events?.filter((item) =>
        item?.start?.slice(5, 7) === getMonthData
      )
      setHolidayEvent(dataFilter)
      console.log("item", dataFilter)
    }
    //     const BASE_CALENDAR_URL = "https://www.googleapis.com/calendar/v3/calendars";
    //     const BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY =
    //       "holiday@group.v.calendar.google.com"; // Calendar Id. This is public but apparently not documented anywhere officialy.
    //     const API_KEY = "AIzaSyBQe3Zh0Z0aNzrzRaH7I6-UUhfy8l8P2nc";
    //     const CALENDAR_REGION = "en.indian";
    //     const url = `${BASE_CALENDAR_URL}/${CALENDAR_REGION}%23${BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY}/events?key=${API_KEY}`


    //     fetch(url).then(response => response.json()).then(data => {
    //       const holidays = data.items;
    //       const holidayData = holidays?.map((item) => {
    //         item?.end?.date
    //         const random = Math.ceil(Math.random() * 7);
    //         const dataColor = colorData[random];
    //         const eventColor = { "color": dataColor }
    //         const getDateData = { "end": item?.end?.date }
    //         const getDateDAtaDAta = { "start": item?.start?.date }
    //         const getHolidayName = { "title": item?.summary }
    //         const mergeObject = { ...getDateData, ...getDateDAtaDAta, ...getHolidayName, ...eventColor }
    //         // dispatch(eventAddApi(mergeObject))
    //         return mergeObject
    //       })
    //       if (holidayData) {
    //         const filterData=holidayData?.splice(0, 20).map(_data => {
    //           return _data;
    // })    

    //   const filterDataData=filterData?.map((item)=>{
    //           //  dispatch(eventAddApi(item))
    //         })
    //         setHolidayEvent(holidayData)

    //       }

    //     })
  }

  useEffect(() => {
    getFunction()
  }, [])

  useEffect(() => {
    apiPostFunction()
  }, [])

  const apiPostFunction = () => {
    setTimeout(() => {
      const data = currentEvents
      if (data) {
        setEventData(data)
      }
    }, 1000);
  }

  const handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      const selectData = calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })

      const titleData = selectData?._def?.title
      const startData = selectData?._instance?.range?.start
      const getStartData = startData?.toLocaleDateString('en-CA')
      const endData = selectData?._instance?.range?.end
      const getEndData = endData?.toLocaleDateString('en-CA')
      const random = Math.ceil(Math.random() * 7);
      const dataColor = colorData[random];
      const dataTitle = { "title": titleData }
      const startDataDAta = { "start": getStartData }
      console.log("startDataDAta",startDataDAta)
      const endDAtaData = { "end": getEndData }
      const colorDAtaData = { "color": dataColor }
      const mergeData = { ...dataTitle, ...startDataDAta, ...endDAtaData, ...colorDAtaData }
      console.log("mergeDAta", mergeData)
      dispatch(eventAddApi(mergeData))
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
      const dataGet = clickInfo?.el?.fcSeg?.eventRange?.range?.start
      const dataGetDAta = dataGet?.toLocaleDateString('en-CA')
      const dataFilterTitle = clickInfo?.event?._def?.title
      const dataFilter = events?.filter((item) => item?.start === dataGetDAta && item?.title === dataFilterTitle)
      const getId = dataFilter?.map((item) => { return item?.id })
      if (getId) {
        const employeeEditIdData = getId
        dispatch(deleteEventApi(employeeEditIdData))
      }
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
      <button onClick={getFunction}>Click</button>
      {
        events.length === 0 ? <LoaderComp /> : <FullCalendar
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
          initialEvents={events}
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
        />
      }
      <div className='demo-app-sidebar-section'>
        <h2>All Events ({holidayEvent?.length})</h2>
        <Table>
          <UserListHead
            headLabel={TABLE_HEAD}
          />
          <TableBody >
              {
                holidayEvent?.map((item) => {
                  return (
            <TableRow >
                      <TableCell align="center">{item?.start}</TableCell>
                      <TableCell align="center">{ item?.end}</TableCell>
                      <TableCell align="center">{ item?.title}</TableCell>
            </TableRow>
                  )
                })
              }
          </TableBody>
        </Table>
      </div>
    </div>
  )
}