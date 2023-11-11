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

import OtpLogin from '../screens/otpLogin';
import NotFound from '../screens/404/notfound';

// import Dashboard from '../screens/dashboard';
import ProtectedLogin from '../components/protectedLogin';
import UserProfile from '../screens/userProfile';
import AuthSocial from '../components/authSocial';
import OtpByPhone from '../components/otpByPhone';

import PostMBTI from '../screens/postMBTI';
import Profile from '../screens/admin/profile';
import Admin from '../screens/admin/home';
import Dashboard from '../screens/admin/dashboard/index';
import University from '../screens/admin/university';
import User from '../screens/admin/user';
import Mbti from '../screens/admin/mbti';
import SignInV1 from '../screens/signInV1';
import SignUpV1 from '../screens/signupV1';
import Chat from '../screens/admin/Chat';
import ManageNews from '../screens/admin/news';

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

        <Route path="dang-nhap" element={<SignInV1 />} />
        <Route path="dang-ky" element={<SignUpV1 />} />

        {/* <Route path="dang-nhap" element={<Singin />} />
        <Route path="dang-ky" element={<Signup />} /> */}
        <Route path="/xac-nhan-dang-nhap" element={<OtpLogin />} />
        {/* admin */}

        {/* <Route
          path="/admin"
          element={
            <ProtectedLogin>
              <Admin />
            </ProtectedLogin>
          }
        > */}
        <Route path="/admin" element={<Admin />}>
          <Route path="dashboard" element={<Dashboard />} />
          {/* <Route index element={<Dashboard />} /> */}
          <Route path="danh-sach-truong-hoc" element={<University />} />
          <Route path="danh-sach-nguoi-dung" element={<User />} />
          <Route path="danh-sach-cau-hoi" element={<Mbti />} />
          <Route path="profile" element={<Profile />} />
          <Route path="tin-nhan" element={<Chat />} />
          <Route path="danh-sach-tin-tuc" element={<ManageNews />} />
        </Route>

        {/* no other result match */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
