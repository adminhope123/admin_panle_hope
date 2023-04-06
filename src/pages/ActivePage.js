import { faker } from '@faker-js/faker'
import { Button, Typography } from '@mui/material'
import { Container, Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import RefreshIcon from '@mui/icons-material/Refresh';
import { AppNewsUpdate } from 'src/sections/@dashboard/app'
import { getTimeDataApi } from 'src/Redux/actions'

export default function ActivePage() {
    const [employeeStatusData,setEmployeeStatusData]=useState()
    const [viewAllDataShow,setViewAllDataShow]=useState(false)
    const dispatch=useDispatch()
    const {users}=useSelector(res=>res.data)
    
const dataGetGet=async()=>{
    await   dispatch(getTimeDataApi())
}
    const getUserData=async()=>{
   
        await   dispatch(getTimeDataApi())
      if(users){
        const dataFilter=users?.filter(ele=>{return ele.state==="running"})
        const dataGet=JSON.parse(sessionStorage.getItem("viewEmployee"))
        const getUserDataData=dataGet?.filter((item)=>dataFilter?.find((ele)=>ele.employeeId===item.E_Id))
        const addValue=getUserDataData?.map((item)=>{
      const {state,start}=dataFilter?.find((ele)=>ele.employeeId===item.E_Id)
      return{...item,state,start}
      
    })
    const filterData=dataGet?.filter(function(cv){
     return !addValue.find(function(e){
         return e.E_Id == cv.E_Id;
     });
 });
 const mergeDatadata=[...addValue,...filterData]
 const mergeDatadataAdd=mergeDatadata?.map((item)=>item)
 setEmployeeStatusData(mergeDatadataAdd)
      }
    }

    useEffect(() => {
      dataGetGet()
      getUserData()
    }, [])
    
  return (
    <div>
        <Helmet>
        <title> Dashboard: Employee Status |  User Web </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Employee Status
          </Typography>
        </Stack>
        <Button  variant="contained" onClick={() => getUserData()} sx={{marginBottom:"30px"}}>
           <span> Data Refresh</span>
          <RefreshIcon sx={{marginLeft:"10px"}}/>
          </Button>
        <AppNewsUpdate
          title="Employee Status"
          viewDataShow={viewAllDataShow}
          list={employeeStatusData&&employeeStatusData?.map((item, index) => ({
            id:item?.E_Id,
            title: item?.userName,
            description: item?.role,
            image: `https://hopebackend.hopeinfosys.com/${item&&item?.image}`,
            online:item?.state,
            start:item?.start,
            postedAt: faker.date.recent(),
          }))}
        />
        </Container>
    </div>
  )
}
