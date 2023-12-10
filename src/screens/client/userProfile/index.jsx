import { Card, Table, Button, Modal, Row, Col, Space, Radio, message, Form, Input } from 'antd';
import {
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  EyeOutlined,
  ManOutlined,
  WomanOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  authChangeEmailAsync,
  authChangePhone,
  authOTP,
  changePasswordAsync,
  isOtp,
  requestOtp,
  selectIsOtp,
  selectLoginData,
} from '../../../redux/authSlice';
import { MarginTopContent } from '../../../globalStyles';
import { useNavigate } from 'react-router-dom';
import { getAllTestHistory, getTestHistoryById } from '../../../redux/mbtiSlice';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../../../firebase/config';
import { InputOTP } from 'antd-input-otp';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

function UserProfile() {
  const navigate = useNavigate();
  const [formattedDate, setFormattedDate] = useState();
  const [result, setResult] = useState('');
  const [otpType, setOtpType] = useState('email');
  const [form] = Form.useForm();
  const [editPassword, setEditPassword] = useState(false);
  const [formEidtValue, setFormEditValue] = useState({});
  //trạng thái đóng/ mở modal
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [openOtp, setOpenOtp] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [beginSendOTP, setBeginSendOTP] = useState(false); //thay đối giá trị đóng mở của của sổ

  //gọi redux
  const sentOtp = useSelector(selectIsOtp);
  const dispatch = useDispatch();
  const getProfile = useSelector(selectLoginData);
  const getUserData = useSelector(selectLoginData); //lấy thông tin người dùng đăng ký trong local storage
  const authOtpSuccess = useSelector(selectIsOtp);

  // const dataHistory = useSelector(selectMbtiQuestions);
  const { role, status } = useSelector((state) => state.auth);
  const { pending, historyPargams, dataHistory, major } = useSelector((state) => state.mbti);

  useEffect(() => {
    dispatch(getAllTestHistory(historyPargams));
    dispatch(getTestHistoryById(1));
    if (status === 0) {
      navigate('/404');
    }
    if (sentOtp) {
      setOpen(false);
      dispatch(isOtp(false));
      setOpenOtp(true);
    }
  }, [dispatch, openOtp, open, sentOtp, getProfile]);

  // useEffect(() => {
  //   if (authOtpSuccess === true) {
  //     setOpenEdit(true);
  //   }
  // }, [authOtpSuccess]);

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

  const handleSendOTP = () => {
    if (otpType === 'email') {
      setBeginSendOTP(true);
      // console.log('send email...');
      const requestData = {
        userId: getUserData.id,
        type: otpType,
      };

      dispatch(requestOtp(requestData));
    } else if (otpType === 'phone') {
      setBeginSendOTP(true);

      let phoneNumber = `+84${getUserData?.phone.substring(1)}`;
      // console.log('bắt đầu gửi OTP qua sđt: ', phoneNumber);
      setTimeout(() => {
        signin(phoneNumber);
      }, 5000);
    }
  };

  const signin = (phoneNumber) => {
    try {
      if (phoneNumber === '') return;

      let verify = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });

      signInWithPhoneNumber(auth, phoneNumber, verify)
        .then((result) => {
          // console.log('result: ', result);
          setResult(result);
        })
        .catch((err) => {
          console.log('error o trong', err);

          console.log(err);
        });
    } catch (error) {
      console.log('error', error);
      console.log('hết hạn');
      message.error('Gửi mã xác thực OTP đã hết hạn!', 3);
    }
  };

  //hàm xác thựcn otp bằng số điện thoại
  const ValidateOtpByPhone = (otp) => {
    if (otp.length < 6) {
      message.error('Bạn chưa nhập đủ mã OTP', 3);
    }

    if (otp === null) return;

    return new Promise((resolve, reject) => {
      return result
        .confirm(otp)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          // console.log('Incorrect code');
          reject(err);
        });
    });
  };
  //hàm sử lý khi người dùng submit
  const handleFinishOtp = (values) => {
    // The value will be array of string
    // Check the field if there is no value, or value is undefined/empty string
    const { otp } = values;

    //kiểm tra otp có đúng định dạng hay không
    //khác undefined
    //khác chuỗi rỗng
    //khác null
    if (!otp || otp.includes(undefined) || otp.includes('')) {
      return form.setFields([
        {
          name: 'otp',
          errors: ['mã xác nhận không hợp lệ!!!'],
        },
      ]);
    }

    //chuyển đổi mảng otp sang chuỗi
    const otpString = otp.join('');

    // tạo giá trị request cho api
    if (getUserData.id) {
      if (otpType === 'email') {
        console.log('userId', getUserData?.id);

        const formData = {
          userId: getUserData?.id,
          type: otpType,
          otpCode: otpString,
        };
        setOpenOtp(false);
        if (editPassword) {
          dispatch(authOTP(formData)).then(() => {
            setOpenOtp(false);
          });
        } else {
          if (formEidtValue.newEmail !== '' && formEidtValue.newEmail !== getProfile?.email) {
            setOpenOtp(false);
            dispatch(authOTP(formData)).then(() => {
              dispatch(authChangeEmailAsync(formEidtValue.newEmail));
            });

            dispatch(isOtp(false));
          }
        }
      } else if (otpType === 'phone') {
        const formData = {
          userId: getUserData?.id,
          type: otpType,
          otpCode: '',
        };
        // Update status active for user
        ValidateOtpByPhone(otpString)
          .then((result) => {
            if (result) {
              if (editPassword) {
                dispatch(authOTP(formData)).then(() => {
                  setOpenOtp(false);
                });
              } else {
                if (formEidtValue.newPhone !== '' && formEidtValue.newPhone !== getProfile?.phone) {
                  setOpenOtp(false);
                  dispatch(authOTP(formData)).then(() => {
                    dispatch(authChangePhone(formEidtValue.newPhone));
                  });

                  dispatch(isOtp(false));
                }
              }
            }
          })
          .catch(() => {
            message.error('Xác thực OTP thất bại!', 3);
          });
      }
    }
  };

  const handleFinishChangePassWord = (value) => {
    dispatch(changePasswordAsync(value)).then(() => {
      setOpenEdit(false);
      setEditPassword(false);
    });
  };
  const handleFinishEdit = (value) => {
    setFormEditValue(value);
    setOpenEdit(false);
    setOpenOtp(true);
  };

  return (
    <MarginTopContent className="container">
      <Row gutter={[16, 16]} justify="center">
        <Col xs={20} sm={20} md={20} lg={10}>
          <Card>
            <ProfileHeader>
              {getProfile?.UserDetail.avatar && getProfile?.UserDetail.avatar != null ? (
                <img src={getProfile.UserDetail.avatar} alt="avatar" />
              ) : (
                <img src="./images/pngegg.png" alt="avatar" />
              )}

              {/* <h4>{getInfo?.fullName}</h4> */}

              <div className="text-header">
                <p className="full-name">{getProfile?.UserDetail?.fullName}</p>
                <p>
                  Giới tính:{' '}
                  {getProfile && getProfile.UserDetail.gender === 1 ? (
                    <span>
                      <ManOutlined style={{ color: `var(--primary-color)`, fontSize: `15px` }} />
                    </span>
                  ) : getProfile.UserDetail.gender === 2 ? (
                    <span>
                      <WomanOutlined
                        style={{ color: `var(--secondary-color)`, fontSize: `15px` }}
                      />
                    </span>
                  ) : getProfile.UserDetail.gender === 0 ? (
                    <>🏳️‍🌈</>
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
                  <Button
                    type="primary"
                    danger
                    block
                    onClick={() => {
                      setOpenOtp(true);
                      setEditPassword(true);
                    }}
                  >
                    Đổi mật khẩu
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    type="primary"
                    block
                    onClick={() => {
                      setOpenEdit(true);
                      setEditPassword(false);
                    }}
                  >
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
      {/* xác thực otp */}
      <Modal
        centered
        open={openOtp}
        onCancel={() => {
          setOpenOtp(false);
          setBeginSendOTP(false);
        }}
        footer={null}
      >
        {beginSendOTP === false ? (
          <div className="box">
            <h3 className="box-title">Xác thực OTP</h3>
            <div className="group-btn-send-otp">
              <Space direction="vertical" size="middle">
                <p>Otp sẽ được gửi qua :</p>
                <Radio.Group onChange={(e) => setOtpType(e.target.value)} value={otpType}>
                  <Space direction="vertical">
                    {getUserData.email && (
                      <Radio value={'email'}>
                        email:{' '}
                        <span style={{ color: `var(--secondary-color)` }}>{getUserData.email}</span>
                      </Radio>
                    )}
                    {getUserData.phone && (
                      <Radio value={'phone'}>
                        số điện thoại:{' '}
                        <span style={{ color: `var(--secondary-color)` }}>{getUserData.phone}</span>
                      </Radio>
                    )}
                  </Space>
                </Radio.Group>
              </Space>
              <Row gutter={[16, 8]} style={{ marginTop: '1rem' }}>
                <Col span={24}>
                  <Button
                    type="primary"
                    disabled={!getUserData?.email}
                    block
                    onClick={() => handleSendOTP()}
                  >
                    Nhận mã xác thực
                  </Button>
                </Col>
                <Col span={24}>
                  <Button
                    type="primary"
                    block
                    danger
                    onClick={() => {
                      setOpenOtp(false);
                      setBeginSendOTP(false);
                    }}
                  >
                    Huỷ
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        ) : (
          <div className="box" style={{ padding: 20 }}>
            <div>
              <main>
                <section className="request-otp-box">
                  <h2 className="otp-title" style={{ marginBottom: 20 }}>
                    Nhập mã xác nhận
                  </h2>
                  <Form form={form} onFinish={handleFinishOtp}>
                    <Form.Item
                      name="otp"
                      className="center-error-message"
                      rules={[{ validator: async () => Promise.resolve() }]}
                    >
                      <InputOTP name="otp" autoFocus inputType="numeric" length={6} />
                    </Form.Item>
                    <div id="recaptcha-container"></div>
                    <Form.Item noStyle>
                      <Button block htmlType="submit" type="primary" className="otp-send-btn">
                        Gửi
                      </Button>
                    </Form.Item>
                  </Form>
                </section>
              </main>
            </div>
          </div>
        )}
      </Modal>
      {/*  */}
      {/*Hiển thị kết quả */}
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
        {major && (
          <>
            <div className="mbti-description">
              <h3 style={{ color: 'var(--primary-color)' }}>{major.MBTI.name}</h3>
              <p>{major.MBTI.description}</p>
            </div>
            <h3>Công việc phù hợp với {major.MBTI.name}</h3>
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
      {/* */}
      {/* modal edit */}
      <Modal
        title={<>{(editPassword && 'Đổi mật khẩu') || 'Cập nhật thông tin'}</>}
        centered
        open={openEdit}
        onCancel={() => {
          setOpenEdit(false);
          setEditPassword(false);
        }}
        footer={null}
        width={500}
        style={{ overflowY: 'auto' }}
      >
        {editPassword ? (
          <Form
            {...formItemLayout}
            form={form}
            initialValues={{
              oldPassword: '',
              newPassword: '',
            }}
            onFinish={handleFinishChangePassWord}
          >
            {/* ----------------begin old password---------------- */}
            <Form.Item
              name="oldPassword"
              label="Mật Khẩu Cũ"
              rules={[
                {
                  required: true,
                  message: 'bạn chưa nhập mật khẩu',
                },
                {
                  max: 40,
                  message: 'mật khẩu không quá 40 ký tự',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            {/* ----------------end old password---------------- */}
            {/* ----------------begin new password---------------- */}
            <Form.Item
              name="newPassword"
              label="Mật Khẩu Mới"
              rules={[
                {
                  required: true,
                  message: 'bạn chưa nhập mật khẩu',
                },
                {
                  max: 40,
                  message: 'mật khẩu không quá 40 ký tự',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('oldPassword') !== value) {
                      return Promise.resolve(); // Mật khẩu mới không trùng với mật khẩu cũ
                    }
                    return Promise.reject(new Error('Mật khẩu mới không thể giống mật khẩu cũ'));
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            {/* ----------------end new password---------------- */}
            <Form.Item noStyle>
              <Button block htmlType="submit" type="primary">
                Ok
              </Button>
            </Form.Item>
          </Form>
        ) : (
          // form cập nhật thông tin
          <Form
            {...formItemLayout}
            form={form}
            initialValues={{
              newEmail: getProfile?.email,
              newPhone: getProfile?.phone,
            }}
            onFinish={handleFinishEdit}
          >
            {/* ----------------begin newEmail---------------- */}
            <Form.Item
              name="newEmail"
              label="Email mới"
              rules={[
                {
                  type: 'email',
                  message: 'Email của không hợp lệ',
                },
                {
                  max: 255,
                  message: 'email không quá 255 ký tự',
                },
                // ({ getFieldValue }) => ({
                //   validator(_, value) {
                //     if (!value || getFieldValue('oldEmail') !== value) {
                //       return Promise.resolve(); // Mật khẩu mới không trùng với mật khẩu cũ
                //     }
                //     return Promise.reject(new Error('Email mới không thể giống Email hiện tại'));
                //   },
                // }),
              ]}
            >
              <Input />
            </Form.Item>
            {/* ----------------end newEmail---------------- */}
            {/* ----------------begin newPhone---------------- */}
            <Form.Item
              name="newPhone"
              label="SĐT mới"
              rules={[
                {
                  min: 10,
                  message: 'Sđt chưa đủ 10 số',
                },
                {
                  max: 10,
                  message: 'Độ dài sdt không quá 10 số',
                },
                {
                  pattern: /^\d+$/,
                  message: 'Số điện thoại phải là số',
                },
                // ({ getFieldValue }) => ({
                //   validator(_, value) {
                //     if (!value || getFieldValue('oldPhone') !== value) {
                //       return Promise.resolve(); // Mật khẩu mới không trùng với mật khẩu cũ
                //     }
                //     return Promise.reject(new Error('SĐT mới không thể giống SĐT hiện tại'));
                //   },
                // }),
              ]}
            >
              <Input />
            </Form.Item>
            {/* ----------------end newPhone---------------- */}
            <Form.Item noStyle>
              <Button block htmlType="submit" type="primary">
                Ok
              </Button>
            </Form.Item>
          </Form>
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
