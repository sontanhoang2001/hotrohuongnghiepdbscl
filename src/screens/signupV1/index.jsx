import React, { Component, useEffect } from 'react';
import {
  Layout,
  Menu,
  Button,
  Typography,
  Card,
  Form,
  Input,
  Checkbox,
  Spin,
  Select,
  Cascader,
} from 'antd';
import logo1 from '../../assets/images/logos-facebook.svg';
import logo2 from '../../assets/images/logo-apple.svg';
import logo3 from '../../assets/images/Google__G__Logo.svg.png';

import { Link, useNavigate } from 'react-router-dom';
import {
  DribbbleOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSignup, selectPending, signupAsync } from '../../redux/authSlice';
import ProvincesOpenApi from '../../api/province';
import Header from '../../components/header';

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
const signin = [
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
    <path
      className="fill-muted"
      d="M12.25,14H1.75A1.752,1.752,0,0,1,0,12.25V3.5A1.752,1.752,0,0,1,1.75,1.75h.876V.875a.875.875,0,0,1,1.75,0V1.75h5.25V.875a.875.875,0,0,1,1.75,0V1.75h.875A1.752,1.752,0,0,1,14,3.5v8.75A1.752,1.752,0,0,1,12.25,14ZM3.5,4.375a.875.875,0,0,0,0,1.75h7a.875.875,0,0,0,0-1.75Z"
    />
  </svg>,
];

