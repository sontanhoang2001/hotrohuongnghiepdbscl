import { Card, Row, Table } from 'antd';
import {
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  EditOutlined,
} from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';

function UserProfile() {
  const getInfo = window.localStorage?.getItem('userData');
  const dataSource = [
    {
      key: '1',
      icon: <MailOutlined className="profile-icon" />,
      text: 'Email',
    },
    {
      key: '2',
      icon: <PhoneOutlined className="profile-icon" />,
      text: '1029031923',
    },
    {
      key: '3',
      icon: <HomeOutlined className="profile-icon" />,
      text: ' thành phố hà nội, quận hà nam, phường ádadas',
    },
    {
      key: '4',
      icon: <LockOutlined className="profile-icon" />,
      text: 'Password',
    },
  ];

  const columns = [
    {
      dataIndex: 'icon',
      key: 'name',
    },
    {
      dataIndex: 'text',
      key: 'age',
    },
    {
      dataIndex: 'editor',
      key: 'address',
    },
    {
      render: (record) => {
        return (
          <>
            <EditOutlined />
          </>
        );
      },
    },
  ];
  return (
    <ProfileContainer className="container">
      <Card>
        <div className="avatar">
          <img src="./images/logo/logo2.webp" alt="avatar" />
          {/* <h4>{getInfo?.fullName}</h4> */}
          <span>male</span>
          <h4>name</h4>
        </div>
        <Table showHeader={false} pagination={false} dataSource={dataSource} columns={columns} />;
      </Card>
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  padding: 30px;
  .ant-card {
    border-width: 3px;
    width: 350px;
    margin-left: auto;
    margin-right: auto;
    .ant-card-body {
      .ant-table-row {
        .ant-table-cell {
          .profile-icon {
            color: var(--primary-color);
            font-size: 1.5rem;
          }
        }
      }
      .avatar {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        display: flex;
        img {
          width: 104px;
          margin-bottom: 20px;
        }
        h4 {
          margin-bottom: 4px;
          color: rgba(0, 0, 0, 0.85);
          font-weight: 500;
          font-size: 20px;
          line-height: 28px;
        }
      }
    }
  }
`;
export default UserProfile;
