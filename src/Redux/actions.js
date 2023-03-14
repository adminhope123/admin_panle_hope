import axios from 'axios';
import { get } from 'lodash';

import * as type from './actionType';

const getEmployee = (users) => ({
  type: type.EMPLOYEE_GET,
  payload: users,
});

const getAddminPanle = (users) => ({
    type: type.ADMIN_PANLE_DATA,
    payload: users,
  });
  

const addEmployee = () => ({
  type: type.EMPLOYEE_ADD,
});
const deleteEmployee = () => ({
  type: type.EMPLOYEE_DELETE,
});
const deletePostData = () => ({
  type: type.DELETE_POST_API,
});
const addFiledPost = () => ({
  type: type.ADD_POST_FIELD,
});
const getFiled = (users) => ({
  type: type.GET_POST_FIELD,
  payload: users,
});



const updateEmployee = () => ({
  type: type.EMPLOYEE_UPDATE,
});

export const getEmployeeApi=()=>{
  const url="https://admin.hopeinfosys.com/api/viewemployee";
  return function (dispatch){
          axios.get(url)
          .then((resp)=>{
          console.log("resp",resp)
          dispatch(getEmployee(resp.data))
      })
      .catch((error)=>console.log("error",error));
  };
}
export const addEmployeeApi = (users) => {
  const url = 'https://admin.hopeinfosys.com/api/employee';
  return function (dispatch) {
    axios
      .post(url, users)
      .then((resp) => {
        console.log('resp', resp.data);
        dispatch(addEmployee());
        dispatch(getEmployeeApi());
      })
      .catch((error) => console.log('error', error));
  };
};
export const deleteEmployeeApi = (employeeEditIdData) => {
  const dataaa = `https://admin.hopeinfosys.com/api/deleteemployee/${employeeEditIdData}`;
  return function (dispatch) {
    axios
      .delete(dataaa)
      .then((resp) => {
        console.log('resp', resp);
        dispatch(deleteEmployee());
        dispatch(getEmployeeApi());
      })
      .catch((error) => console.log('error', error));
  };
};
export const updateEmployeeApi=(user,employeeEditIdData)=>{
  const url=`https://admin.hopeinfosys.com/api/updatesaveemployee/${employeeEditIdData}`;
  return function (dispatch){
          axios.put(url,user)
          .then((resp)=>{
          console.log("resp",resp)
          dispatch(updateEmployee(resp.data))
          dispatch(getEmployeeApi())
      })
      .catch((error)=>console.log("error",error))
  }
}
export const addFiledPostApi = (users) => {
  const url = 'https://admin.hopeinfosys.com/api/Uaddpost';
  return function (dispatch) {
    axios
      .post(url, users)
      .then((resp) => {
        console.log('resp', resp.data);
        dispatch(addFiledPost());
        dispatch(getEmployeeApi());
      })
      .catch((error) => console.log('error', error));
  };
};
export const getFiledPostApi=()=>{
  const url="https://admin.hopeinfosys.com/api/viewUaddpost";
  return function (dispatch){
          axios.get(url)
          .then((resp)=>{
          console.log("resp",resp)
          dispatch(getFiled(resp.data))
      })
      .catch((error)=>console.log("error",error));
  };
}
export const deletePostApi = (employeeEditIdData) => {
  const dataaa = `https://admin.hopeinfosys.com/api/Uaddpostdelete/${employeeEditIdData}`;
  return function (dispatch) {
    axios
      .delete(dataaa)
      .then((resp) => {
        console.log('resp', resp);
        dispatch(deletePostData());
        dispatch(getFiledPostApi());
      })
      .catch((error) => console.log('error', error));
  };
};