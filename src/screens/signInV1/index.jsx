import React, { Component, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Row, Col, Typography, Form, Input, Switch, Spin } from 'antd';
import signinbg from '../../assets/images/img-signin.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoginData, selectPending, signinAsync } from '../../redux/authSlice';
import Header from '../../components/header';
function onChange(checked) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;
const { Footer, Content } = Layout;
const template = [
  <svg
    data-v-4ebdc598=""
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      data-v-4ebdc598=""
      d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
      fill="#111827"
      className="fill-muted"
    ></path>
    <path
      data-v-4ebdc598=""
      d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
      fill="#111827"
      className="fill-muted"
    ></path>
    <path
      data-v-4ebdc598=""
      d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
      fill="#111827"
      className="fill-muted"
    ></path>
  </svg>,
];

const signup = [
  <svg
    data-v-4ebdc598=""
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      data-v-4ebdc598=""
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 2C5.44772 2 5 2.44772 5 3V4H4C2.89543 4 2 4.89543 2 6V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V6C18 4.89543 17.1046 4 16 4H15V3C15 2.44772 14.5523 2 14 2C13.4477 2 13 2.44772 13 3V4H7V3C7 2.44772 6.55228 2 6 2ZM6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H14C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7H6Z"
      fill="#111827"
      className="fill-muted"
    ></path>
  </svg>,
];

function SignInV1() {
  const dispatch = useDispatch();

  let pendingState = useSelector(selectPending);
  const { role, status } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (status === 0) {
      navigate('/xac-nhan-dang-nhap');
    }
    //lấy role khi người dùng đăng nhập
    if (role && status === 1) {
      if (role === 'ADMIN') {
        navigate('/admin');
      } else if (role === 'ORGANIZATION') {
        navigate('/organization');
        window.location.reload();
      } else {
        navigate('/');
      }
    }
  }, [navigate, role, status]);
  console.log(status);

  const onFinish = (values) => {
    const { remember, ...inputedUserData } = values;
    const payload = inputedUserData;
    dispatch(signinAsync(payload));
  };
  return (
    <>
      <Layout className="layout-default layout-signin">
        <Header />
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col xs={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 2 }} md={{ span: 12 }}>
              <Title className="mb-15">Đăng Nhập</Title>
              <Title className="font-regular text-muted" level={5}>
                Nhập Email và mật khẩu để đăng nhập
              </Title>
              <Spin spinning={pendingState}>
                <Form
                  name="signin"
                  className="row-col"
                  initialValues={{
                    username: '',
                    password: '',
                    remember: true,
                  }}
                  onFinish={onFinish}
                  layout="vertical"
                  scrollToFirstError
                >
                  <Form.Item
                    className="username"
                    label="Tên Đăng Nhập"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: 'Chưa nhập tên đăng nhập',
                      },
                    ]}
                  >
                    <Input placeholder="Tên Đăng nhập" style={{ height: 50 }} />
                  </Form.Item>

                  <Form.Item
                    className="username"
                    label="Mật Khẩu"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Chưa nhập mật khẩu',
                      },
                    ]}
                  >
                    <Input.Password placeholder="Mật Khẩu" />
                  </Form.Item>

                  <Form.Item name="remember" className="aligin-center" valuePropName="checked">
                    <div>
                      <Switch defaultChecked onChange={onChange} />
                      <span style={{ marginLeft: 8 }}>Lưu Đăng Nhập</span>
                    </div>
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                      Đăng Nhập
                    </Button>
                  </Form.Item>
                  <p className="font-semibold text-muted">
                    Bạn chưa có tài khoản?{' '}
                    <Link to="/dang-ky" className="text-dark font-bold">
                      Đăng ký ngay
                    </Link>
                  </p>
                </Form>
              </Spin>
            </Col>
            <Col
              className="sign-img"
              style={{ padding: 12 }}
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
            >
              <img src={signinbg} alt="" />
            </Col>
          </Row>
        </Content>
        <Footer>
          <p className="copyright">Copyright © 2023 by Phan Huu Kiet</p>
        </Footer>
      </Layout>
    </>
  );
}

export default SignInV1;
