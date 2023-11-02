import React, { useEffect, useState } from 'react';
import { Button, Cascader, Checkbox, Form, Input, Select, Spin } from 'antd';
import { styled } from 'styled-components';
import ProvincesOpenApi from '../../api/province';
import { useDispatch, useSelector } from 'react-redux';
import { selectPending, selectIsSignup, setIsSignup, signupAsync } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const residences = await ProvincesOpenApi();
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
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
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
function Signup() {
  const [form] = Form.useForm();
  const [loadinpage, setloadinpage] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  let pending = useSelector(selectPending);
  const isSignup = useSelector(selectIsSignup);

  useEffect(() => {
    setloadinpage(pending && pending != null ? true : false);
    if (isSignup === true) {
      navigate('/xac-nhan-dang-nhap');
    }
  }, [isSignup, dispatch, pending, loadinpage, navigate]);

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <span
        style={{
          width: 70,
        }}
      >
        84
      </span>
    </Form.Item>
  );

  const onFinish = (values) => {
    const { agreement, prefix, confirm, ...inputedUserData } = values;
    //chuyển đổi giá trị submit from tại address từ mảng sang chuổi
    const addressString = inputedUserData.address.join(', ');
    inputedUserData.address = addressString;
    const payload = inputedUserData;
    dispatch(signupAsync(payload));
  };
  return (
    <Spin spinning={loadinpage}>
      <Background>
        <SignupForm>
          <div className="box">
            <h3>Đăng Ký Tài Khoản</h3>
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              initialValues={{
                email: '',
                phone: '',
                password: '',
                fullName: '',
                gender: '',
                residence: ['Tỉnh/Tp', 'Quận/Huyện', 'Phường/Thị Trấn'],
              }}
              style={{
                maxWidth: 600,
              }}
              scrollToFirstError
            >
              {/* ----------------begin mail---------------- */}
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: 'email',
                    message: 'mail của không hợp lệ',
                  },
                  {
                    required: true,
                    message: 'bạn chưa nhập email',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              {/* ----------------end mail---------------- */}
              {/* ----------------begin password---------------- */}
              <Form.Item
                name="password"
                label="Mật Khẩu"
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
              {/* ----------------end password---------------- */}
              {/* ----------------begin confirm password---------------- */}
              <Form.Item
                name="confirm"
                label="Nhập lại mật khẩu"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'hãy nhập Xác nhận mật khẩu',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('The new password that you entered do not match!'),
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              {/* ----------------end confirm password---------------- */}
              {/* ----------------begin fullName---------------- */}
              <Form.Item
                name="fullName"
                label="Tên"
                rules={[
                  {
                    required: true,
                    message: 'bạn chưa nhập tên',
                  },
                  {
                    max: 120,
                    message: 'độ dài tên không quá 120 ký tự',
                  },
                  {
                    pattern: /^[a-zA-ZÀ-ỹ ]+$/,
                    message: 'không thể nhập số ở tên',
                  },
                ]}
              >
                <Input
                  style={{
                    width: '100%',
                  }}
                />
              </Form.Item>
              {/* ----------------end fullName---------------- */}
              {/* ----------------begin address---------------- */}
              <Form.Item
                name="address"
                label="Địa chỉ"
                rules={[
                  {
                    type: 'array',
                    required: true,
                    message: 'hãy nhập địa chỉ của bạn',
                  },
                ]}
              >
                <Cascader options={residences} />
              </Form.Item>
              {/* ----------------end address---------------- */}
              {/* ----------------begin phone---------------- */}
              <Form.Item
                name="phone"
                label="SĐT"
                rules={[
                  {
                    max: 10,
                    message: 'độ dài sdt không quá 10 số',
                  },
                ]}
                className="no-star"
              >
                <Input
                  addonBefore={prefixSelector}
                  style={{
                    width: '100%',
                  }}
                />
              </Form.Item>
              {/* ----------------end phone---------------- */}
              {/* ----------------begin gender---------------- */}
              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                    message: 'Please select gender!',
                  },
                ]}
              >
                <Select placeholder="select your gender">
                  <Option value="1">Male</Option>
                  <Option value="2">Female</Option>
                  <Option value="0">Other</Option>
                </Select>
              </Form.Item>
              {/* ----------------end gender---------------- */}

              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error('Should accept agreement')),
                  },
                ]}
                {...tailFormItemLayout}
              >
                <Checkbox>
                  Bạn có chập nhận <a href="">thoả thuận</a>
                </Checkbox>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  đăng ký
                </Button>
              </Form.Item>
            </Form>
          </div>
        </SignupForm>
      </Background>
    </Spin>
  );
}
const Background = styled.div`
  /* background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%); */
  background-color: #d9afd9;
  background-image: linear-gradient(0deg, #d9afd9 0%, #97d9e1 100%);

  min-height: 100vh;
`;

const SignupForm = styled.div`
  width: 100%;
  margin: auto;
  height: 100%;
  padding-top: 100px;
  padding-bottom: 100px;
  /* margin-bottom: 100px; */
  .box {
    h3 {
      text-align: center;
      text-transform: capitalize;
      margin-top: 10px;
      margin-bottom: 15px;
    }
    .ant-form .no-star .ant-form-item-row .ant-form-item-label .ant-form-item-required {
      &::before {
        display: none;
      }
    }
  }
`;
export default Signup;
