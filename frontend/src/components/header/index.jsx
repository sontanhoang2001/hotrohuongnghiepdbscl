import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const linkMenu = [
  { to: '/', title: 'tran chủ' },
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

  const handleLink = (index, to) => {
    setIdxActive(index);
    navigate(to);
  };

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
            <Button danger onClick={() => navigate('/dang-nhap')}>
              <span>đăng nhập</span>
              {/* <a href="/dang-nhap">login</a> */}
            </Button>
          </div>
        </div>
        {/*navigation bar */}
        <nav className="links">
          <ul>
            {linkMenu.map((val, idx) => (
              <li key={idx}>
                <span
                  className={`${idxActive === idx ? 'link-actived' : ''}`}
                  onClick={() => {
                    handleLink(idx, val.to);
                  }}
                >
                  {val.title}
                </span>
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
  /* .link-actived {
    color: var(--text-hover-color);
    border-bottom: 1px solid var(--text-hover-color);
    line-height: 10px;
  } */
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
          text-align: center;
          font-weight: 600;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 12px 20px;
          span {
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
