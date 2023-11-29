import { Card, Table, Button, Modal, Row, Col, Descriptions, List, Space } from 'antd';
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
import { isOtp, selectIsOtp, selectLoginData } from '../../../redux/authSlice';
import RequestOtp from '../../../components/requestOtp';
import ChangePassword from '../../../components/changePassword';
import { MarginTopContent } from '../../../globalStyles';
import { useNavigate } from 'react-router-dom';
import {
  getAllTestHistory,
  getTestHistoryById,
  selectMbtiQuestions,
} from '../../../redux/mbtiSlice';

function UserProfile() {
  const navigate = useNavigate();
  const [formattedDate, setFormattedDate] = useState();

  //trạng thái đóng/ mở modal
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [openOtp, setOpenOtp] = useState(false);
  const [otpType, setOtpType] = useState('email');

  const [content, setContent] = useState(null);
  const [selectedKey, setSeletedKey] = useState();
  //gọi redux
  const sentOtp = useSelector(selectIsOtp);
  const dispatch = useDispatch();
  const getProfile = useSelector(selectLoginData);
  // const dataHistory = useSelector(selectMbtiQuestions);
  const { role, status } = useSelector((state) => state.auth);
  const { pending, historyPargams, dataHistory, major } = useSelector((state) => state.mbti);
  const [renderedHistoryMBTI, setRenderedHistoryMBT] = useState(false);

  useEffect(() => {
    dispatch(getAllTestHistory(historyPargams));
    dispatch(getTestHistoryById(1));
    if (status === 0) {
      navigate('/404');
    }
    //định dạng ngày sinh hiển thị
    setFormattedDate(
      getProfile?.UserDetail?.birthday
        ? format(new Date(getProfile?.UserDetail.birthday), 'dd/MM/yyyy')
        : 'dd/MM/yyyy',
    );
    if (sentOtp) {
      setOpen(false);
      dispatch(isOtp(false));
      setOpenOtp(true);
    }
  }, [dispatch, openOtp, open, sentOtp, getProfile]);

  useEffect(() => {
    // console.log(major);
  }, [major]);

  useEffect(() => {
    if (!pending && major?.length) {
      // Đã fetch xong data và component đã render
      setRenderedHistoryMBT(true);
    }
    console.log();
  }, [pending, dataHistory, major]);

  const handleView = (id) => {
    setOpen1(true);
    console.log('select History id', id);
    dispatch(getTestHistoryById(id));
  };
  const columns = [
    {
      title: 'Thời Gian',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '33%',
      render: (createdAt) => format(new Date(createdAt), 'dd/MM/yyyy HH:mm'),
    },
    {
      title: 'Kết quả',
      dataIndex: 'MBTI',
      key: 'MBTI.name',
      width: '33%',
      render: (record) => record.name,
    },
    {
      key: 'view',
      width: '33%',
      render: (_, record) => (
        <>
          <div className="author-info">
            <Button
              style={{ display: 'flex', justifyContent: 'center' }}
              onClick={() => handleView(record.id)}
            >
              <ViewIconStyled>
                <EyeOutlined style={{ fontSize: `20px !important` }} /> Xem kết quả
              </ViewIconStyled>
            </Button>
          </div>
        </>
      ),
    },
  ];

  // const convertDataSource =
  //   getAllTestHistory?.data?.map((item) => ({
  //     key: item.id,
  //     id: item.id,
  //     createdAt: item.createdAt,
  //     MBTI: item.MBTI.name,
  //   })) || [];

  return (
    <MarginTopContent className="container">
      <Row gutter={[16, 16]} justify="center">
        <Col xs={20} sm={20} md={20} lg={10}>
          <Card>
            <ProfileHeader>
              {getProfile?.UserDetail.avatar && getProfile?.UserDetail.avatar != null ? (
                <img src={getProfile?.UserDetail.avatar} alt="avatar" />
              ) : (
                <img src="./images/pngegg.png" alt="avatar" />
              )}

              {/* <h4>{getInfo?.fullName}</h4> */}

              <div className="text-header">
                <p className="full-name">{getProfile?.UserDetail?.fullName}</p>
                <p>
                  Giới tính:{' '}
                  {getProfile?.UserDetail?.gender === 1 ? (
                    <span>
                      <ManOutlined style={{ color: `var(--primary-color)`, fontSize: `15px` }} />
                    </span>
                  ) : getProfile?.UserDetail?.gender === 2 ? (
                    <span>
                      <WomanOutlined
                        style={{ color: `var(--secondary-color)`, fontSize: `15px` }}
                      />
                    </span>
                  ) : getProfile?.UserDetail?.gender === 0 ? (
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
            <hr
              style={{
                border: `1px solid transparent`,
                borderColor: 'rgb(217, 217, 217)',
                marginTop: 20,
              }}
            />
            <BodyContent>
              {/* <Descriptions>
                <Descriptions.Item
                  label={
                    <Space>
                      <PhoneOutlined
                        className="profile-icon"
                        style={{ color: 'var(--primary-color)' }}
                      />
                      <span>SĐT</span>{' '}
                    </Space>
                  }
                  span={3}
                >
                  {getProfile?.phone}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <Space>
                      <MailOutlined
                        className="profile-icon"
                        style={{ color: 'var(--primary-color)' }}
                      />
                      <span>Email</span>{' '}
                    </Space>
                  }
                  span={3}
                >
                  {getProfile?.email}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <Space>
                      <HomeOutlined
                        className="profile-icon"
                        style={{ color: 'var(--primary-color)' }}
                      />
                      <span>Địa chỉ</span>{' '}
                    </Space>
                  }
                  span={3}
                >
                  {getProfile?.UserDetail?.address}, {getProfile?.UserDetail?.addressDetail}
                </Descriptions.Item>
              </Descriptions> */}
              <Row style={{ marginTop: 20 }}>
                <Col span={24}>
                  <p>
                    <PhoneOutlined
                      className="profile-icon"
                      style={{ color: 'var(--primary-color)' }}
                    />{' '}
                    - Điện Thoại
                  </p>
                  <p className="underline">{getProfile?.phone}</p>
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
                  <p className="underline">{getProfile?.email}</p>
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
                    {getProfile?.UserDetail?.address}, {getProfile?.UserDetail?.addressDetail}
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
        <Col xs={20} sm={20} md={20} lg={10}>
          <Card>
            <HistoryHeader>
              <h3>Lịch sử test MBTI</h3>
              <Button onClick={() => navigate('/mbti-test')}>Kiểm tra MBTI</Button>
            </HistoryHeader>

            <Table
              loading={pending}
              dataSource={dataHistory?.data}
              columns={columns}
              pagination={false}
            />
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
        <RequestOtp type={otpType} userId={getProfile?.UserDetail.id} sentOtp={sentOtp} />
      </Modal>
      {/*  */}
      <Modal
        title={'Kết quả'}
        centered
        open={open1}
        onCancel={() => setOpen1(false)}
        footer={null}
        width={500}
        style={{ overflowY: 'auto' }}
      >
        {/* <img src={`${getAllTestHistory?.data.}`} alt="mbtitype" /> */}

        {/* gọi api */}
        {renderedHistoryMBTI && (
          <>
            <div className="mbti-description">
              <h3 style={{ color: 'var(--primary-color)' }}>{major.MBTI.MajorMBTIs.name}</h3>
              <p>{major.MBTI.MajorMBTIs.description}</p>
            </div>
            <h3>Công việc phù hợp với {major.MBTI.MajorMBTIs.name}</h3>
            <div>
              <ul style={{ padding: 10 }}>
                {major.MBTI.MajorMBTIs.map((majorMBTI) => (
                  <li key={majorMBTI.id}>{majorMBTI.majorName}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </Modal>
    </MarginTopContent>
  );
}

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

const ViewIconStyled = styled.div`
  .anticon-eye {
    width: 20px !important;
    svg {
      width: 20px !important;
      font-size: 20px !important;
    }
  }
`;
export default UserProfile;
