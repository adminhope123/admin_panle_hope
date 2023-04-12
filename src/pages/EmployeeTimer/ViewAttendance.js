import { Avatar, Box, Stack, Table, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './ViewAttendance.css'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { attendanceGetApi } from 'src/Redux/actions'
import MonthYearPicker from "react-month-year-picker";
import { UserListHead } from 'src/sections/@dashboard/user'

const TABLE_HEAD = [
  { id: "date", label: "Date", alignRight: false },
  { id: "day", label: "Day", alignRight: false },
  { id: "totalWork", label: "Total Work", alignRight: false },
  { id: "workingRange", label: "Working Range", alignRight: false },
  { id: "present", label: "Present", alignRight: false },
  { id: "absent", label: "Absent", alignRight: false },
];


export default function ViewAttendance() {
  const {E_Id}=useParams()
  const [dataUser,setDataUser]=useState()
  const dispatch=useDispatch()
  const {attendances}=useSelector(res=>res.data)
  const monthdata = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const d = new Date();
  let name = monthdata[d.getMonth()];
  let year = d.getFullYear();
  const [smonth, setMonth] = useState(name);
  const [syear, setYear] = useState(year);


  const handleChangeMonth = (month) => {
    setMonth(month);
    console.log(month);
    const dataSelectMonth=smonth+":"+syear
    console.log("data",dataSelectMonth)
  };

  const getUserDataFunction=()=>{
    const userData=JSON.parse(sessionStorage.getItem("viewEmployee"))
    const filterData=userData?.filter((item)=>item?.E_Id===E_Id)
    setDataUser(filterData)
  }
  const getAttendanceData=()=>{
   dispatch(attendanceGetApi())
   console.log("attendances",attendances)
   const dataFilter=attendances?.filter((item)=>item?.employeeId===E_Id)
   console.log("dataFilter",dataFilter)
  }

  useEffect(() => {
    getUserDataFunction()
    getAttendanceData()
  }, [])
  
  return (
    <div className='view-attendance-page'>
      <button onClick={getAttendanceData}>Click</button>
      <Box sx={{display:"flex",justifyContent:"space-between"}}>
      <Box>
        {
          dataUser?.map((item)=>{
            return(
             <div>
                <Stack direction="row" alignItems="center" spacing={2} sx={{justifyContent:"start"}}>
              <Avatar alt={item?.userName} src={`https://hopebackend.hopeinfosys.com/${item?.image}`}/>
            </Stack>
            <Box>
            <Typography sx={{marginTop:"8px",marginLeft:"6px"}}>{item?.E_Id}</Typography>
              <Typography sx={{marginTop:"8px",marginLeft:"6px"}}>{item?.userName}</Typography>
            </Box>
             </div>
            )
          })
        }
      </Box>
      <Box>
      <MonthYearPicker
        selectedMonth={smonth}
        selectedYear={syear}
        minYear={2000}
        maxYear={2030}
        onChangeYear={(year) => setYear(year)}
        onChangeMonth={handleChangeMonth}
      />
      </Box>
      </Box>
      <Box sx={{marginTop:"20px"}}>
      <Table>
                    <UserListHead
                      headLabel={TABLE_HEAD}
                    />
                 
                    </Table>
      </Box>
    </div>
  )
}
