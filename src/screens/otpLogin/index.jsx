import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, message } from 'antd';
import { InputOTP } from 'antd-input-otp';
import styled from 'styled-components';

function OtpLogin() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  //hàm sử lý khi người dùng submit
  const handleFinish = (values) => {
    // The value will be array of string
    // Check the field if there is no value, or value is undefined/empty string
    const otp_test = '1234';
    const { otp } = values;
    let result;
    if (!otp || otp.includes(undefined) || otp.includes('')) {
      return form.setFields([
        {
          name: 'otp',
          errors: ['mã xác nhận không hợp lệ!!!'],
        },
      ]);
    }
    const otpString = values.otp.join('');

    console.log(`OTP: ${otpString}`);
  };

  return (
    <OtpContainer>
      <main className="app">
        <section className="card">
          <h2 className="otp-title">nhập mã xác nhận</h2>
          <Form form={form} onFinish={handleFinish}>
            <Form.Item
              name="otp"
              className="center-error-message"
              rules={[{ validator: async () => Promise.resolve() }]}
            >
              <InputOTP autoFocus inputType="numeric" length={4} />
            </Form.Item>

            <Form.Item noStyle>
              <Button block htmlType="submit" type="primary" className="otp-send-btn">
                gửi
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
  background-color: #f2f9ff;
  min-height: 100vh;
  display: flex;
  gap: 2rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .card {
    background-color: #ffffff;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
    padding: 2rem;
    min-width: 384px;
    border-radius: 0.5rem;
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
    }
  }
`;

export default OtpLogin;
