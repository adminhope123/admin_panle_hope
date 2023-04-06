import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
// mock
import account from '../../../_mock/account';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import LogoData from '././HopeLogo.png';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
//
import navConfig from './config';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const timeLive=new Date().toLocaleTimeString()
  const [liveTime,setLiveTime]=useState(timeLive)
  const [userData,setUserData]=useState()

  const isDesktop = useResponsive('up', 'lg');

  const UpdateTime=()=>{
    const  time =new Date().toLocaleTimeString();
       setLiveTime(time)
       const getData=JSON.parse(sessionStorage.getItem("userData"))
       setUserData(getData)
       const mapData=getData?.map((item)=>{item})
    }
    
    useEffect(() => {
      UpdateTime()
      setInterval(UpdateTime,1000)
    }, [])
    
  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
    sx={{
      height: 1,
      '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
    }}
  >
    <Box sx={{ px: 2.5, py: 3, display: 'flex',justifyContent:"space-between",alignItems:"center" }}>
      <img src={LogoData} width="104px"/>
      <Typography variant="subtitle2" sx={{ color: 'text.primary',fontSize:"18px  " }}>
              {timeLive}
            </Typography>

    </Box>
    <Box sx={{ mb: 5, mx: 2.5 }}>
      <Link underline="none">
        <StyledAccount>
          {
            userData?<Avatar src={`https://hopebackend.hopeinfosys.com/${userData&&userData?.image}`} alt={userData?.userName} />:""
          }
          

          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.primary',textTransform:"capitalize" }}>
              {userData?.userName}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' ,textTransform:"capitalize"}}>
              {userData?.role}
            </Typography>
          </Box>
        </StyledAccount>
      </Link>
    </Box>

    <NavSection data={navConfig} />

    <Box sx={{ flexGrow: 1 }} />
{/* 
    <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
      <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
        <Box
          component="img"
          src={HopeLogoIcon}
          sx={{ width: 100, position: 'absolute', top: -50 }}
        />

      </Stack>
    </Box> */}
  </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
