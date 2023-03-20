import { Button, Typography } from '@mui/material'
import { Container, Stack } from '@mui/system'
import React, { useEffect } from 'react'
import RefreshIcon from '@mui/icons-material/Refresh';
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux';
import { attendanceGetApi } from 'src/Redux/actions';

const TABLE_HEAD = [
  { id: "date", label: "Date", alignRight: false },
  { id: "day", label: "Day", alignRight: false },
  { id: "totalWork", label: "Total Work", alignRight: false },
  { id: "present", label: "Present", alignRight: false },
  { id: "absent", label: "Absent", alignRight: false },
];


export default function EmployeeAttendance() {
  const dispatch=useDispatch()
  const {users}=useSelector(res=>res.data)
  
  const attendanceData=()=>{
        dispatch(attendanceGetApi())
        console.log("users",users)
  }

  useEffect(() => {
    attendanceData()
  }, [])
  
  return (
    <div>
      <Helmet>
          <title> User |  Hope Admin Panle </title>
        </Helmet>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Employee Attendance
            </Typography>
          </Stack>
          <Button  variant="contained" onClick={() => attendanceData()} sx={{marginBottom:"30px"}}>
           <span> Data Refresh</span>
          <RefreshIcon sx={{marginLeft:"10px"}}/>
          </Button>
</Container>
    </div>
  )
}
