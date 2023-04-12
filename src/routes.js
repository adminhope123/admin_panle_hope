import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import EventPage from './pages/Event/EventPage';
import EmployeeAttendance from './pages/EmployeeTimer/EmployeeAttendance';
import AllStaffMembers from './pages/AllStaffMembers';
import ActivePage from './pages/ActivePage';
import ViewAttendance from './pages/EmployeeTimer/ViewAttendance';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'employee', element: <UserPage /> },
        { path: 'employeestatus', element: <ActivePage /> },
        { path: 'employeeAttendance', element: < EmployeeAttendance/> },
        { path: 'viewAttendance/:E_Id', element: <ViewAttendance/> },
        { path: 'allstaffmembers', element: <AllStaffMembers /> },
        { path: 'event', element: <EventPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    // {
    //   element: <SimpleLayout />,
    //   children: [
    //     { element: <Navigate to="/dashboard/app" />, index: true },
    //     // { path: '404', element: <Page404 /> },
    //     { path: '*', element: <Navigate to="/dashboard/app" /> },
    //   ],
    // },
    // {
    //   path: '*',
    //   element: <Navigate to="/dashboard/app" replace />,
    // },
  ]);

  return routes;
}
