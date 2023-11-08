import { Menu } from 'antd';
import { NavLink, Navigate, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import {
  LogoutOutlined,
  InboxOutlined,
  BankOutlined,
  UserOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace('/', '');

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const dashboard = [
    <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" key={0}>
      <path
        d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
        fill={color}
      ></path>
      <path
        d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
        fill={color}
      ></path>
      <path
        d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const profile = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
        fill={color}
      ></path>
    </svg>,
  ];

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>Muse Dashboard</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="1">
          <NavLink to="/admin">
            <span
              className="icon"
              style={{
                background: page === 'dashboard' ? color : '',
              }}
            >
              {dashboard}
            </span>
            <span className="label">Dashboard</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/admin/danh-sach-truong-hoc">
            <span
              className="icon"
              style={{
                background: page === 'tables' ? color : '',
              }}
            >
              <BankOutlined />
            </span>
            <span className="label">Trường học</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/admin/danh-sach-nguoi-dung">
            <span
              className="icon"
              style={{
                background: page === 'tables' ? color : '',
              }}
            >
              <UserOutlined />
            </span>
            <span className="label">Người dùng</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="4">
          <NavLink to="/admin/danh-sach-cau-hoi">
            <span
              className="icon"
              style={{
                background: page === 'tables' ? color : '',
              }}
            >
              <InboxOutlined />
            </span>
            <span className="label">Câu hỏi</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="5">
          <NavLink to="/admin/danh-sach-tin-tuc">
            <span
              className="icon"
              style={{
                background: page === 'tables' ? color : '',
              }}
            >
              <CopyOutlined />
            </span>
            <span className="label">Tin tức</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item className="menu-item-header" key="6">
          Account Pages
        </Menu.Item>
        <Menu.Item key="7">
          <NavLink to="/admin/profile">
            <span
              className="icon"
              style={{
                background: page === 'profile' ? color : '',
              }}
            >
              {profile}
            </span>
            <span className="label">Profile</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="8">
          <NavLink to="/">
            <span className="icon">
              <LogoutOutlined />
            </span>
            <span
              className="label"
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Sidenav;
