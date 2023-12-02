import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AlignLeftOutlined, UserOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Drawer, Dropdown, Space } from 'antd';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { selectIsLogin, logout, selectLoginData } from '../../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const linkMenu = [
  { to: '/', title: 'trang chủ' },
  {
    to: '/thong-tin-cac-truong-dai-hoc',
    title: 'thông tin các trường đại học',
  },
  {
    to: '/thong-tin-cac-doanh-nghiep',
    title: 'thông tin các doanh Nghiệp',
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
  const getProfile = useSelector(selectLoginData);
  const [loginStatus, setLoginStatus] = useState(false);
  const { role, status } = useSelector((state) => state.auth);

  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };

  const navItemsByRole = {
    ADMIN: (
      <span
        onClick={() => {
          navigate('/admin');
        }}
      >
        Dashboard
      </span>
    ),
    ORGANIZATION: (
      <span
        onClick={() => {
          navigate('/organization');
        }}
      >
        Dashboard
      </span>
    ),
    ADVISER: (
      <span
        onClick={() => {
          navigate('/');
        }}
      >
        profile
      </span>
    ),
    STUDENT: (
      <span
        onClick={() => {
          navigate('/thong-tin-ca-nhan');
        }}
      >
        profile
      </span>
    ),
  };

  useEffect(() => {
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
      label: navItemsByRole[role],
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
    <>
      <Nav>
        {/* logo image */}
        <div className="brand-logo">
          <img src={`../images/logo/logo.png`} alt="home" onClick={() => navigate('/')} />
        </div>
        <div className="top-nav">
          <div className="topbar">
            {/* brand name and topbar button */}
            <h1 className="brand">Trung Tâm Hướng Nghiệp</h1>

            <div className="topbar-btn">
              {isLogin && status === 1 ? (
                <Dropdown
                  menu={{
                    items,
                  }}
                >
                  {}
                  <span onClick={(e) => e.preventDefault()}>
                    <Space>
                      {getProfile?.UserDetail?.fullName}
                      {getProfile?.UserDetail?.avatar === null ? (
                        <UserOutlined className="user-icon" />
                      ) : (
                        <img src={getProfile?.UserDetail?.avatar} alt={''} />
                      )}
                    </Space>
                  </span>
                </Dropdown>
              ) : (
                <>
                  <NavLink
                    to="/dang-nhap"
                    className="client-signin-btn"
                    // onClick={() => navigate('/dang-nhap')}
                  >
                    đăng nhập
                  </NavLink>
                  /
                  <NavLink
                    to="/dang-ky"
                    className="client-signup-btn"
                    // onClick={() => navigate('/dang-ky')}
                  >
                    đăng ký
                  </NavLink>
                </>
              )}
            </div>
          </div>
          {/*navigation bar */}
          <nav className="links">
            <ul>
              {linkMenu.map((val, idx) => (
                <li key={idx}>
                  <NavLink
                    to={val.to}
                    className={({ isActive }) => (isActive ? 'link-actived' : '')}
                  >
                    {val.title}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Button
              className="bugger-btn"
              type="text"
              onClick={showDrawer}
              icon={<MenuOutlined style={{ color: 'var(--text-hover-color)' }} />}
            />
          </nav>
        </div>
        {/* Ant Design Drawer */}
      </Nav>
      <Drawer
        placement="right"
        closable={false}
        onClose={onCloseDrawer}
        open={drawerVisible}
        style={{ backgroundColor: 'var(--primary-color)' }}
      >
        {/* Customize the content of the drawer with your navigation links */}
        <DrawerNav>
          <nav className="bugger-links">
            <ul>
              {linkMenu.map((val, idx) => (
                <li key={idx} onClick={onCloseDrawer}>
                  <NavLink
                    to={val.to}
                    className={({ isActive }) => (isActive ? 'bugger-link-actived' : '')}
                  >
                    {val.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </DrawerNav>
      </Drawer>
    </>
  );
}

const Nav = styled.header`
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 0;
  .brand-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    position: absolute;
    top: 9px;
    img {
      height: 80px;
      cursor: pointer;
      /* @media (max-width: 768px) {
        font-size: 1.6rem;
        height: 70px;
      } */
    }
    @media screen and (min-width: 992px) and (max-width: 1509px) {
      top: 10px;
    }
  }
  .top-nav {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100vw;
    height: 150px;
    .topbar {
      background-color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 100px;
      .brand {
        display: flex;
        margin-top: 0;
        margin-bottom: 0;
        margin-left: 120px;
        text-transform: uppercase;
        @media (max-width: 768px) {
          font-size: 1.6rem;
          margin-left: 100px;
        }
        @media (max-width: 576px) {
          font-size: 1rem;
          margin-left: 100px;
        }
      }
      .topbar-btn {
        margin-right: 20px;
        .client-signin-btn,
        .client-signup-btn {
          cursor: pointer;
          text-transform: capitalize;
          padding: 0 5px;
          text-decoration: none;
          color: inherit;
          font-weight: 600;
          &:hover {
            color: var(--secondary-color);
          }
        }
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
          img {
            width: 30px;
            height: 30px;
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
        height: 100%;
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
      .bugger-btn {
        display: none;
        margin-right: 20px;
        .ant-btn-icon {
          span {
            font-size: 25pt;
            svg {
              margin-right: 0;
            }
          }
        }
      }
    }
    @media (max-width: 992px) {
      height: 150px;
      .links {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        border-bottom: 2px solid var(--text-hover-color);
        height: 50px;

        ul {
          display: none;
        }
        .bugger-btn {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    @media screen and (min-width: 992px) and (max-width: 1200px) {
      height: 210px;
      .links {
        height: 110px;
        ul {
          width: 80%;
          margin-left: auto;
          margin-right: auto;
        }
      }
    }
  }
`;

const DrawerNav = styled.nav`
  /* background-color: var(--primary-color); */
  .bugger-links {
    width: 100%;
    height: 50px;
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      li {
        text-transform: capitalize;
        text-decoration: none;
        text-align: left;
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

        .bugger-link-actived {
          color: var(--text-hover-color);
          border-bottom: 1px solid var(--text-hover-color);
          line-height: 10px;
        }
      }
    }
  }
`;

export default Header;
