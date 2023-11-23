import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthWrapper = ({ roles }) => {
  const { role, isLogin } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isLogin && !roles?.some((r) => r === role))
    return <Navigate to="/*" state={{ from: location }} replace />;

  // if (!roles?.some((r) => r===role)) {

  //     return <Navigate to="/" state={{ from: location }} replace />
  // }

  return <Outlet />;
};

export default AuthWrapper;
