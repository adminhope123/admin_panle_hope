// import FullCalendar, { formatDate } from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import timeGridPlugin from '@fullcalendar/timegrid'
// import interactionPlugin from '@fullcalendar/interaction'
// import './EventPage.css'
// import React, { useEffect, useState } from 'react'
// import { INITIAL_EVENTS, createEventId } from './EventList'
// import { Container } from '@mui/system'

// export default function EventPage() {
//   const [weekendsVisible,setWeekendsVisible]=useState()
//   const  [currentEvents,setCurrentEvents]=useState([])
// const [eventData,setEventData]=useState()
// useEffect(() => {
//   apiPostFunction()

// }, [])

// const apiPostFunction=()=>{
//   setTimeout(() => {
//     const data=currentEvents
//     if(data){
//       setEventData(data)
//     }
//   console.log("eventData",eventData)
//   }, 1000);
// }

//   const handleDateSelect=(selectInfo)=>{
//     let title = prompt('Please enter a new title for your event')
//     let calendarApi = selectInfo.view.calendar

//     calendarApi.unselect() // clear date selection

//     if (title) {
//       calendarApi.addEvent({
//         id: createEventId(),
//         title,
//         start: selectInfo.startStr,
//         end: selectInfo.endStr,
//         allDay: selectInfo.allDay
//       })
//     }
//   }
//   function renderEventContent(eventInfo) {
//     return (
//       <>
//         <b>{eventInfo.timeText}</b>
//         <i>{eventInfo.event.title}</i>
//       </>
//     )
//   }
//  const  handleEventClick = (clickInfo) => {
//     if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
//       clickInfo.event.remove()
//     }
//   }
//  const handleEvents = (events) => {
//    setCurrentEvents(events)
//   }
// const handleWeekendsToggle = () => {
//     setWeekendsVisible({
//       weekendsVisible:weekendsVisible
//     })
//   }
//   const renderSidebar=()=> {
//     return (
//       <div className='demo-app-sidebar'>
//         <div className='demo-app-sidebar-section'>
//           <h2>All Events ({currentEvents.length})</h2>
//           <ul>
//             {currentEvents.map(renderSidebarEvent)}
//           </ul>
//         </div>
//       </div>
//     )
//   }
//   function renderSidebarEvent(event) {
    
//     return (
//       <li key={event?.id}>
//         <b>{formatDate(event?.start, {year: 'numeric', month: 'short', day: 'numeric'})} :</b>
//         <h6>{event?.title}</h6>
//         {console.log("event",event)}
//       </li>
//     )
//   }
  
//   return (
//     <div className='event-page'>
//         <Container>
//       {renderSidebar()}
//         <FullCalendar
//             plugins={[dayGridPlugin,timeGridPlugin, interactionPlugin]}
//             headerToolbar={{
//               left: 'prev,next today',
//               center: 'title',
//               right: 'dayGridMonth,timeGridWeek,timeGridDay'
//             }}
//             initialView='dayGridMonth'
//             editable={true}
//             selectable={true}
//             selectMirror={true}
//             dayMaxEvents={true}
//             weekends={weekendsVisible}
//             initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
//             select={handleDateSelect}
//             eventContent={renderEventContent} // custom render function
//             eventClick={handleEventClick}
//             eventsSet={handleEvents} // called after events are initialized/added/changed/removed
//             /* you can update a remote database when these fire:
//             eventAdd={function(){}}
//             eventChange={function(){}}
//             eventRemove={function(){}}
//             */
//           />
//         </Container>
//     </div>
//   )
// }
import React from 'react'
import GoogleLogin from 'react-google-login'

export default function EventPage() {
  const BASE_CALENDAR_URL = "https://www.googleapis.com/calendar/v3/calendars";
  const BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY =
    "holiday@group.v.calendar.google.com"; // Calendar Id. This is public but apparently not documented anywhere officialy.
  const API_KEY = "AIzaSyAFBIgwTRTbGuzkNSqx-HIIAn0sGmq_tkU";
  const CALENDAR_REGION = "en.indian";
  const url = `${BASE_CALENDAR_URL}/${CALENDAR_REGION}%23${BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY}/events?key=${API_KEY}`

  fetch(url).then(response => response.json()).then(data => {
  const holidays = data.items;
  console.log("holiday",holidays)
  })
  

  const responseGoogle=response=>{
    console.log("Response",response)
  }

  const responseError=error=>{
    console.log(error)
  }
  return (
    <div>
      <GoogleLogin 
      clientId='907798487065-cvtv582dud6snimgi6sbsifpfr681s0k.apps.googleusercontent.com' 
      onSuccess={responseGoogle} 
      onFailure={responseError} 
      cookiePolicy={'single_host_origin'}
       responseType='code'
       accessType='offline'
       scope='openid email profile https://www.googleapis.com/calendat'
      />
<iframe src="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Example+Google+Calendar+Event&details=More+help+see:+https://support.google.com/calendar/thread/81344786&dates=20201231T160000/20201231T170000&recur=RRULE:FREQ%3DWEEKLY "  width="800" height="600" frameborder="0" scrolling="no"></iframe>
    </div>
  )
}
