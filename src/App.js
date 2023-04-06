// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import RouterComponent from './routes';
import { StyledChart } from './components/chart';
import { UserDataProvider } from './UserDataContext';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginPage from './pages/LoginPage';

// ----------------------------------------------------------------------

export default function App() {
//   const navigate=useNavigate()
//    const [loginSuccess,setLoginSuccess]=useState()
// useEffect(() => {
//         var login=sessionStorage.getItem("loginData")
//         setLoginSuccess(login)
//         if(!login){
//            navigate('/login')
//            localStorage.removeItem("/loginData")
//         }
//     }, [])
    

    

  return (
    <UserDataProvider>
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      {/* {
        loginSuccess?
   <RouterComponent/>:
      <Routes>
          <Route  path="/login" element={<LoginPage/>}/>
      </Routes>
      } */}
   <RouterComponent/>
      {/* <Routes>
          <Route  path="/login" element={<LoginPage/>}/>
      </Routes> */}
      </ThemeProvider>
    </UserDataProvider>
  );
}
