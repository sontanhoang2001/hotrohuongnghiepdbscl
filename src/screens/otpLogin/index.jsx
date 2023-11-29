import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, Radio, Row, Space, Spin, message, Form } from 'antd';
import { InputOTP } from 'antd-input-otp';
import { CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import {
  isOtp,
  logout,
  requestOtp,
  selectIsOtp,
  selectLoginData,
  selectPending,
  selectSignupData,
  setIsSignup,
  authOTP,
} from '../../redux/authSlice';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../../firebase/config';

function OtpLogin() {
  const [otpType, setOtpType] = useState('email');
  const [phone, setPhone] = useState('');
  const [loadinpage, setloadinpage] = useState(false);
  const [result, setResult] = useState('');
  const location = useLocation();
  const [form] = Form.useForm();

  const [beginSendOTP, setBeginSendOTP] = useState(false); //thay đối giá trị đóng mở của của sổ

  const navigate = useNavigate();
  //gọi redux
  const dispatch = useDispatch();

  const getSignupData = useSelector(selectSignupData); //lấy thông tin người dùng đăng ký trong local storage
  const getUserData = useSelector(selectLoginData); //lấy thông tin người dùng đăng ký trong local storage

  let pending = useSelector(selectPending);
  const authOtpSuccess = useSelector(selectIsOtp);

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

      let phoneNumber = `+84${getUserData.phone.substring(1)}`;
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

  useEffect(() => {
    if (authOtpSuccess === true) {
      localStorage.removeItem('userSignupData');
      navigate('/dang-nhap', { replace: true });
    }
  }, [authOtpSuccess]);

  //hàm sử lý khi người dùng submit
  const handleFinish = (values) => {
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

    console.log('getUserData.id', getUserData?.id);
    if (getUserData.id) {
      if (otpType === 'email') {
        console.log('userId', getUserData?.id);

        const formData = {
          userId: getUserData?.id,
          type: otpType,
          otpCode: otpString,
        };

        dispatch(authOTP(formData));
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
              dispatch(authOTP(formData));
            }
          })
          .catch(() => {
            message.error('Xác thực OTP thất bại!', 3);
          });
      }
    }
  };

  const handelCancelOtp = () => {
    navigate('/dang-ky');
    dispatch(logout());
  };
  // console.log(`+84${phone.substring(1)}`);
  return (
    <Spin spinning={loadinpage}>
      <Container>
        {/* dùng toán tử 3 ngôi thay đổi của sổ khi giá trị open thây đổi */}
        {beginSendOTP === false ? (
          <Card style={{ boxShadow: `rgba(0, 0, 0, 0.24) 0px 3px 8px` }}>
            <div className="box">
              <h3 className="box-title">Xác thực OTP</h3>
              <div className="group-btn-send-otp">
                <Space direction="vertical" size="middle">
                  <p>Otp sẽ được gửi qua :</p>
                  <Radio.Group onChange={(e) => setOtpType(e.target.value)} value={otpType}>
                    <Space direction="vertical">
                      {getUserData.phone && (
                        <Radio value={'email'}>
                          email:{' '}
                          <span style={{ color: `var(--secondary-color)` }}>
                            {getUserData.email}
                          </span>
                        </Radio>
                      )}
                      {getUserData.phone && (
                        <Radio value={'phone'}>
                          số điện thoại:{' '}
                          <span style={{ color: `var(--secondary-color)` }}>
                            {getUserData.phone}
                          </span>
                        </Radio>
                      )}
                    </Space>
                  </Radio.Group>
                </Space>
                <Row gutter={[16, 16]} style={{ marginTop: '1rem' }}>
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
                </Row>

                <Button type="primary" block danger onClick={() => handelCancelOtp()}>
                  Huỷ
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <OtpRequestCard className="box">
            <div className="box-header">
              <Button
                type="link"
                shape="round"
                className="close-btn"
                onClick={() => setBeginSendOTP(!beginSendOTP)}
              >
                <CloseOutlined />
              </Button>
            </div>
            {/* <RequestOtp type={otpType} userId={userId} sentOtp={sentOtp} phone={phone} /> */}
            <OtpContainer>
              <main>
                <section className="request-otp-box">
                  <h2 className="otp-title">nhập mã xác nhận</h2>
                  <Form form={form} onFinish={handleFinish}>
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
            </OtpContainer>
          </OtpRequestCard>
        )}
      </Container>
    </Spin>
  );
}
const Container = styled.div`
  background-color: #f2f9ff;
  min-height: 100vh;
  display: flex;
  gap: 2rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .box {
    /* text-align: center; */
    width: 384px;
    position: relative;
    transition: all 10s ease-out;
    h3 {
      text-align: center;
      text-transform: uppercase;
    }
    .box-header {
      width: 100%;
      text-align: right;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, 0);
      .close-btn {
        font-size: 1.6rem;
      }
    }

    .group-btn-send-otp {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      .ant-btn {
        margin-top: 10px;
        margin-left: 5px;
        margin-right: 5px;
      }
    }
  }
`;

const OtpContainer = styled.div`
  .request-otp-box {
    align-items: center;
    .otp-title {
      text-align: center;
      text-transform: capitalize;
      margin: 0 0 2rem;
    }
    .input-classname {
      margin: 0 10px;
    }

    .wrapper-classname {
      gap: 4px;
      margin-bottom: 24px;
    }
    .center-error-message:where(.ant-form-item) .ant-form-item-explain-error {
      text-align: center;
    }
    .otp-send-btn,
    .otp-resend-btn {
      text-transform: capitalize;
      margin-top: 10px;
      margin-left: 5px;
      margin-right: 5px;
    }
    .g-btn-send-otp {
      display: flex;
      width: 100%;
    }
  }
`;

const OtpRequestCard = styled.div``;

export default OtpLogin;
