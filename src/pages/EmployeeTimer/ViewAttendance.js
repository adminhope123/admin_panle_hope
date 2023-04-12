import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function ViewAttendance() {
  const {E_Id}=useParams()

  const getUserDataFunction=()=>{
    console.log("getId",E_Id)
    const userData=JSON.parse(sessionStorage.getItem("viewEmployee"))
    const filterData=
    console.log("userData",userData)
  }
  
  useEffect(() => {
    getUserDataFunction()
  }, [])
  
  return (
    <div>ViewAttendance</div>
  )
}
