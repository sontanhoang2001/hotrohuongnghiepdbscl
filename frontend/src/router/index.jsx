import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Counter } from '../redux/counter/Counter';
import App from '../App';
import NotFound from '../screens/404/notfound';
import OtpLogin from '../screens/otpLogin';
//đăng ký và đăng nhập
import SignInV1 from '../screens/signInV1';
import SignUpV1 from '../screens/signupV1';
//client's pages
import Home from '../screens/client/home';
import News from '../screens/client/news';
import MBTI from '../screens/client/mbti';
import TestMbti from '../screens/client/testMbti';
import Universities from '../screens/client/university';
import Companion from '../screens/client/companion';
import UserProfile from '../screens/client/userProfile';
import ForgotPassword from '../screens/client/forgotpassword';
import PostMBTI from '../screens/client/postMBTI';

//test chức năng otp phone
// import Dashboard from '../screens/dashboard';
import ProtectedLogin from '../components/protectedLogin';
import AuthSocial from '../components/authSocial';
import OtpByPhone from '../components/otpByPhone';

//admin's pages
import Profile from '../screens/admin/profile';
import Admin from '../screens/admin/home';
import Dashboard from '../screens/admin/dashboard/index';
import University from '../screens/admin/university';
import User from '../screens/admin/user';
import Mbti from '../screens/admin/mbti';
import Chat from '../screens/admin/Chat';
import ManageNews from '../screens/admin/news';
import ManageCompanion from '../screens/admin/companion';
import PrivateRoute from './PrivateRoute';
import OrganizationHome from '../screens/organization/home';
import Organization from '../screens/organization/organization';
import OrganizationDashboard from '../screens/organization/dashboard';
import OrganizationChat from '../screens/organization/Chat';
import OrganizationProfile from '../screens/organization/profile';
import OrganizationNews from '../screens/organization/news';
import VerifyOrganization from '../screens/verifyQrganization';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="dang-nhap" element={<SignInV1 />} />
        <Route path="dang-ky" element={<SignUpV1 />} />
        <Route path="/xac-nhan-dang-nhap" element={<OtpLogin />} />
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
        {/* admin */}
        {/* <Route
          path="/admin"
          element={
            <ProtectedLogin>
              <Admin />
            </ProtectedLogin>
          }
        > */}
        <Route path="/admin" element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          {/* <Route index element={<Dashboard />} /> */}
          <Route path="danh-sach-truong-hoc" element={<University />} />
          <Route path="danh-sach-nguoi-dung" element={<User />} />
          <Route path="danh-sach-cau-hoi" element={<Mbti />} />
          <Route path="danh-cau-hoi-dong-hanh" element={<ManageCompanion />} />
          <Route path="profile" element={<Profile />} />
          <Route path="tin-nhan" element={<Chat />} />
          <Route path="danh-sach-tin-tuc" element={<ManageNews />} />
        </Route>

        {/* Organization */}
        <Route path="/to-chuc" element={<OrganizationHome />}>
          <Route path="dashboard" element={<OrganizationDashboard />} />
          {/* <Route index element={<Dashboard />} /> */}
          <Route path="danh-sach-to-chuc" element={<Organization />} />
          <Route path="danh-cau-hoi-dong-hanh" element={<ManageCompanion />} />
          <Route path="profile" element={<OrganizationProfile />} />
          <Route path="tin-nhan" element={<OrganizationChat />} />
          <Route path="danh-sach-tin-tuc" element={<OrganizationNews />} />
        </Route>
        <Route path="xac-minh" element={<VerifyOrganization />} />

        {/* no other result match */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
