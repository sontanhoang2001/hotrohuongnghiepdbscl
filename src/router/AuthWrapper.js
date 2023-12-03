import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthWrapper = ({ roles }) => {
  const { role, isLogin } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isLogin) return <Navigate to="/dang-nhap" state={{ from: location }} replace />;

  if (!roles.includes(role)) return <Navigate to="/*" state={{ from: location }} replace />;

  return <Outlet />;
};

export default AuthWrapper;
