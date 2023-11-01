import { Card, Row, Table, Button } from 'antd';
import {
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  EditOutlined,
  ManOutlined,
  WomanOutlined,
} from '@ant-design/icons';
import { format } from 'date-fns';
import React from 'react';
import styled from 'styled-components';

function UserProfile() {
  const getInfo = window.localStorage?.getItem('userData');
  const userInfo = JSON.parse(getInfo);
  const avatar = userInfo?.UserDetail.avatar;
  const fullname = userInfo?.UserDetail.fullName;
  const gender = userInfo?.UserDetail.gender;
  const getBirthday = userInfo?.UserDetail.birthday;
  const formattedDate =
    getBirthday != null && getBirthday !== undefined
      ? format(new Date(getBirthday), 'dd/MM/yyyy')
      : null;
  const address = userInfo?.UserDetail.address;
  const addressDetail = userInfo?.UserDetail.addressDetail;
  const email = userInfo?.email;
  const phone = userInfo?.phone;
  const dataSource = [
    {
      key: '1',
      icon: <MailOutlined className="profile-icon" />,
      text: email,
    },
    {
      key: '2',
      icon: <PhoneOutlined className="profile-icon" />,
      text: phone,
    },
    {
      key: '3',
      icon: <HomeOutlined className="profile-icon" />,
      text: (
        <div>
          <p>{address},</p>
          <p>{addressDetail}</p>
        </div>
      ),
    },
    {
      key: '4',
      icon: <LockOutlined className="profile-icon" />,
      text: (
        <Button type="primary" danger style={{ textTransform: 'capitalize' }}>
          Đổi mật khẩu
        </Button>
      ),
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
        if (record.key === '4') {
          return null;
        } else {
          return (
            <>
              <EditOutlined />
            </>
          );
        }
      },
    },
  ];
  return (
    <ProfileContainer className="container">
      <Card>
        <div className="avatar">
          <img src={avatar} alt="avatar" />
          {/* <h4>{getInfo?.fullName}</h4> */}

          <h4>
            {gender === 1 ? (
              <span>
                <ManOutlined style={{ color: `var(--primary-color)`, fontSize: `15px` }} />
              </span>
            ) : gender === 2 ? (
              <span>
                <WomanOutlined style={{ color: `var(--secondary-color)`, fontSize: `15px` }} />
              </span>
            ) : gender === 0 ? (
              <img src="./images/lgbt.svg" alt="lgbt" style={{ width: `20px`, marginBottom: 0 }} />
            ) : (
              <span>undifine</span>
            )}
            {fullname}
          </h4>
          <h5>{formattedDate}</h5>
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
