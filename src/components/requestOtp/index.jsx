import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Spin, message } from 'antd';
import { InputOTP } from 'antd-input-otp';
import styled from 'styled-components';
import { selectLoginData, authOTP } from '../../redux/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../../firebase/config';

function RequestOtp(props) {
  const getUserData = useSelector(selectLoginData); //lấy thông tin người dùng đăng ký trong local storage

  const { type, userId, sentOtp, phone } = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState('INPUT_PHONE_NUMBER');
  const [result, setResult] = useState('');

  useEffect(() => {
    if (type === 'phone') {
      let phoneNumber = `+84${phone.substring(1)}`;
      console.log('bắt đầu gửi OTP qua sđt: ', phoneNumber);
      signin(phoneNumber);
    }
  }, [type]);

  const signin = (phoneNumber) => {
    try {
      if (phoneNumber === '') return;

      let verify = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });

      signInWithPhoneNumber(auth, phoneNumber, verify)
        .then((result) => {
          console.log('result: ', result);
          setResult(result);
          // setStep('VERIFY_OTP');

          // Xác thực thành công thì gọi API server của mình để cập nhật trạng thái active cho account
          // gọi api => authOTP  ở đây

          //   {
          //     "userId" : 14,
          //     "type" : "phone",
          //     "otpCode": ""
          // }
          // gọi api => authOTP thành công thì chuyển hướng, cái này tùy anh code
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
    if (sentOtp) {
      localStorage.removeItem('userSignupData');
      if (location.pathname === '/xac-nhan-dang-nhap') {
        navigate('/dang-nhap');
      }
    }
  }, [sentOtp, navigate, location]);

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
    if (getUserData.userData.id) {
      if (type === 'email') {
        console.log('userId', getUserData.userData.id);

        const formData = {
          userId: getUserData.userData.id,
          type: props.type,
          otpCode: otpString,
        };

        dispatch(authOTP(formData));
      } else if (type === 'phone') {
        const formData = {
          userId: props.userId,
          type: props.type,
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
    message.error('Xác thực OTP thất bại!', 3);
  };

  return (
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
  );
}

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

export default RequestOtp;
