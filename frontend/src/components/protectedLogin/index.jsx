import React, { useEffect, useState } from 'react';
import { selectIsLogin, selectProfile } from '../../redux/authSlice';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

function ProtectedLogin({ children }) {
  const navigate = useNavigate();
  //   const { loginStatus, user } = UserAuth();

  const profile = useSelector(selectProfile);
  const [isLoaded, setIsLoaded] = useState(false);

  const isLogin = useSelector(selectIsLogin);

  const accessToken = window.localStorage?.getItem('accessToken');

  useEffect(() => {
    // console.log('authenInfor: ', accessToken);
    if (accessToken === null || accessToken === '' || accessToken === undefined) {
      // console.log("login ne")
      navigate('/dang-nhap');
    }

    if (isLogin) {
      setIsLoaded(true);
    }
  }, [isLogin, accessToken]);

  if (isLoaded)
    if (!profile) {
      return <Navigate to="/dang-nhap" />;
    } else {
      return children;
    }
}

export default ProtectedLogin;