const { Option } = Select;
const residences = await ProvincesOpenApi();
function SignUpV1() {
  const navigate = useNavigate();
  // gọi redux
  const dispatch = useDispatch();
  let pendingState = useSelector(selectPending);
  const isSignup = useSelector(selectIsSignup);

  useEffect(() => {
    if (isSignup === true) {
      navigate('/xac-nhan-dang-nhap');
    }
  }, [isSignup, dispatch, pendingState, navigate]);
  const filter = (inputValue, path) =>
    path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  const onFinish = (values) => {
    const { agreement, confirm, ...inputedUserData } = values;
    console.log(values);
    //chuyển đổi giá trị submit from tại address từ mảng sang chuổi
    const addressString = inputedUserData.address.join(', ');
    inputedUserData.address = addressString;
    const payload = inputedUserData;
    dispatch(signupAsync(payload));
  };

  return (
    <>
      <div className="layout-default ant-layout layout-sign-up">
        <Header />

        <Content className="p-0">
          <div className="sign-up-header">
            <div className="content">
              <Title>Đăng Ký</Title>
            </div>
          </div>
          <Spin spinning={pendingState}>
            <Card
              className="card-signup header-solid h-full ant-card pt-0"
              title={<h5>Register With</h5>}
              bordered="false"
            >
              <div className="sign-up-gateways">
                <Button type="false">
                  <img src={logo1} alt="logo 1" />
                </Button>

                <Button type="false">
                  <img src={logo3} alt="logo 3" />
                </Button>
              </div>
              <p className="text-center my-25 font-semibold text-muted">Or</p>
              <Form
                name="register"
                initialValues={{
                  email: '',
                  phone: '',
                  password: '',
                  fullName: '',
                  gender: '',
                  address: '',
                  roleId: '',
                  agreement: true,
                }}
                onFinish={onFinish}
                scrollToFirstError
                className="row-col"
              >
                {/* ----------------begin mail---------------- */}
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: 'email',
                      message: 'Mail của không hợp lệ',
                    },
                    {
                      required: true,
                      message: 'Bạn chưa nhập email',
                    },
                  ]}
                >
                  <Input placeholder="Email" style={{ height: 50 }} />
                </Form.Item>
                {/* ----------------end mail---------------- */}
                {/* ----------------begin password---------------- */}
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Bạn chưa nhập mật khẩu',
                    },
                    {
                      max: 40,
                      message: 'Mật khẩu không quá 40 ký tự',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="Mật Khẩu" />
                </Form.Item>
                {/* ----------------end password---------------- */}
                {/* ----------------begin confirm password---------------- */}
                <Form.Item
                  name="confirm"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Hãy nhập Xác nhận mật khẩu',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Mật khẩu mới bạn nhập không khớp!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Nhập Lại Mật Khẩu" />
                </Form.Item>
                {/* ----------------end confirm password---------------- */}
                {/* ----------------begin fullName---------------- */}
                <Form.Item
                  name="fullName"
                  rules={[
                    {
                      required: true,
                      message: 'Bạn chưa nhập tên',
                    },
                    {
                      max: 120,
                      message: 'Độ dài tên không quá 120 ký tự',
                    },
                    {
                      pattern: /^[a-zA-ZÀ-ỹ ]+$/,
                      message: 'Không thể nhập số ở tên',
                    },
                  ]}
                >
                  <Input placeholder="Họ và Tên" style={{ height: 50 }} />
                </Form.Item>
                {/* ----------------end fullName---------------- */}
                {/* ----------------begin address---------------- */}
                <Form.Item
                  name="address"
                  rules={[
                    {
                      type: 'array',
                      required: true,
                      message: 'Hãy nhập địa chỉ của bạn',
                    },
                  ]}
                >
                  <Cascader
                    placeholder="Chọn Địa Chỉ"
                    options={residences}
                    showSearch={{
                      filter,
                    }}
                    style={{ height: 50 }}
                  />
                </Form.Item>
                {/* ----------------end address---------------- */}
                {/* ----------------begin phone---------------- */}
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      min: 10,
                      message: 'sđt chưa đủ 10 số',
                    },
                    {
                      max: 10,
                      message: 'Độ dài sdt không quá 10 số',
                    },
                  ]}
                  className="no-star"
                >
                  <Input placeholder="Số Điện Thoại" style={{ height: 50 }} />
                </Form.Item>
                {/* ----------------end phone---------------- */}
                {/* ----------------begin gender---------------- */}
                <Form.Item
                  name="gender"
                  rules={[
                    {
                      required: true,
                      message: 'Chưa chọn giới tính',
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn Giới Tính"
                    options={[
                      {
                        value: '1',
                        label: 'Nam',
                      },
                      {
                        value: '2',
                        label: 'Nữ',
                      },
                      {
                        value: '0',
                        label: 'Khác',
                      },
                    ]}
                    style={{ height: 50 }}
                  />
                </Form.Item>
                {/* ----------------end gender---------------- */}
                {/* ----------------begin role---------------- */}
                <Form.Item
                  name="roleId"
                  rules={[
                    {
                      required: true,
                      message: 'Chưa loại đăng ký',
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn vai trò"
                    options={[
                      {
                        value: '2',
                        label: 'Trường học',
                      },
                      {
                        value: '3',
                        label: 'Doanh nghiệp - Công ty',
                      },
                      {
                        value: '4',
                        label: 'Tư vấn viên - Cố vấn',
                      },
                      {
                        value: '5',
                        label: 'Quyền học sinh - sinh viên',
                      },
                    ]}
                    style={{ height: 50 }}
                  />
                </Form.Item>
                {/* ----------------end role---------------- */}

                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(new Error('Hãy chấp nhận thoả thuận')),
                    },
                  ]}
                >
                  <Checkbox>
                    Chấp nhận <a href="">Các điều khoản và Điều kiện</a>
                  </Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                    Đăng Ký
                  </Button>
                </Form.Item>
              </Form>
              <p className="font-semibold text-muted text-center">
                Bạn đã có tài khoản?{' '}
                <Link to="/dang-nhap" className="font-bold text-dark">
                  Đăng Nhập
                </Link>
              </p>
            </Card>
          </Spin>
        </Content>
        <Footer>
          <p className="copyright">Copyright © 2023 by Phan Huu Kiet</p>
        </Footer>
      </div>
    </>
  );
}

export default SignUpV1;
