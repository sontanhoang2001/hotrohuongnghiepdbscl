import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';

import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import News from './screens/news';
import Universities from './screens/university';
import Singin from './screens/signin';
import Signup from './screens/signup';
import ForgotPassword from './screens/forgotpassword';
import Dashboard from './screens/dashboard';
import Home from './screens/home';
import MBTI from './screens/mbti';
import TestMbti from './screens/testMbti';
import NotFound from './screens/404/notfound';
import Companion from './screens/companion';
import ManageUser from './screens/manageUser';
import ManageUniversity from './screens/manageUnivercity';
import AdminHome from './screens/adminHome';
import { Counter } from './redux/counter/Counter';
import OtpLogin from './screens/otpLogin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* client */}
          <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="tin-tuc" element={<News />} />
            <Route path="trach-nghiem-tinh-cach" element={<MBTI />} />
            <Route path="mbti-test" element={<TestMbti />} />
            <Route path="thong-tin-cac-truong-dai-hoc" element={<Universities />} />
            <Route path="dong-hanh" element={<Companion />} />
            <Route path="dang-nhap" element={<Singin />} />
            <Route path="dang-ky" element={<Signup />} />
            <Route path="quen-mat-khau" element={<ForgotPassword />} />
          </Route>

          {/* admin */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="" element={<AdminHome />} />
            <Route path="nguoi-dung" element={<ManageUser />} />
            <Route path="truong-hoc" element={<ManageUniversity />} />
          </Route>

          <Route path="/xac-nhan-dang-nhap" element={<OtpLogin />} />
          {/* no other result match */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
