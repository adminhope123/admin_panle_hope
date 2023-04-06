import { useContext, useEffect, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_
import account from '../../../_mock/account';
import { UserDataContext } from 'src/UserDataContext';
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
    link:'/dashboard/app'
  },
  {
    label: 'Employee',
    icon: 'eva:person-fill',
    link:'/dashboard/employee'
  },
  {
    label: 'All Staff Members',
    icon: 'eva:person-fill',
    link:'/dashboard/allstaffmembers'
  }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const navigate=useNavigate()
  const [userData,setUserData]=useState()

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  useEffect(() => {
    getUserData()
  }, [])
  
  const getUserData=()=>{
    const getData=JSON.parse(sessionStorage.getItem("userData"))
    setUserData(getData)
  }
  const handleClose = (option) => {
    setOpen(null);
    navigate(option?.link)
  };
 
  const logOutFunction=()=>{
    setOpen(null);
    location.reload()
     const logOut=sessionStorage.removeItem("loginData")
      navigate('/login')

  }

  return (
    <>
   <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        {userData?  <Avatar  src={`https://hopebackend.hopeinfosys.com/${userData&&userData?.image}`} alt={userData?.userName} />:""}
      
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {userData?.userName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {userData?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={()=>handleClose(option)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem sx={{ m: 1 }} onClick={()=>logOutFunction()}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
