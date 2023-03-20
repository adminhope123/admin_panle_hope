import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, FormControl } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import {loginFormPostApi} from '../../../Redux/actions'
import { useDispatch } from 'react-redux';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const [employeeGetData,setEmployeeGetData]=useState()
  const [errorForm, setErrorForm] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loginDataForm,setLoginDataForm]=useState({
    email:"",
    password:""
  })

  const employeeLoginGetDataApi=()=>{
    //  fetch('http://127.0.0.1:8000/api/adminlogin')
    //  .then((response)=>response.json())
    //  .then((res)=>setEmployeeGetData(res))
  
    }
  
     const handleLoginSubmit=async(e)=>{
        e.preventDefault();
        setErrorForm(validate(loginDataForm));
        const loginData=loginDataForm
        let result=await fetch("https://hopeusers.hopeinfosys.com/api/adminlogin",{
         method:"POST",
         headers:{
           "Content-Type":"application/json",
           "Accept":"application/json"
         },
        body:JSON.stringify(loginData)
        })
        console.log("reslut",result)
        result= await result.json()
        sessionStorage.setItem("loginData",JSON.stringify(result))
        navigate('/dashboard/app', { replace: true })
        location.reload();
    }
  const hadnleLoginOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginDataForm({ ...loginDataForm, [name]: value });
  };
 
  // const handleLoginSubmit=(e)=>{
  //   e.preventDefault();
  //   setErrorForm(validate(loginDataForm));
  //   console.log("loginDataForm",loginDataForm)
  //     const checkData=employeeGetData?.filter((item)=>item.email===loginDataForm.email&&item.password===loginDataForm.password)
  //     console.log("checkData",checkData)
  //     if(checkData?.length){
  //       navigate('/dashboard/app', { replace: true })
  //       location.reload();
  //       const loginData = Math.random() * 1000000;
  //       console.log("loginData",loginData)
  //       sessionStorage.setItem("login",JSON.stringify(loginData))
  //       sessionStorage.setItem("userData",JSON.stringify(checkData))
  //       const  date =new Date().toLocaleDateString("es-DO");
  //       console.log("Date",date)
  //     }
  // }
  const validate = (values) => {
    const error = {};
    const emailRegex = '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$';
    if (!values.password) {
      error.password = 'password is required';
    } else if (values.password.length < 3) {
      error.password = 'password  more than 3 characters';
    }
    if (!values.email) {
      error.email = 'Enter Email';
    } else if (!emailRegex && emailRegex?.test(values.email)) {
      error.email = 'This is not a valid email format!';
    }
    return error;
  };
  useEffect (() => {
    employeeLoginGetDataApi()
  }, [])


  const [showPassword, setShowPassword] = useState(false);

  // const handleClick = () => {
  //   navigate('/dashboard', { replace: true });
  // };

  return (
    <>
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
