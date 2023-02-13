import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Modal,
  Box,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Snackbar,
  StackProps,
  MuiAlert,
  Alert
} from '@mui/material';
// components
import Visibility from '@mui/icons-material/Visibility';
import { useParams } from 'react-router-dom';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch ,useSelector } from 'react-redux';
import { addEmployeeApi, deleteEmployeeApi, getEmployeeApi, selectSingleEmployeeApi, updateEmployeeApi } from '../Redux/actions';
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import './style.css';
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '13px',
  p: 4,
};
const TABLE_HEAD = [
  { id: 'img', label: 'Img', alignRight: false },
  { id: 'userName', label: 'User Name', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'mobileNumber', label: 'Mobile Number', alignRight: false },
  { id: 'password', label: 'Password', alignRight: false },
  { id: '', label: '', alignRight: false },
  { id: '', label: '', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const dispatch=useDispatch( )
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [newUserModel, setNewUserModel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [addEmployeeAlert,setAddEmployeeAlert]=useState(false)
  const [allReadyDataAlert,setAllReadyDataAlert]=useState(false)
  const [employeeEditAlert,setEmployeeEditAlert]=useState(false)
  const [employeeDeleteAlert,setEmployeeDeleteAlert]=useState(false)
  const [errorForm, setErrorForm] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [employeeGetData, setGetEmployeeData] = useState();
  const [employeeEditModel, setEmployeeEditModel] = useState();
  const [employeeEditId, setEmployeeEditId] = useState();
  const [employeeDataForm, setEmployeeForm] = useState({
    userName: '',
    email: '',
    mobileNumber: '',
    role: '',
    password: '',
    address:'',
    salary:''
  });
  const [employeeEditForm, setEmployeeEditForm] = useState({
    userName: '',
    email: '',
    mobileNumber: '',
    role: '',
    password: '',
    address:'',
    salary:''
  });
  const {userName,email,mobileNumber,role,password,address,salary}=employeeDataForm;
   const {users}=useSelector(state=>state?.data)
  const hadnleEmployeeOnchange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEmployeeForm({ ...employeeDataForm, [name]: value });
  };
  const hadnleEmployeeSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setErrorForm(validate(employeeDataForm));
    
    console.log('isSubmit', isSubmit);
    console.log('employeeDataForm', employeeDataForm);
    dispatch(addEmployeeApi(employeeDataForm))
    if (Object.keys(errorForm).length === 0 && isSubmit) {
      const filterData=employeeGetData?.filter((item)=>item.email===employeeDataForm.email && item?.username===employeeDataForm?.username)
      console.log("filterData",filterData)
      if(filterData.length===0){
        // employeeDataApi();
      }
      else{
        setAllReadyDataAlert(true)
      }
    }
  };
  const allReadyDataAlertFunctionClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAllReadyDataAlert(false);
  };
  const allAddEmployeeAlertFunctionClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAllReadyDataAlert(false);
  }

  const editAlertFunctionClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setEmployeeEditAlert(false);
  }
    const deleteEmployeeAlertFunctionClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setEmployeeDeleteAlert(false);
};
  const validate = (values) => {
    const error = {};
    const emailRegex = '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$';
    if (!values.userName) {
      error.userName = 'user Name is required';
    } else if (values.userName.length < 3) {
      error.userName = 'user Name  more than 3 characters';
    } else if (values.userName.length > 8) {
      error.userName = 'user Name cannot exceed more than 5 characters';
    }
    if (!values.password) {
      error.password = 'password is required';
    } else if (values.password.length < 3) {
      error.password = 'password  more than 3 characters';
    }if (values.userName?.length > 8) {
      error.userName = 'user Name cannot exceed more than 5 characters';
    }
    if (!values.role) {
      error.role = 'role is required';
    } else if (values.role.length < 3) {
      error.role = 'role  more than 3 characters';
    } else if (values.role.length > 8) {
      error.role = 'role cannot exceed more than 5 characters';
    }
    if (!values.email) {
      error.email = 'Enter Email';
    } else if (!emailRegex && emailRegex?.test(values.email)) {
      error.email = 'This is not a valid email format!';
    }
    if (!values.mobileNumber) {
      error.mobileNumber = 'phoneNumber is required';
    } else if (values.mobileNumber.length < 10) {
      error.mobileNumber = 'phoneNumber  more than 10 characters';
    } else if (values.mobileNumber.length > 10) {
      error.mobileNumber = 'phoneNumber cannot exceed more than 10 characters';
    }
    return error;
  };

  const employeeGetApiFuction = () => {
    fetch('http://localhost:3004/employee')
    .then((res) => res.json())
    .then((response) => setGetEmployeeData(response));
  };

  const employeeDeleteApiFunction = (id) => {
    console.log("id",id)
    if(employeeEditId){
      if(id){
      dispatch(deleteEmployeeApi(employeeEditId?.id))
    }
    }
  };

  const hadnleEditEmployeeOnchange = (e) => {
    if (e) {
      const name = e?.target.name;
      const value = e?.target.value;
      setEmployeeEditForm({ ...employeeEditId, [name]: value });
    }
  };
