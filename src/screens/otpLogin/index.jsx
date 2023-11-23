import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Space, Spin, message } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import RequestOtp from '../../components/requestOtp';
import {
  isOtp,
  requestOtp,
  selectIsOtp,
  selectLoginData,
  selectPending,
  selectSignupData,
  setIsSignup,
} from '../../redux/authSlice';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../../firebase/config';

function OtpLogin() {
  const dispatch = useDispatch();

  const [otpType, setOtpType] = useState('email');
  const [phone, setPhone] = useState('');
  const [hasPhone, setHasPhone] = useState(true);
  const [mail, setMail] = useState('');
  const [userId, setUserId] = useState('');

  const [open, setOpen] = useState(false); //thay đối giá trị đóng mở của của sổ
  const [loadinpage, setloadinpage] = useState(false);

  const getSignupData = useSelector(selectSignupData); //lấy thông tin người dùng đăng ký trong local storage
  const getUserData = useSelector(selectLoginData); //lấy thông tin người dùng đăng ký trong local storage

  //gọi redux
  let pending = useSelector(selectPending);
  const sentOtp = useSelector(selectIsOtp);

  const handleOnclick = (type) => {
    setOtpType(type);

    if (getSignupData === null || getSignupData === undefined) {
      setUserId(getUserData?.userData.UserDetail.id);
    } else {
      setUserId(getSignupData?.id);
    }
    // const getUserID = getSignupData?.id;
    const requestData = {
      userId: userId,
      type: type,
    };
    console.log(requestData);

    dispatch(requestOtp(requestData));

    if (type === 'phone') {
      signin();
      setOpen(true);
      setloadinpage(true);
      // Add a timeout to stop spinning after 3 seconds
      setTimeout(() => {
        setloadinpage(false);
      }, 3000);
    }
  };
  // otp bằng số điện thoại
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('INPUT_PHONE_NUMBER');
  const [result, setResult] = useState('');

  // setPhoneNumber(`+84${phone.substring(1)}`);
  const signin = () => {
    try {
      console.log('bắt đầu gửi OTP qua sđt');
      message.success('Đã gửi OTP qua sđt', 3);
      if (phoneNumber === '') return;

      let verify = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });

      signInWithPhoneNumber(auth, phoneNumber, verify)
        .then((result) => {
          console.log('result: ', result);
          setResult(result);
          setStep('VERIFY_OTP');
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log('hết hạn');
    }
  };

  useEffect(() => {
    setloadinpage(pending && pending != null ? true : false);
    if (getSignupData?.email === null || getSignupData?.email === undefined) {
      setMail(getUserData?.userData.email);
      setPhone(getUserData?.userData.phone);
      setUserId(getUserData?.userData.UserDetail.id);
    } else {
      setMail(getSignupData?.email);
      setPhone(getSignupData?.phone);
      setUserId(getSignupData?.id);
    }

    if (phone != null && phone !== undefined && phone !== '') {
      setHasPhone(false);
    }

    dispatch(setIsSignup(false)); // Chỉ dispatch khi chưa dispatch lần nào
    if (sentOtp) {
      setOpen(true);
      dispatch(isOtp(false));
    }
  }, [pending, loadinpage, open, sentOtp, dispatch, phone, mail]);
  // console.log(`+84${phone.substring(1)}`);
  return (
    <Spin spinning={loadinpage}>
      <Container>
        {/* dùng toán tử 3 ngôi thay đổi của sổ khi giá trị open thây đổi */}
        {open === false ? (
          <Card style={{ boxShadow: `rgba(0, 0, 0, 0.24) 0px 3px 8px` }}>
            <div className="box">
              <h3 className="box-title">Lấy mã xác nhận</h3>
              <div className="group-btn-send-otp">
                <Space direction="vertical" size="middle">
                  <p>
                    Otp sẽ được gửi qua mail:{' '}
                    <u style={{ color: `var(--secondary-color)` }}>{mail}</u>
                  </p>
                  {!hasPhone ? (
                    <div>
                      Otp sẽ được gửi qua SĐT:{' '}
                      <u style={{ color: `var(--secondary-color)` }}> {phone}</u>
                      {/* {step === 'INPUT_PHONE_NUMBER' && (
                        <div>
                          <input
                            value={phoneNumber}
                            onChange={(e) => {
                              setPhoneNumber(e.target.value);
                            }}
                            placeholder="phone number"
                          />
                          <br />
                          <br />
                          <div id="recaptcha-container"></div>
                          <button onClick={signin}>Send OTP</button>
                        </div>
                      )} */}
                    </div>
                  ) : (
                    <p>Hiện bạn chưa cập nhật số điện thoại</p>
                  )}
                </Space>
                <Button type="primary" onClick={() => handleOnclick('email')}>
                  Gửi qua mail
                </Button>

                <Button
                  type="primary"
                  disabled={hasPhone}
                  danger
                  onClick={() => handleOnclick('phone')}
                >
                  Gửi qua SĐT
                </Button>

                <Button
                  type="primary"
                  disabled={hasPhone}
                  danger
                  onClick={() => handleOnclick('phone')}
                >
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
                onClick={() => setOpen(!open)}
              >
                <CloseOutlined />
              </Button>
            </div>
            <RequestOtp type={otpType} userId={userId} sentOtp={sentOtp} />
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

const OtpRequestCard = styled.div``;

export default OtpLogin;
