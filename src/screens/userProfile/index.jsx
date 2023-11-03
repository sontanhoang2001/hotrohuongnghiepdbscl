import { Card, Row, Table, Button, Modal, Spin } from 'antd';
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
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import EditMail from './editMail';
import { useDispatch, useSelector } from 'react-redux';
import { isOtp, selectIsOtp, selectProfile } from '../../redux/authSlice';
import RequestOtp from '../../components/requestOtp';

function UserProfile() {
  //gọi redux
  const dispatch = useDispatch();
  const getProfile = useSelector(selectProfile);
  const sentOtp = useSelector(selectIsOtp);

  //lấy thông tin người dùng
  // const getInfo = window.localStorage?.getItem('userData');
  // const userInfo = JSON.parse(getInfo);
  const id = getProfile?.UserDetail?.id;
  const avatar = getProfile?.UserDetail?.avatar;
  const fullname = getProfile?.UserDetail?.fullName;
  const gender = getProfile?.UserDetail?.gender;
  const getBirthday = getProfile?.UserDetail?.birthday;
  //định dạng ngày sinh hiển thị
  const formattedDate =
    getBirthday != null && getBirthday !== undefined
      ? format(new Date(getBirthday), 'dd/MM/yyyy')
      : null;
  const address = getProfile?.UserDetail?.address;
  const addressDetail = getProfile?.UserDetail?.addressDetail;
  const email = getProfile?.email;
  const phone = getProfile?.phone;
  //trạng thái đóng/ mở modal
  const [open, setOpen] = useState(false);
  const [openOtp, setOpenOtp] = useState(false);

  const [otpType, setOtpType] = useState('email');

  //khởi tạo cấu trúc hiển thị thông tin người dùng
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

  //định dạng cột hiển thị thông tin người dùng
  const columns = [
    {
      dataIndex: 'icon',
      key: 'icon',
      width: 60,
    },
    {
      dataIndex: 'text',
      key: 'text',
      width: 150,
    },
    {
      width: 40,
      render: (record) => {
        if (record.key === '4') {
          return null;
        } else {
          return (
            <>
              <EditOutlined onClick={() => setOpen(true)} />
            </>
          );
        }
      },
    },
  ];
  useEffect(() => {
    if (sentOtp) {
      setOpen(false);
      dispatch(isOtp(false));
      setOpenOtp(true);
    }
  }, [sentOtp, dispatch, getProfile]);
  return (
    <ProfileContainer className="container">
      <Card>
        <div className="avatar">
          {avatar && avatar != null ? (
            <img src={avatar} alt="avatar" />
          ) : (
            <img src="./images/pngegg.png" alt="avatar" />
          )}

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
      {/* modal edit */}
      <Modal title="Đổi E-mail" centered open={open} onCancel={() => setOpen(false)} footer={null}>
        <EditMail mail={email} />
      </Modal>
      {/* xác thực otp */}
      <Modal
        title="Xác Thực Otp"
        centered
        open={openOtp}
        onCancel={() => setOpenOtp(false)}
        footer={null}
      >
        {/* <RequestOtp type={otpType} userId={id} sentOtp={sentOtp} /> */}
      </Modal>
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  padding: 30px;
  .ant-card {
    border-width: 3px;
    width: 400px;
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
          cursor: pointer;
          &:hover {
            opacity: 0.8;
          }
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
