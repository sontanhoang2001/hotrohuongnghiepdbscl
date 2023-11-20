import { Menu } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LogoutOutlined,
  BankOutlined,
  UserOutlined,
  CopyOutlined,
  CommentOutlined,
  InboxOutlined,
  BookOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import styled from 'styled-components';

function Sidenav({ color }) {
  const dispatch = useDispatch();
  const {role}=useSelector(state=>state.auth);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
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

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const adminItems = [
    getItem(
      <NavLink to="/admin/dashboard">
        <span className="icon">{dashboard}</span>
        <span className="label">Dashboard</span>
      </NavLink>,
      '1',
    ),
    getItem(
      <NavLink to="/admin/danh-sach-truong-hoc">
        <span className="icon">
          <BankOutlined />
        </span>
        <span className="label">Tổ chức</span>
      </NavLink>,
      '2',
    ),
    getItem(
      <NavLink to="/admin/verification-requests">
        <span className="icon">
          <BankOutlined />
        </span>
        <span className="label">Yêu cầu xác thực</span>
      </NavLink>,
      '11',
    ),
    getItem(
      <NavLink to="/admin/danh-sach-cau-hoi">
        <span className="icon">
          <InboxOutlined />
        </span>
        <span className="label">Câu hỏi</span>
      </NavLink>,
      '3',
    ),
    getItem(
      <NavLink to="/admin/danh-cau-hoi-dong-hanh">
        <span className="icon">
          <BookOutlined />
        </span>
        <span className="label">Đồng hành</span>
      </NavLink>,
      '4',
    ),
    getItem(
      <NavLink to="/admin/danh-sach-nguoi-dung">
        <span className="icon">
          <UserOutlined />
        </span>
        <span className="label">Người dùng</span>
      </NavLink>,
      '5',
    ),
    getItem(
      <NavLink to="/admin/danh-sach-tin-tuc">
        <span className="icon">
          <CopyOutlined />
        </span>
        <span className="label">Tin tức</span>
      </NavLink>,
      '6',
    ),
    getItem(
      <MeunuItem>
        <span className="label sidenav-title-content">Tài Khoản</span>
      </MeunuItem>,
      '7',
    ),
    getItem(
      <NavLink to="/admin/profile">
        <span className="icon">{profile}</span>
        <span className="label">Profile</span>
      </NavLink>,
      '8',
    ),
    getItem(
      <NavLink to="/admin/tin-nhan">
        <span className="icon">
          <CommentOutlined />
        </span>
        <span className="label">Tin Nhắn</span>
      </NavLink>,
      '9',
    ),
    getItem(
      <MeunuItem>
        <span className="icon">
          <LogoutOutlined />
        </span>
        <span className="label" onClick={() => handleLogout()}>
          Đăng xuất
        </span>
      </MeunuItem>,
      '10',
    ),
  ];
  const orgItems = [
    getItem(
      <NavLink to="/admin/dashboard">
        <span className="icon">{dashboard}</span>
        <span className="label">Dashboard</span>
      </NavLink>,
      '1',
    ),
    getItem(
      <NavLink to="/organization">
        <span className="icon">
          <BankOutlined />
        </span>
        <span className="label">Danh sách tổ chức</span>
      </NavLink>,
      '2',
    ),
    
    getItem(
      <NavLink to="/admin/danh-sach-cau-hoi">
        <span className="icon">
          <InboxOutlined />
        </span>
        <span className="label">Câu hỏi</span>
      </NavLink>,
      '3',
    ),
    getItem(
      <NavLink to="/admin/danh-cau-hoi-dong-hanh">
        <span className="icon">
          <BookOutlined />
        </span>
        <span className="label">Đồng hành</span>
      </NavLink>,
      '4',
    ),
    getItem(
      <NavLink to="/admin/danh-sach-nguoi-dung">
        <span className="icon">
          <UserOutlined />
        </span>
        <span className="label">Người dùng</span>
      </NavLink>,
      '5',
    ),
    getItem(
      <NavLink to="/admin/danh-sach-tin-tuc">
        <span className="icon">
          <CopyOutlined />
        </span>
        <span className="label">Tin tức</span>
      </NavLink>,
      '6',
    ),
    getItem(
      <MeunuItem>
        <span className="label sidenav-title-content">Tài Khoản</span>
      </MeunuItem>,
      '7',
    ),
    getItem(
      <NavLink to="/admin/profile">
        <span className="icon">{profile}</span>
        <span className="label">Profile</span>
      </NavLink>,
      '8',
    ),
    getItem(
      <NavLink to="/admin/tin-nhan">
        <span className="icon">
          <CommentOutlined />
        </span>
        <span className="label">Tin Nhắn</span>
      </NavLink>,
      '9',
    ),
    getItem(
      <MeunuItem>
        <span className="icon">
          <LogoutOutlined />
        </span>
        <span className="label" onClick={() => handleLogout()}>
          Đăng xuất
        </span>
      </MeunuItem>,
      '10',
    ),
  ];
  const adviserItems = [
    getItem(
      <NavLink to="/admin/dashboard">
        <span className="icon">{dashboard}</span>
        <span className="label">Dashboard</span>
      </NavLink>,
      '1',
    ),
    getItem(
      <NavLink to="/organization">
        <span className="icon">
          <BankOutlined />
        </span>
        <span className="label">Danh sách tổ chức</span>
      </NavLink>,
      '2',
    ),
    getItem(
      <NavLink to="/admin/danh-sach-cau-hoi">
        <span className="icon">
          <InboxOutlined />
        </span>
        <span className="label">Câu hỏi</span>
      </NavLink>,
      '3',
    ),
    getItem(
      <NavLink to="/admin/danh-cau-hoi-dong-hanh">
        <span className="icon">
          <BookOutlined />
        </span>
        <span className="label">Đồng hành</span>
      </NavLink>,
      '4',
    ),
    getItem(
      <NavLink to="/admin/danh-sach-nguoi-dung">
        <span className="icon">
          <UserOutlined />
        </span>
        <span className="label">Người dùng</span>
      </NavLink>,
      '5',
    ),
    getItem(
      <NavLink to="/admin/danh-sach-tin-tuc">
        <span className="icon">
          <CopyOutlined />
        </span>
        <span className="label">Tin tức</span>
      </NavLink>,
      '6',
    ),
    getItem(
      <MeunuItem>
        <span className="label sidenav-title-content">Tài Khoản</span>
      </MeunuItem>,
      '7',
    ),
    getItem(
      <NavLink to="/admin/profile">
        <span className="icon">{profile}</span>
        <span className="label">Profile</span>
      </NavLink>,
      '8',
    ),
    getItem(
      <NavLink to="/admin/tin-nhan">
        <span className="icon">
          <CommentOutlined />
        </span>
        <span className="label">Tin Nhắn</span>
      </NavLink>,
      '9',
    ),
    getItem(
      <MeunuItem>
        <span className="icon">
          <LogoutOutlined />
        </span>
        <span className="label" onClick={() => handleLogout()}>
          Đăng xuất
        </span>
      </MeunuItem>,
      '10',
    ),
  ];

  const navItemsByRole={
    "ADMIN":adminItems,
    "ORGANIZATION":orgItems,
    "ADVISER":adviserItems
  }

 
  return (
    <>
      <div className="brand">
        <p>Trung Tâm Hướng Nghiệp</p>
        <p>ĐBSCL</p>
      </div>
      <hr />
      <Menu defaultSelectedKeys={['1']} mode="inline" items={navItemsByRole[role]} />
    </>
  );
}
const MeunuItem = styled.div`
  padding: 10px 16px;
  color: #141414;
  border-radius: 8px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  .sidenav-title-content {
    color: #8c8c8c;
    font-weight: 700;
    font-size: 13px;
    text-transform: uppercase;
  }
`;
export default Sidenav;
