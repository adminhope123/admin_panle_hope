// component
import SvgColor from '../../../components/svg-color';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import EventIcon from '@mui/icons-material/Event';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
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
    title: 'Employee Status',
    path: '/dashboard/employeestatus',
    icon: <OnlinePredictionIcon/>,
  },
  {
    title: 'Employee Attendance',
    path: '/dashboard/employeeAttendance',
    icon: <EventAvailableIcon/>,
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
];

export default navConfig;
