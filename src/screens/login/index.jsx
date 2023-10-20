import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../../api/auth';
import { useEffect } from 'react';
import { useState } from 'react';
function Login() {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  //default value
  const [account, setAccount] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    const fethApi = async () => {
      try {
        console.log('test');
        const result = await authApi.login({
          username: 'sontanhoang',
          password: '123456',
        });

        console.log('result', result);
        window.localStorage?.setItem('access_token', result.data.data.accessToken);
      } catch (error) {
        console.log('error', error);
      }
    };

    fethApi();
  }, []);

  return (
    <Background>
      <LoginForm>
        <div className="box">
          <h3>đăng nhập</h3>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Tên Đăng Nhập"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Mật Khẩu"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>lưu đăng nhập</Checkbox>
              </Form.Item>
              <Link className="login-form-forgot f-link" to="/quen-mat-khau">
                Quên Mật Khẩu
              </Link>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" danger>
                Log in
              </Button>{' '}
              <Link className="f-link" to="/dang-ky">
                Đăng Ký Ngay!
              </Link>
            </Form.Item>
          </Form>
        </div>
      </LoginForm>
    </Background>
  );
}
const Background = styled.div`
  background-color: #d9afd9;
  background-image: linear-gradient(0deg, #d9afd9 0%, #97d9e1 100%);
  min-height: 100vh;
`;
const LoginForm = styled.div`
  width: 100%;
  margin: auto;
  height: 100%;
  padding-top: 100px;
  .box {
    width: 600px;
    margin-left: auto;
    margin-right: auto;

    /* border: 1px solid rgba(240, 46, 170, 0.4); */
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background-color: #ffffff;
    padding: 15px 30px;
    border-radius: 15px;
    h3 {
      text-align: center;
      text-transform: capitalize;
      margin-top: 10px;
      margin-bottom: 15px;
    }
    form {
      margin: auto;
      a {
        text-decoration: none;
        color: var(--text-color);
      }
      .f-link {
        color: blue;
        border-bottom: 1px solid blue;
        line-height: 10px;
        &:hover {
          color: var(--secondary-color);
          border-color: var(--secondary-color);
        }
      }
    }
  }
`;

export default Login;
