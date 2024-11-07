import { Navigate, RouteObject } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './Pages/Dashboard';

import Login from './Pages/Login';
import OpenSchedule from './Pages/OpenSchedule';
import RegisterSchedule from './Pages/RegisterSchedule';
import History from './Pages/History';
import AdjustSchedule from './Pages/AdjustSchedule';
import TimeStatistics from './Pages/TimeStatistics';
import RequestList from './Pages/RequestList';
import ProtectedRoute from './ProtectedRoute';
import Attendance from './Pages/Attendance';
import Request from './Pages/Request';
import MyHistory from './Pages/MyHistory';
import Reports from './Pages/Reports';
import Schedule from './Pages/Schedule';
import Violations from './Pages/Violations';


const routes: RouteObject[] = [
  {
    path: '/',
    element: <ProtectedRoute />, 
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          { path: '/', element: <Navigate to="/dashboard" replace /> },
          { path: 'dashboard', element: <Dashboard /> },
          
          // Các đường dẫn của Ban Chủ Nhiệm Khoa (bcnKhoa)
          { path: 'reports', element: <Reports /> },
          { path: 'schedule', element: <Schedule /> },
          { path: 'violations', element: <Violations /> },

          // Các đường dẫn của Thư Ký Khoa (thuKyKhoa)
          { path: 'open-schedule', element: <OpenSchedule /> },
          { path: 'register-schedule', element: <RegisterSchedule /> },
          { path: 'history', element: <History /> },
          { path: 'adjust-schedule', element: <AdjustSchedule /> },
          { path: 'time-statistics', element: <TimeStatistics /> },
          { path: 'request-list-gv', element: <RequestList /> },

          // Các đường dẫn của Giảng Viên (giangVien)
          { path: 'attendance', element: <Attendance /> },
          { path: 'request', element: <Request /> },
          { path: 'my-history', element: <MyHistory /> },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
];

export default routes;
