import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const userRole = localStorage.getItem('userRole');
  console.log('userRole: ', userRole);
  
  return userRole ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
