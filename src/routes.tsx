import { RouteObject } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './Pages/Dashboard';
import Appearance from './Pages/Appearance';
import Comments from './Pages/Comments';
import Media from './Pages/Media';
import Plugins from './Pages/Plugins';
import Posts from './Pages/Posts';
import Users from './Pages/Users';
import Login from './Pages/Login';
import OpenSchedule from './Pages/OpenSchedule';
import RegisterSchedule from './Pages/RegisterSchedule';
import History from './Pages/History';
import AdjustSchedule from './Pages/AdjustSchedule';
import TimeStatistics from './Pages/TimeStatistics';
import RequestList from './Pages/RequestList';


const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'appearance', element: <Appearance /> },
      { path: 'comments', element: <Comments /> },
      { path: 'media', element: <Media /> },
      { path: 'plugins', element: <Plugins /> },
      { path: 'posts', element: <Posts /> },
      { path: 'users', element: <Users /> },
      // Các trang cho Thư ký khoa
      { path: 'open-schedule', element: <OpenSchedule /> },
      { path: 'register-schedule', element: <RegisterSchedule /> },
      { path: 'history', element: <History /> },
      { path: 'adjust-schedule', element: <AdjustSchedule /> },
      { path: 'time-statistics', element: <TimeStatistics /> },
      { path: 'request-list-gv', element: <RequestList /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  }
];

export default routes;
