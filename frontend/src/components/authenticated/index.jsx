import React from 'react';
import { Route, Navigate, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLogin, selectProfile } from '../../redux/authSlice';
import Dashboard from '../../screens/dashboard';

const ProtectedRoute = ({ allowedRoles }) => {
  const isAuthenticated = useSelector(selectIsLogin);
  const location = useLocation();
  const profile = useSelector(selectProfile);

  return profile?.userData.roles.id.find((role) => allowedRoles?.includes(role)) ? (
    <Dashboard />
  ) : profile?.userData ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/dang-nhap" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
