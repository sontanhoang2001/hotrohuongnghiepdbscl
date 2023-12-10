import { Button, Form, Input } from 'antd';
import { InputOTP } from 'antd-input-otp';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { changePasswordAsync } from '../../redux/authSlice';

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

function ChangePassword() {
  const [form] = Form.useForm();

  //gọi redux
  const dispatch = useDispatch();

  const handleFinish = (value) => {
    dispatch(changePasswordAsync(value));
  };

  return (
    <ChangePwd>
      <main>
        <section className="request-otp-box">
          <Form
            {...formItemLayout}
            form={form}
            initialValues={{
              oldPassword: '',
              newPassword: '',
            }}
            onFinish={handleFinish}
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
        </section>
      </main>
    </ChangePwd>
  );
}

const ChangePwd = styled.div``;

export default ChangePassword;
