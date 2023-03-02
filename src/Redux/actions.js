import axios from 'axios';

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
  const url="http://127.0.0.1:8000/api/viewemployee";
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
  const url = 'http://127.0.0.1:8000/api/employee';
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
  const dataaa = `http://127.0.0.1:8000/api/deleteemployee/${employeeEditIdData}`;
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
  const url=`http://127.0.0.1:8000/api/updatesaveemployee/${employeeEditIdData}`;
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
  const url = 'http://localhost:3004/addpost';
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
  const url="http://localhost:3004/addpost";
  return function (dispatch){
          axios.get(url)
          .then((resp)=>{
          console.log("resp",resp)
          dispatch(getFiled(resp.data))
      })
      .catch((error)=>console.log("error",error));
  };
}