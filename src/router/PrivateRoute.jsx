import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLogin, selectRole } from '../redux/authSlice';
import { Navigate, Outlet } from 'react-router-dom';
import Home from '../screens/admin/home';
import Admin from '../screens/admin/home';

const PrivateAdminRoute = () => {
  const role = useSelector(selectRole);
  const isLogin = useSelector(selectIsLogin);

  return isLogin && (role === 'ADMIN' || role === 'ORGANIZATION') ? (
    <Home />
  ) : (
    <Navigate to={'/dang-nhap'} />
  );
};

export default PrivateAdminRoute;
