import { Avatar, Button, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import { Container, Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import RefreshIcon from '@mui/icons-material/Refresh';
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux';
import { attendanceGetApi } from 'src/Redux/actions';
import { UserListHead } from 'src/sections/@dashboard/user';
import { NavLink, useNavigate } from 'react-router-dom';

const TABLE_HEAD = [
  { id: "employeeId", label: "Employee Id", alignRight: false },
  { id: "employee", label: "Employee", alignRight: false },
  { id: "empoyeeName", label: "Empoyee Name", alignRight: false },
  { id: "post", label: "Post", alignRight: false },
  { id: "viewAttendance", label: "View Attendance", alignRight: false },
];


export default function EmployeeAttendance() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [viewEmployeeData,setViewEmployeeData]=useState()
  const {attendances}=useSelector(res=>res.data)
  
  const attendanceData=()=>{
        dispatch(attendanceGetApi())
        console.log("users",attendances)
  }

  useEffect(() => {
    attendanceData()
    getDataApi()
  }, [])
  
  const getDataApi=()=>{
    const getData=JSON.parse(sessionStorage.getItem("viewEmployee"))
    setViewEmployeeData(getData)
    console.log("viewWEmpoyee",viewEmployeeData)

  }

  const viewAttendancePage=(item)=>{
        navigate(`/dashboard/viewAttendance/${item?.E_Id}`)
  }
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
          <Table>
                    <UserListHead
                      headLabel={TABLE_HEAD}
                    />
                        {
                          viewEmployeeData&&viewEmployeeData?.map((item,index)=>{
                            return(
                              <TableBody key={item?.id}>
                                <TableRow  hover key={item?.id}>
                                  <TableCell align="center" >{item?.E_Id}</TableCell>
                              <TableCell component="th" scope="row" >
                              <Stack direction="row" alignItems="center" spacing={2} sx={{justifyContent:"center"}}>
                                <Avatar alt={item?.userName} src={`https://hopebackend.hopeinfosys.com/${item?.image}`}/>
                              </Stack>
                            </TableCell>
                            <TableCell align="center" >{item?.userName}</TableCell>
                            <TableCell align="center" >{item?.role}</TableCell>
                            <TableCell align="center" >
                              <Button variant="outlined" color="error" onClick={()=>{viewAttendancePage(item)}}>View Attendance</Button>
                              </TableCell>
                              
                      </TableRow>
                    </TableBody>
                            )
                          })
                        }
                        
                    </Table>
</Container>
    </div>
  )
}