useEffect(() => {

}, [users])

  const hadnleEditEmployeeSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    // setErrorForm(validate(employeeEditForm));
    console.log('employeeEditForm', employeeEditForm);
    editEmployeeData();
    if(users){
      setEmployeeEditForm({...users})
    }
    dispatch(updateEmployeeApi(employeeEditForm,employeeEditId?.id))
  
  };

useEffect(() => {
  dispatch(getEmployeeApi())
  employeeGetApiFuction();
}, [])

  const editEmployeeData = () => {
    console.log("employeeEditForm",employeeEditForm)
 
    
  };
  const handleNewUserModelClose = () => {
    setNewUserModel(false);
    setAllReadyDataAlert(false)
  };

  const handleNewUserModelOpen = () => {
    setNewUserModel(true);
  };
  const handleEditModelClose = () => {
    setEmployeeEditModel(false);
  };

  const handleEditModelOpen = (id) => {
    setEmployeeEditModel(true);
    console.log(id)
      if(employeeEditId){
      dispatch(selectSingleEmployeeApi(employeeEditId?.id))
    }
  };
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };
  
  const handleEmployeeClickId=(item)=>{
    if(item){
      setEmployeeEditId(item);
      console.log("item",item)
    }
  }

  
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);
  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <div className="employee-page">
        <Helmet>
          <title> User | Minimal UI </title>
        </Helmet>

        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Employee
            </Typography>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleNewUserModelOpen}>
              New Employee
            </Button>
          </Stack>

          <Card>
            <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <div className="employee-table">
                  <Table>
                     <UserListHead
                     order={order}
                     orderBy={orderBy}
                     headLabel={TABLE_HEAD}
                     rowCount={USERLIST?.length}
                     numSelected={selected?.length}
                     onRequestSort={handleRequestSort}
                     onSelectAllClick={handleSelectAllClick}
                   />
                    {users === undefined
                      ? ''
                      : users&&users?.map((item, index) => {
                          return (
                            <TableBody>
                              <TableRow hover key={item?.id} role="checkbox">
                                <TableCell padding="checkbox">
                                  <Checkbox />
                                </TableCell>

                                <TableCell component="th" scope="row" padding="none">
                                  <Stack direction="row" alignItems="center" spacing={2}>
                                    <Avatar alt={item?.userName} />
                                  </Stack>
                                </TableCell>
                                <TableCell align="center">{item?.userName}</TableCell>
                                <TableCell align="center">{item?.role}</TableCell>
                                <TableCell align="center">{item?.email}</TableCell>
                                <TableCell align="center">{item?.mobileNumber}</TableCell>
                                <TableCell align="center">{item?.password}</TableCell>
                                <TableCell align="right">
                                  <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                                    <Iconify icon={'eva:more-vertical-fill'} onClick={()=>handleEmployeeClickId(item)}/>
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                           
                              <Popover
                                open={Boolean(open)}
                                anchorEl={open}
                                onClose={handleCloseMenu}
                                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                PaperProps={{
                                  sx: {
                                    p: 1,
                                    width: 140,
                                    '& .MuiMenuItem-root': {
                                      px: 1,
                                      typography: 'body2',
                                      borderRadius: 0.75,
                                    },
                                  },
                                }}
                              >
                                <MenuItem onClick={() => handleEditModelOpen(item?.id)}>
                                  <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                                  Edit
                                </MenuItem>

                                <MenuItem sx={{ color: 'error.main' }} onClick={()=>employeeDeleteApiFunction(item?.id)}>
                                  <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                                  Delete
                                </MenuItem>
                              </Popover>
                            </TableBody>
                          );
                        })}

                    {/* {employeeGetData?.length===0 && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            <Paper
                              sx={{
                                textAlign: 'center',
                                marginLeft:"33%"
                              }}
                            >
                              <Typography variant="h6" paragraph>
                                Not found
                              </Typography>

                              <Typography variant="body2">
                                No results found   &nbsp;
                                <br />Please  Add Employee
                              </Typography>
                            </Paper>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )} */}
                  </Table>
                </div>
              </TableContainer>
            </Scrollbar>

            {/* <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={USERLIST.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
          </Card>
        </Container>

        <div className="new-user-form">
          <Modal
            open={newUserModel}
            onClose={handleNewUserModelClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="employee-new-user">
                <form onSubmit={hadnleEmployeeSubmit}>
                  <FormControl>
                    <TextField
                      label="User Name"
                      type="text"
                      name="userName"
                      error={errorForm?.userName}
                      value={userName}
                      onChange={hadnleEmployeeOnchange}
                    />
                    <p className="employee-error-text">{errorForm.userName}</p>
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="Role"
                      name="role"
                      type="text"
                      error={errorForm?.role}
                      value={role}
                      onChange={hadnleEmployeeOnchange}
                    />
                    <p className="employee-error-text">{errorForm.role}</p>
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="Mobile Number"
                      type="number"
                      name="mobileNumber"
                      error={errorForm?.mobileNumber}
                      value={mobileNumber}
                      onChange={hadnleEmployeeOnchange}
                    />
                    <p className="employee-error-text">{errorForm.mobileNumber}</p>
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="Email address"
                      name="email"
                      type="text"
                      error={errorForm?.email}
                      value={email}
                      onChange={hadnleEmployeeOnchange}
                    />
                    <p className="employee-error-text">{errorForm.email}</p>
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="Address"
                      name="text"
                      type="text"
                      error={errorForm?.address}
                      defaultValue={employeeEditId?.address}
                      onChange={hadnleEditEmployeeOnchange}
                    />
                    <p className="employee-error-text">{errorForm.address}</p>
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="Salary"
                      name="salary"
                      type="number"
                      error={errorForm?.salary}
                      defaultValue={salary}
                      onChange={hadnleEditEmployeeOnchange}
                    />
                    <p className="employee-error-text">{errorForm.salary}</p>
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="Password"
                      error={errorForm?.password}
                      name="password"
                      type="text"
                      value={password}
                      onChange={hadnleEmployeeOnchange}
                    />
                    <p className="employee-error-text">{errorForm.password}</p>
                  </FormControl>
                  <Button
                    variant="contained"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    type="submit"
                    className="add-employee"
                  >
                    Add Employee
                  </Button>
                </form>
              </div>
            </Box>
          </Modal>
          <Modal
            open={employeeEditModel}
            onClose={handleEditModelClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="employee-new-user">
                <form onSubmit={hadnleEditEmployeeSubmit}>
                  <FormControl>
                    <TextField
                      label="User Name"
                      type="text"
                      name="userName"
                      error={errorForm?.userName}
                      defaultValue={employeeEditId?.userName ||""}
                      onChange={hadnleEditEmployeeOnchange}
                    />
                    <p className="employee-error-text">{errorForm.userName}</p>
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="Role"
                      name="role"
                      type="text"
                      error={errorForm?.role}
                      defaultValue={employeeEditId?.role ||""}
                      onChange={hadnleEditEmployeeOnchange}
                    />
                    <p className="employee-error-text">{errorForm.role}</p>
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="Mobile Number"
                      type="number"
                      name="mobileNumber"
                      error={errorForm?.mobileNumber}
                      defaultValue={employeeEditId?.mobileNumber ||""}
                      onChange={hadnleEditEmployeeOnchange}
                    />
                    <p className="employee-error-text">{errorForm.mobileNumber}</p>
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="Email address"
                      name="email"
                      type="text"
                      error={errorForm?.email}
                      defaultValue={employeeEditId?.email ||""}
                      onChange={hadnleEditEmployeeOnchange}
                    />
                    <p className="employee-error-text">{errorForm.email}</p>
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="Address"
                      name="text"
                      type="text"
                      error={errorForm?.address}
                      defaultValue={employeeEditId?.address ||""}
                      onChange={hadnleEditEmployeeOnchange}
                    />
                    <p className="employee-error-text">{errorForm.address}</p>
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="Salary"
                      name="salary"
                      type="number"
                      error={errorForm?.salary}
                      defaultValue={employeeEditId?.salary ||""}
                      onChange={hadnleEditEmployeeOnchange}
                    />
                    <p className="employee-error-text">{errorForm.salary}</p>
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="Password"
                      error={errorForm?.password}
                      name="password"
                      type="text"
                      defaultValue={employeeEditId?.password ||""}
                      onChange={hadnleEditEmployeeOnchange}
                    />
                    <p className="employee-error-text">{errorForm.password}</p>
                  </FormControl>
                  <Button
                    variant="contained"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    type="submit"
                    className="add-employee"
                  >
                    Edit Employee
                  </Button>
                </form>
              </div>
            </Box>
          </Modal>
        </div>
        <div className='stack-alert-employee'>
        <Stack>
    <Snackbar open={allReadyDataAlert} autoHideDuration={6000} onClose={allReadyDataAlertFunctionClose}>
        <Alert onClose={allReadyDataAlertFunctionClose} severity="error" >
         UserName and Email Already Register
        </Alert>
      </Snackbar>
    </Stack>
    <div className='add-employee-alert'>
    <Stack>
    <Snackbar open={addEmployeeAlert} autoHideDuration={6000} onClose={allAddEmployeeAlertFunctionClose}>
        <Alert onClose={allAddEmployeeAlertFunctionClose} severity="success" >
         Add Employee successful
        </Alert>
      </Snackbar>
    </Stack>
    </div>
    <div className='edit-employee-alert'>
    <Stack>
    <Snackbar open={employeeEditAlert} autoHideDuration={6000} onClose={editAlertFunctionClose}>
        <Alert onClose={editAlertFunctionClose} severity="success" >
         Edit Employee successful
        </Alert>
      </Snackbar>
    </Stack>
    </div>
    <div className='delete-employee-alert'>
    <Stack>
    <Snackbar open={employeeDeleteAlert} autoHideDuration={6000} onClose={deleteEmployeeAlertFunctionClose}>
        <Alert onClose={deleteEmployeeAlertFunctionClose} severity="error" >
         Delete Employee successful
        </Alert>
      </Snackbar>
    </Stack>
    </div>
        </div>
      </div>
    </>
  );
}
