import { useEffect, useState } from 'react';
//call redux
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile } from '../../redux/authSlice';

const Redirection = () => {
  const profile = useSelector(selectProfile);

  useEffect(() => {
    // This useEffect hook will run when the component is mounted
    // You can put any side-effect or logic here that doesn't involve rendering UI
    // console.log('MyUtilityComponent is mounted');
    // console.log('>>> lesting ... profile: ', profile?.userData.role);
    try {
      if (profile?.userData.Role.id === 1) {
        window.location.href = '/dashboard';
        console.log('role', profile?.userData.Role.name);
      }
      if (profile?.userData.Role.id === 5) {
        window.location.href = '/';
        console.log('role', profile?.userData.Role.name);
      }
    } catch (error) {
      console.log('err', error);
    }

    // Cleanup function if needed
    return () => {
      //   console.log('MyUtilityComponent is unmounted');
    };
  }, [profile]);

  // You don't have to return any JSX if this component is purely for logic
  return null;
};

export default Redirection;
