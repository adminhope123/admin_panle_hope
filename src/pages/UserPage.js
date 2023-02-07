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
} from '@mui/material';
// components
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import './style.css'
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: "13px",
  p: 4,
};
const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
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
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [newUserModel,setNewUserModel]=useState()
  const [showPassword, setShowPassword] =useState(false);
  const [employeeDataForm,setEmployeeForm]=useState({
    userName:"",
    email:"",
    mobileNumber:"",
    role:"",
    password:""
  })
  const [errorForm,setErrorForm]=useState({})
  const[isSubmit,setIsSubmit]=useState(false)

  const hadnleEmployeeOnchange=(e)=>{
    const name=e.target.name
    const value=e.target.value
    setEmployeeForm({...employeeDataForm,[name]:value})
   }
   const hadnleEmployeeSubmit=(e)=>{
   e.preventDefault()
   setIsSubmit(true)
   setErrorForm(validate(employeeDataForm))
  
 console.log("isSubmit",isSubmit)
 console.log("employeeDataForm",employeeDataForm)
 if (Object.keys(errorForm).length === 0 && isSubmit) {
  employeeDataApi()
}
 
  }
  const employeeDataApi=()=>{
    if (Object.keys(errorForm).length === 0){

      setNewUserModel(false)
    }
      fetch("http://localhost:3004/employee",{
       method:"POST",
      headers:{
       'Content-Type': 'application/json'
       },
       body:JSON.stringify(employeeDataForm)
      }).then((result)=>{
       result.json().then((resp)=>{
         console.log("resp",resp)
       })
      })
  }
  const validate=(values)=>{
    const error={}
    const emailRegex="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
    if (!values.userName) {
      error.userName = "user Name is required";
      }else if (values.userName.length < 3) {
      error.userName = "user Name  more than 3 characters";
      }  else if (values.userName.length > 5) {
      error.userName = "user Name cannot exceed more than 5 characters";
      }
      if (!values.password) {
      error.password = "password is required";
      }else if (values.password.length < 3) {
      error.password = "password  more than 3 characters";
      }  
      if (!values.role) {
      error.role = "role is required";
      }else if (values.role.length < 3) {
      error.role = "role  more than 3 characters";
      }  else if (values.role.length > 5) {
      error.role = "role cannot exceed more than 5 characters";
      }
    if(!values.email){
      error.email="Enter Email"
    }else if(!emailRegex&&emailRegex?.test(values.email)){
      error.email="This is not a valid email format!"
    }
    if (!values.mobileNumber) {
      error.mobileNumber = "phoneNumber is required";
      }else if (values.mobileNumber.length < 10) {
      error.mobileNumber = "phoneNumber  more than 10 characters";
      }  else if (values.mobileNumber.length > 10) {
      error.mobileNumber = "phoneNumber cannot exceed more than 10 characters";
      }
      return error;
  }
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleNewUserModelClose=()=>{
    setNewUserModel(false)
  }

  const handleNewUserModelOpen=()=>{
    setNewUserModel(true)
  }
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
     <div className='employee-page'>
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
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, role, status, company, avatarUrl, isVerified } = row;
                    const selectedUser = selected.indexOf(name) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{company}</TableCell>

                        <TableCell align="left">{role}</TableCell>

                        <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>

                        <TableCell align="left">
                          <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

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
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      <div className='new-user-form'>

      <Modal
  open={newUserModel}
  onClose={handleNewUserModelClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <div className='employee-new-user'>
        <form onSubmit={hadnleEmployeeSubmit}>
        <FormControl >
        <TextField  label="User Name" type="text" name="userName" error={errorForm?.userName} value={employeeDataForm.userName} onChange={hadnleEmployeeOnchange}/>
        <p className='employee-error-text'>{errorForm.userName}</p>
        </FormControl>
        <FormControl >
        <TextField  label="Role" name="role" type="text" error={errorForm?.role} value={employeeDataForm.role} onChange={hadnleEmployeeOnchange}/>
        <p className='employee-error-text'>{errorForm.role}</p>
        </FormControl>
        <FormControl >
        <TextField  label="Mobile Number" type="number" name="mobileNumber" error={errorForm?.mobileNumber} value={employeeDataForm.mobileNumber} onChange={hadnleEmployeeOnchange}/>
        <p className='employee-error-text'>{errorForm.mobileNumber}</p>
        </FormControl>
        <FormControl >
        <TextField  label="Email address" name="email" type="text" error={errorForm?.email} value={employeeDataForm.email} onChange={hadnleEmployeeOnchange} />
        <p className='employee-error-text'>{errorForm.email}</p>
        </FormControl>
        <FormControl >
        <TextField  label="Password" error={errorForm?.password}  name="password" type="text" value={employeeDataForm.password} onChange={hadnleEmployeeOnchange} />
        <p className='employee-error-text'>{errorForm.password}</p>
        </FormControl>
        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} type='submit' className="add-employee">
            Add Employee
          </Button>
        </form>
    </div>
  </Box>
</Modal>
      </div>
     </div>
    </>
  );
}
