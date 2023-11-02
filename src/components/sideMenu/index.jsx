import { AppstoreOutlined, UserOutlined, BankOutlined, InboxOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState('/');

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <SideMenuContainer>
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: 'Dashbaord',
            icon: <AppstoreOutlined />,
            key: '/admin',
          },
          {
            label: 'Người Dùng',
            key: '/admin/nguoi-dung',
            icon: <UserOutlined />,
          },
          {
            label: 'Trường Học',
            key: '/admin/truong-hoc',
            icon: <BankOutlined />,
          },
          {
            label: 'Câu Hỏi',
            key: '/admin/cau-hoi',
            icon: <InboxOutlined />,
          },
        ]}
      ></Menu>
    </SideMenuContainer>
  );
}

const SideMenuContainer = styled.div`
  height: 100%;
  .SideMenuVertical {
    height: 100%;
  }
`;
export default SideMenu;
