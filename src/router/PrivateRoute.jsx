import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = ({ roles }) => {
  const { role, isLogin } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isLogin && !roles?.some((r) => r === role)) {
    return <Navigate to="/dang-nhap" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
