import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import './EventPage.css'
import React, { useEffect, useState } from 'react'
import { INITIAL_EVENTS, createEventId } from './EventList'
import { Container } from '@mui/system'

export default function EventPage() {
  const [weekendsVisible,setWeekendsVisible]=useState()
  const  [currentEvents,setCurrentEvents]=useState([])
  const [eventData,setEventData]=useState()
  const [holidayEvent,setHolidayEvent]=useState()

  useEffect(() => {
  apiPostFunction()
  getApiData()
}, [])

const apiPostFunction=()=>{
  setTimeout(() => {
    const data=currentEvents
    if(data){
      setEventData(data)
    }
  console.log("eventData",eventData)
  }, 1000);
}

const getApiData=()=>{
   const BASE_CALENDAR_URL = "https://www.googleapis.com/calendar/v3/calendars";
  const BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY =
    "holiday@group.v.calendar.google.com"; // Calendar Id. This is public but apparently not documented anywhere officialy.
  const API_KEY = "AIzaSyB6grzevpHe0eFFs8XwktXRU_jzr63_x8A";
  const CALENDAR_REGION = "en.indian"; // This variable refers to region whose holidays do we need to fetch
  const url = `${BASE_CALENDAR_URL}/${CALENDAR_REGION}%23${BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY}/events?key=${API_KEY}`
  const COLORS = [
    '#2196f3',
    '#31dc7f',
    '#2cc0c1', 
    '#dc3131', 
    '#d25ee6', 
    '#dc9931', 
    '#ffeb3b', 
    '#307cbf'
]
  
  fetch(url).then(response => response.json()).then(data => {
  const holidays = data.items;
  const holidayData=holidays?.map((item)=>{
 item?.end?.date
 const random = Math.ceil(Math.random() * 7);
  const dataColor= COLORS[random];
  console.log("dataColor",dataColor)

 const eventColor={"color":dataColor}
 const getDateData={"end":item?.end?.date}
const getDateDAtaDAta={"start":item?.start?.date}
const getHolidayName={"title":item?.summary}
 const mergeObject={...getDateData,...getDateDAtaDAta,...getHolidayName,...eventColor}
 return mergeObject
})
if(holidayData){
  setHolidayEvent(holidayData)
    console.log("holiday",holidays)
    console.log("holidayData",holidayData)
}
  })
}

  const handleDateSelect=(selectInfo)=>{
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
    const liveDate=new Date()
    const eventData=eventInfo?.event?._instance?.range?.end
    const dataAdd=[]
    const dataMerge={"timeText":eventInfo?.timeText}
      // eventInfo?.push()
      // const filterData=dataAdd?.map((item)=>{item})
      console.log("eve",eventInfo)
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }
 const  handleEventClick = (clickInfo) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }
 const handleEvents = (events) => {
   setCurrentEvents(events)
  }
const handleWeekendsToggle = () => {
    setWeekendsVisible({
      weekendsVisible:weekendsVisible
    })
  }
  const renderSidebar=()=> {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2>All Events ({currentEvents.length})</h2>
          <ul>
            {currentEvents.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>
    )
  }
  function renderSidebarEvent(event) {
    
    return (
      <li key={event?.id}>
        <b>{formatDate(event?.start, {year: 'numeric', month: 'short', day: 'numeric'})} :</b>
        <h6>{event?.title}</h6>
        {console.log("event",event)}
      </li>
    )
  }
  
  return (
    <div className='event-page'>
        <Container>
      {renderSidebar()}
      {
        holidayEvent?<FullCalendar
        plugins={[dayGridPlugin,timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        initialView='dayGridMonth'
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={weekendsVisible}
        initialEvents={holidayEvent} // alternatively, use the `events` setting to fetch from a feed
        select={handleDateSelect}
        eventContent={renderEventContent} // custom render function
        eventClick={handleEventClick}
        eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        /* you can update a remote database when these fire:
        eventAdd={function(){}}
        eventChange={function(){}}
        eventRemove={function(){}}
        */
      />:""
      }
        </Container>
    </div>
  )
}