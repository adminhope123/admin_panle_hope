// component
import SvgColor from '../../../components/svg-color';
import EventIcon from '@mui/icons-material/Event';
import GroupsIcon from '@mui/icons-material/Groups';
// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Employee',
    path: '/dashboard/employee',
    icon: icon('ic_user'),
  },
  {
    title: 'Employee Attendance',
    path: '/dashboard/employeeAttendance',
    icon: icon('ic_cart'),
  },
  {
    title: 'event',
    path: '/dashboard/event',
    icon: <EventIcon/>,
  },
  {
    title: 'All Staff Members',
    path: '/dashboard/allstaffmembers',
    icon: <GroupsIcon/>,
  },
  
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
