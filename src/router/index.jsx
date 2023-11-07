import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../App';
import Home from '../screens/home';
import { Counter } from '../redux/counter/Counter';
import News from '../screens/news';
import MBTI from '../screens/mbti';
import TestMbti from '../screens/testMbti';
import Universities from '../screens/university';
import Companion from '../screens/companion';
import ForgotPassword from '../screens/forgotpassword';
import Singin from '../screens/signin';
import Signup from '../screens/signup';
import AdminHome from '../screens/adminHome';
import ManageUser from '../screens/manageUser';
import ManageUniversity from '../screens/manageUniversity';
import OtpLogin from '../screens/otpLogin';
import NotFound from '../screens/404/notfound';

import Dashboard from '../screens/dashboard';
import ProtectedLogin from '../components/protectedLogin';
import UserProfile from '../screens/userProfile';
import AuthSocial from '../components/authSocial';
import OtpByPhone from '../components/otpByPhone';
import ManageMBTI from '../screens/manageMBTI';
import PostMBTI from '../screens/postMBTI';

const ROLES = {
  User: 5,
  Admin: 1,
};

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* client */}
        <Route path="/" element={<App />}>
          <Route path="/postMBTI" element={<PostMBTI />} />
          <Route path="/" element={<Home />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="tin-tuc" element={<News />} />
          <Route path="trach-nghiem-tinh-cach" element={<MBTI />} />
          <Route path="mbti-test" element={<TestMbti />} />
          <Route path="thong-tin-cac-truong-dai-hoc" element={<Universities />} />
          <Route path="dong-hanh" element={<Companion />} />
          <Route path="quen-mat-khau" element={<ForgotPassword />} />
          <Route path="thong-tin-ca-nhan" element={<UserProfile />} />

          <Route path="otp" element={<OtpByPhone />} />
          <Route path="authSocial" element={<AuthSocial />} />
        </Route>

        <Route path="dang-nhap" element={<Singin />} />
        <Route path="dang-ky" element={<Signup />} />

        {/* admin */}

        <Route
          path="/admin"
          element={
            <ProtectedLogin>
              <Dashboard />
            </ProtectedLogin>
          }
        >
          <Route path="" element={<AdminHome />} />
          <Route path="nguoi-dung" element={<ManageUser />} />
          <Route path="truong-hoc" element={<ManageUniversity />} />
          <Route path="cau-hoi" element={<ManageMBTI />} />
        </Route>

        <Route path="/xac-nhan-dang-nhap" element={<OtpLogin />} />
        {/* no other result match */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
