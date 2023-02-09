import axios from 'axios'
import * as type from './actionType'

const getUSers=(users)=>({
    type:type.EMPLOYEE_ADD,
    payload:users
})

export const loadUsers=()=>{
    return function (dispatch){
            axios.get(`${process.env.EMPLOYEE_NEW_ADD}`)
            .then((resp)=>{
            console.log("resp",resp)
            dispatch(getUSers(resp.data))
        })
        .catch((error)=>console.log("error",error))
    }
}