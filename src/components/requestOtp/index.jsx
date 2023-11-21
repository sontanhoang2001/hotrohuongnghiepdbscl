import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Spin, message } from 'antd';
import { InputOTP } from 'antd-input-otp';
import styled from 'styled-components';
import { authOTP } from '../../redux/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../../firebase/config';

function RequestOtp(props) {
  const { type, userId, sentOtp } = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(type);
  const [step, setStep] = useState('INPUT_PHONE_NUMBER');
  const [result, setResult] = useState('');

  //hàm xác thựcn otp bằng số điện thoại
  const ValidateOtpByPhone = (otp) => {
    try {
      console.log('Xác thực OTP từ ng dùng');

      if (otp === null) return;

      result
        .confirm(otp)
        .then((result) => {
          setStep('VERIFY_SUCCESS');
        })
        .catch((err) => {
          console.log('Incorrect code');
          message.success('Nhập sai mã OTP', 3);
        });
    } catch (error) {
      console.log('hết hạn');
      message.success('Otp quá hạn', 3);
    }
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
    const formData = {
      userId: props.userId,
      type: props.type,
      otpCode: otpString,
    };
    console.log(formData);
    if (type === 'email') {
      dispatch(authOTP(formData));
    }
    if (type === 'phone') {
      ValidateOtpByPhone(sentOtp);
    }
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

            <Form.Item noStyle>
              <Button block htmlType="submit" type="primary" className="otp-send-btn">
                Gửi
              </Button>
            </Form.Item>

            <Form.Item noStyle>
              <Button block className="otp-resend-btn">
                gửi lại mã xác thực
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
