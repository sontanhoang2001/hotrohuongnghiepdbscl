import { Card, Table, Button, Modal } from 'antd';
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
import ChangePassword from '../../components/changePassword';

function UserProfile() {
  const sentOtp = useSelector(selectIsOtp);
  const [id, setId] = useState();
  const [avatar, setAvatar] = useState();
  const [fullname, setFullname] = useState();
  const [gender, setGender] = useState();
  const [birthday, setBirthday] = useState();
  const [address, setAddress] = useState();
  const [addressDetail, setAddressDetail] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [formattedDate, setFormattedDate] = useState();
  const [data, setData] = useState({});
  const [content, setContent] = useState(null);
  const [selectedKey, setSeletedKey] = useState();
  //gọi redux
  const dispatch = useDispatch();
  const getProfile = useSelector(selectProfile);

  //trạng thái đóng/ mở modal
  const [open, setOpen] = useState(false);
  const [openOtp, setOpenOtp] = useState(false);

  const [otpType, setOtpType] = useState('email');

  //khởi tạo cấu trúc hiển thị thông tin người dùng
  const dataSource = [
    {
      key: 'email',
      icon: <MailOutlined className="profile-icon" />,
      text: email,
    },
    {
      key: 'phone',
      icon: <PhoneOutlined className="profile-icon" />,
      text: phone,
    },
    {
      key: 'address',
      icon: <HomeOutlined className="profile-icon" />,
      text: (
        <div>
          <p>{address},</p>
          <p>{addressDetail}</p>
        </div>
      ),
    },
    {
      key: 'action',
      icon: <LockOutlined className="profile-icon" />,
      text: (
        <Button
          type="primary"
          danger
          style={{ textTransform: 'capitalize' }}
          onClick={() => handleOpen('action')}
        >
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
        if (record.key === 'action') {
          return null;
        } else {
          return (
            <>
              <EditOutlined onClick={() => handleOpen(record.key)} />
            </>
          );
        }
      },
    },
  ];
  const handleOpen = (value) => {
    switch (value) {
      case 'email':
        setContent(<EditMail mail={email} />);
        setSeletedKey('email');
        setOtpType('email');
        break;
      case 'phone':
        setContent('chua lam');
        setSeletedKey('SĐT');
        setOtpType('phone');

        break;
      case 'address':
        setContent('chua lam');
        setSeletedKey('địa chi');
        break;
      case 'action':
        setContent(<ChangePassword />);
        setSeletedKey('mật khẩu');

        break;
      default:
        setContent('Giá trị không tồn tại');
    }

    setOpen(true);
  };
  useEffect(() => {
    if (getProfile != null && getProfile !== undefined) {
      setData(getProfile);

      //lấy thông tin người dùng
      setId(data?.UserDetail?.id);
      setAvatar(data?.UserDetail?.avatar);
      setFullname(data?.UserDetail?.fullName);
      setGender(data?.UserDetail?.gender);
      setBirthday(data?.UserDetail?.birthday);
      //định dạng ngày sinh hiển thị
      setFormattedDate(
        birthday != null && birthday !== undefined
          ? format(new Date(birthday), 'dd/MM/yyyy')
          : null,
      );

      setAddress(data?.UserDetail?.address);
      setAddressDetail(data?.UserDetail?.addressDetail);
      setEmail(data?.email);
      setPhone(data?.phone);
    }
    if (sentOtp) {
      setOpen(false);
      dispatch(isOtp(false));
      setOpenOtp(true);
    }
    if (sentOtp === false) {
      dispatch(isOtp(false));
    }
  }, [
    sentOtp,
    dispatch,
    getProfile,
    data,
    id,
    avatar,
    fullname,
    gender,
    birthday,
    address,
    addressDetail,
    email,
    phone,
    formattedDate,
  ]);
  return (
    <ProfileContainer className="container">
      {data && (
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
                <img
                  src="./images/lgbt.svg"
                  alt="lgbt"
                  style={{ width: `20px`, marginBottom: 0 }}
                />
              ) : (
                <span>undifine</span>
              )}
              {fullname}
            </h4>
            <h5>{formattedDate}</h5>
          </div>
          <Table showHeader={false} pagination={false} dataSource={dataSource} columns={columns} />;
        </Card>
      )}
      {/* modal edit */}
      <Modal
        title={`Đổi ${selectedKey}`}
        centered
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        {content}
      </Modal>
      {/* xác thực otp */}
      <Modal centered open={openOtp} onCancel={() => setOpenOtp(false)} footer={null}>
        <RequestOtp type={otpType} userId={id} sentOtp={sentOtp} />
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
