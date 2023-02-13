import axios from 'axios';

import * as type from './actionType';

const getEmployee = (users) => ({
  type: type.EMPLOYEE_GET,
  payload: users,
});

const addEmployee = () => ({
  type: type.EMPLOYEE_ADD,
});

const deleteEmployee = () => ({
  type: type.EMPLOYEE_DELETE,
});

export const getEmployeeApi = () => {
  const url = 'http://localhost:3004/employee';

  return function (dispatch) {
    axios
      .get(url)
      .then((resp) => {
        console.log('resp', resp);
        dispatch(getEmployee(resp.data));
        dispatch(deleteEmployee());
      })
      .catch((error) => console.log('error', error));
  };
};
export const addEmployeeApi = (user, alluser) => {
  const url = 'http://localhost:3004/employee';

  console.log(alluser, 'allllllll');
  console.log(user, 'uuuuuuuuuuuuu');

  return function (dispatch) {
    axios

      .post(url, user)
      .then((resp) => {
        console.log('resp', resp);
        dispatch(addEmployee());
        dispatch(getEmployeeApi());
      })
      .catch((error) => console.log('error', error));
  };
};
export const deleteEmployeeApi = (employeeEditId) => {
  const dataaa = `http://localhost:3004/employee/${employeeEditId}`;
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
