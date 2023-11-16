import React from 'react'
import { useAppSelector } from '../../store/configureStore'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AuthWrapper = ({roles}) => {
    const { user } = useAppSelector(state => state.account);
    const location = useLocation();

    if (!user) return <Navigate to="/login" state={{ from: location }} replace />

    if (!roles?.some((r) => user.roles?.includes(r))) {
        
        return <Navigate to="/" state={{ from: location }} replace />
    }

    return <Outlet />;
}

 export default AuthWrapper;