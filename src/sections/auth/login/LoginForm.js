import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, FormControl, Box, Snackbar, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import './LoginForm.css'
import Iconify from '../../../components/iconify';
import {getEmployeeApi, loginFormPostApi} from '../../../Redux/actions'
import { useDispatch, useSelector } from 'react-redux';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const [errorForm, setErrorForm] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {users}=useSelector(res=>res.data)
  const [addEmployeeAlert, setAddEmployeeAlert] = useState(false);
  const [loginDataForm,setLoginDataForm]=useState({
    email:"",
    password:""
  })
  const [errorData,setErrorData]=useState()
  
  const allReadyDataAlertFunctionClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAddEmployeeAlert(false);
  };

  const hadnleLoginOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginDataForm({ ...loginDataForm, [name]: value });
  };

   const handleLoginSubmit=async(e)=>{
    allReadyDataAlertFunctionClose()
    setIsSubmit(true)
    e.preventDefault();
    setErrorForm(validate(loginDataForm));
    if(Object.keys(errorForm).length === 0&& isSubmit){
      const loginData=loginDataForm
      let result=await fetch("https://hopeusers.hopeinfosys.com/api/adminlogin",{
       method:"POST",
       headers:{
         "Content-Type":"application/json",
         "Accept":"application/json"
       },
      body:JSON.stringify(loginData)
      })
      result=await  result.json()
      const dataData=result?.message
      if(dataData){
        setErrorData(dataData)
      }
      if(result.message==="Login Successfully...."){
        sessionStorage.setItem("loginData",JSON.stringify(loginData))
        navigate('/dashboard/app', { replace: true })
        const getData=JSON.parse(sessionStorage.getItem("loginData"))
   
        if(getData?.length===0){
        }else{
          location.reload()
        }
      }
      setAddEmployeeAlert(true)
   }
     if(users){
       const filterData=users?.filter((item)=>item?.email===loginDataForm?.email)
       const dataGet=JSON.parse(sessionStorage.getItem("userData"))
       if(dataGet?.length===0){
       }
       sessionStorage.setItem("viewEmployee",JSON.stringify(users))
       if(filterData){
         sessionStorage.setItem("userData",JSON.stringify(filterData))
       }
     }
}
   const validate = (values) => {
    const error = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      error.email = "Email is required!";
    }
     else if (!regex.test(values.email)) {
      error.email = "This is not a valid email format!";
    }
    if (!values.password) {
      error.password = "Password is required";
    } else if (values.password.length < 4) {
      error.password = "Password must be more than 4 characters";
    } 
    return error;
  };
  const handleClickOpenForgotPassword=()=>{
    navigate('/forgotpassword', { replace: true })
  }
useEffect(() => {
dispatch(getEmployeeApi())
}, [])

  return (
    <>
      <Box>
    <Stack>
            <Snackbar open={addEmployeeAlert} autoHideDuration={6000} onClose={allReadyDataAlertFunctionClose} className="alertLogin" >
              <Alert onClose={allReadyDataAlertFunctionClose} variant="filled"  severity="error">
              {errorData}
              </Alert>
            </Snackbar>
          </Stack>
    </Box>
      <form onSubmit={handleLoginSubmit}>
        <Stack spacing={3}>
        <TextField name="email" label="Email address" value={loginDataForm.email} onChange={hadnleLoginOnChange} error={errorForm.email}/>
          <p className='login-error-text'>{errorForm.email}</p>
        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={loginDataForm.password}
           onChange={hadnleLoginOnChange}
           error={errorForm.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
         <p className='login-error-text'>{errorForm.password}</p>
      </Stack>

      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}

      <LoadingButton fullWidth sx={{marginTop:"20px"}} size="large" type="submit" variant="contained" >
        Login
      </LoadingButton>
      </form>
    </>
  );
}
