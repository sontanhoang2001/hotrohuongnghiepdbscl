import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AlignLeftOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { selectIsLogin, selectProfile, logout } from '../../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const linkMenu = [
  { to: '/', title: 'trang chủ' },
  {
    to: '/thong-tin-cac-truong-dai-hoc',
    title: 'thông tin các trường đại học',
  },
  { to: '/trach-nghiem-tinh-cach', title: 'trắc nghiệm tính cách' },
  { to: '/dong-hanh', title: 'đồng hành' },
  { to: '/tin-tuc', title: 'tin tức' },
];

function Header() {
  const navigate = useNavigate();
  const [idxActive, setIdxActive] = useState(0);
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState('/');
  //gọi redux
  const dispatch = useDispatch();
  const isLogin = useSelector(selectIsLogin);
  const [fullname, setFullName] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    setLoginStatus(isLogin ? true : false);

    if (isLogin) {
      const getInfo = window.localStorage.getItem('userData');
      setFullName(JSON.parse(getInfo)?.UserDetail.fullName);
    }

    const pathName = location.pathname;
    setSelectedKeys(pathName);
    handleLink(idxActive, pathName);
  }, [location.pathname, idxActive, isLogin, loginStatus]);

  const handleLink = (index, to) => {
    setIdxActive(index);
    navigate(to);
  };

  const handleLogout = () => {
    navigate('/');
    dispatch(logout());
  };
  const items = [
    {
      key: '1',
      label: (
        <span
          onClick={() => {
            navigate('thong-tin-ca-nhan');
          }}
        >
          profile
        </span>
      ),
      icon: <AlignLeftOutlined />,
    },
    {
      key: '2',
      label: (
        <span
          onClick={() => {
            handleLogout();
          }}
        >
          logout
        </span>
      ),
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Nav>
      {/* logo image */}
      <div className="logo">
        <img src="./images/logo/logo2.webp" alt="home" onClick={() => navigate('/')} />
      </div>
      <div className="top-nav">
        <div className="topbar">
          {/* brand name and topbar button */}
          <h1 className="brand">Trung Tâm Hướng Nghiệp ĐBSCL</h1>

          <div className="topbar-btn">
            {loginStatus ? (
              <Dropdown
                menu={{
                  items,
                }}
              >
                <span onClick={(e) => e.preventDefault()}>
                  <Space>
                    {fullname}
                    <UserOutlined className="user-icon" />
                  </Space>
                </span>
              </Dropdown>
            ) : (
              <Button danger onClick={() => navigate('/dang-nhap')}>
                <span>đăng nhập</span>
                {/* <a href="/dang-nhap">login</a> */}
              </Button>
            )}
          </div>
        </div>
        {/*navigation bar */}
        <nav className="links">
          <ul>
            {linkMenu.map((val, idx) => (
              <li key={idx}>
                <NavLink to={val.to} className={({ isActive }) => (isActive ? 'link-actived' : '')}>
                  {val.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Nav>
  );
}

const Nav = styled.header`
  display: flex;
  align-items: center;
  height: 120px;
  position: relative;
  margin-top: 0;
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    position: absolute;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .top-nav {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100vw;
    height: 120px;
    .topbar {
      background-color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 70px;
      .brand {
        display: flex;
        margin-top: 0;
        margin-bottom: 0;
        margin-left: 120px;
        text-transform: uppercase;
      }
      .topbar-btn {
        margin-right: 20px;
        span {
          text-decoration: none;
          font-weight: 500;
          text-transform: capitalize;
          .user-icon {
            font-size: 1.5rem;
            padding: 3px;
            border: 2px solid;
            border-radius: 50%;
          }
        }
      }
    }
    .links {
      width: 100%;
      height: 50px;
      background-color: var(--primary-color);
      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        text-align: center;
        li {
          display: inline-block;
          text-transform: capitalize;
          text-decoration: none;
          text-align: center;
          font-weight: 600;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 12px 20px;
          a {
            text-decoration: none;
            color: var(--text-color);
            transition: 0.2s ease-in-out;
            &:hover {
              color: var(--text-hover-color);
              border-bottom: 1px solid var(--text-hover-color);
              line-height: 10px;
            }
          }

          .link-actived {
            color: var(--text-hover-color);
            border-bottom: 1px solid var(--text-hover-color);
            line-height: 10px;
          }
        }
      }
    }
  }
`;

export default Header;
