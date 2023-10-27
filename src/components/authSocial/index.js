import { useEffect, useState } from 'react';

// >>> onAuthStateChanged trạng thái khi req login google/facebook
import { auth, onAuthStateChanged, googleSignIn, facebookSignIn, logOut } from '../../firebase/config';


// redux
import { useDispatch } from 'react-redux';
import { async } from '@firebase/util';

// api

// ----------------------------------------------------------------------

export default function AuthSocial() {
  const dispatch = useDispatch();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
    } catch (error) {
      console.log(error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await facebookSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const loginOrRegisterSocial = async (socialLogin) => {
    const { email, displayName, photoURL } = socialLogin;
    console.log(">> socialLogin: ", socialLogin);
    // đây là payload để đưa lên redux
    const resquest = {
      email: email,
      fullName: displayName,
      avatar: photoURL,
    };

    // dispath lên redux để xử lý đk user giống chức năng đk user bình thường
    
  };

  const handleLogOut = async () => {
    // logout phải gọi chung logout trong redux tại để đây để vd thôi
    console.log("đã đăng xuất")
    logOut();
  }

const [socialLogin, setSocialLogin] = useState();
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
        setSocialLogin(currentUser);
    });

    if(socialLogin) {
      loginOrRegisterSocial(socialLogin);
    }

    return () => {
        unsubcribe();
    };
}, [socialLogin]);

  return (
    <>
        <button fullWidth size="large" color="inherit" variant="outlined" onClick={handleGoogleSignIn}>
          icon google
        </button>
        <button fullWidth size="large" color="inherit" variant="outlined" onClick={handleFacebookSignIn}>
        icon facebook
        </button>
          Hoặc

          <button fullWidth size="large" color="inherit" variant="outlined" onClick={handleLogOut}>
        đăng xuất
        </button>
    </>
  );
}
