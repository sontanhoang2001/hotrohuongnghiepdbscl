import { Card, Table, Button, Modal, Row, Col } from 'antd';
import {
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  EyeOutlined,
  ManOutlined,
  WomanOutlined,
} from '@ant-design/icons';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import EditMail from './editMail';
import { useDispatch, useSelector } from 'react-redux';
import { isOtp, selectIsOtp, selectProfile } from '../../../redux/authSlice';
import RequestOtp from '../../../components/requestOtp';
import ChangePassword from '../../../components/changePassword';
import { MarginTopContent } from '../../../globalStyles';

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

  //trạng thái đóng/ mở modal
  const [open, setOpen] = useState(false);
  const [openOtp, setOpenOtp] = useState(false);
  const [otpType, setOtpType] = useState('email');

  const [content, setContent] = useState(null);
  const [selectedKey, setSeletedKey] = useState();
  //gọi redux
  const dispatch = useDispatch();
  const getProfile = useSelector(selectProfile);

  useEffect(() => {
    setId(getProfile?.UserDetail?.id);
    setAvatar(getProfile?.UserDetail?.avatar);
    setFullname(getProfile?.UserDetail?.fullName);
    setGender(getProfile?.UserDetail?.gender);
    setBirthday(getProfile?.UserDetail?.birthday);
    //định dạng ngày sinh hiển thị
    setFormattedDate(
      birthday != null && birthday !== undefined ? format(new Date(birthday), 'dd/MM/yyyy') : null,
    );

    setAddress(getProfile?.UserDetail?.address);
    setAddressDetail(getProfile?.UserDetail?.addressDetail);
    setEmail(getProfile?.email);
    setPhone(getProfile?.phone);
    if (sentOtp) {
      setOpen(false);
      dispatch(isOtp(false));
      setOpenOtp(true);
    }
  }, [dispatch, openOtp, open, sentOtp, getProfile]);

  const columns = [
    {
      title: 'Thời Gian',
      dataIndex: 'date',
      key: 'date',
      width: '33%',
    },
    {
      title: 'Kết quả',
      dataIndex: 'result',
      key: 'result',
      width: '33%',
    },
    {
      key: 'view',
      width: '33%',
      render: () => (
        <>
          <div className="author-info">
            <Button>
              <EyeOutlined /> Xem kết quả
            </Button>
          </div>
        </>
      ),
    },
  ];
  const dataSource = [
    {
      key: '1',
      date: 'Mike',
      result: 'ISTJ',
    },
  ];
  return (
    <MarginTopContent className="container">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={12}>
          <Card>
            <ProfileHeader>
              {avatar && avatar != null ? (
                <img src={avatar} alt="avatar" />
              ) : (
                <img src="./images/pngegg.png" alt="avatar" />
              )}

              {/* <h4>{getInfo?.fullName}</h4> */}

              <div className="text-header">
                <p className="full-name">{fullname}</p>
                <p>
                  Giới tính:{' '}
                  {gender === 1 ? (
                    <span>
                      <ManOutlined style={{ color: `var(--primary-color)`, fontSize: `15px` }} />
                    </span>
                  ) : gender === 2 ? (
                    <span>
                      <WomanOutlined
                        style={{ color: `var(--secondary-color)`, fontSize: `15px` }}
                      />
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
                </p>
              </div>
            </ProfileHeader>
            <BodyContent>
              <Row style={{ marginTop: 20 }}>
                <Col span={24}>
                  <p>
                    <PhoneOutlined
                      className="profile-icon"
                      style={{ color: 'var(--primary-color)' }}
                    />{' '}
                    - Điện Thoại
                  </p>
                  <p className="underline">{phone}</p>
                </Col>
                <Col></Col>
              </Row>
              <Row style={{ marginTop: 20 }}>
                <Col span={24}>
                  <p>
                    <MailOutlined
                      className="profile-icon"
                      style={{ color: 'var(--primary-color)' }}
                    />{' '}
                    - E-Mail
                  </p>
                  <p className="underline">{email}</p>
                </Col>
              </Row>
              <Row style={{ marginTop: 20 }}>
                <Col span={24}>
                  <p>
                    <HomeOutlined
                      className="profile-icon"
                      style={{ color: 'var(--primary-color)' }}
                    />{' '}
                    - Địa chỉ
                  </p>

                  <p></p>
                  <p className="underline">
                    {address}, {addressDetail}
                  </p>
                </Col>
              </Row>
              <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
                <Col span={12}>
                  <Button type="primary" danger block>
                    Đổi mật khẩu
                  </Button>
                </Col>
                <Col span={12}>
                  <Button type="primary" block>
                    Cập nhật thông tin
                  </Button>
                </Col>
              </Row>
            </BodyContent>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12}>
          <Card>
            <HistoryHeader>
              <h3>Lịch sử test MBTI</h3>
              <Button>Kiểm tra MBTI</Button>
            </HistoryHeader>
            <Table dataSource={dataSource} columns={columns} pagination={false} />
          </Card>
        </Col>
      </Row>
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
    </MarginTopContent>
  );
}
const ProfileCard = styled.div`
  min-width: 500px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  overflow: hidden;
`;
const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  img {
    box-sizing: initial;
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
  .text-header {
    width: calc(100% - 104px);
    padding-left: 20px;
    p {
      color: var(--text-color);
    }
    .full-name {
      font-size: 14pt;
      font-weight: 600;
    }
  }
`;

const BodyContent = styled.div`
  padding: 20px;
  width: 100%;
  /* background: var(--primary-color);
  color: var(--text-white-color); */
  p {
    font-size: 14pt;
    font-weight: 500;
  }
  .underline {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    word-wrap: break-word;
    padding-bottom: 15px;
    margin-top: 10px;
    color: var(--text-color);
  }
`;
const HistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;
export default UserProfile;
