import { Button, Form, Input } from 'antd';
import React from 'react';
import styled from 'styled-components';
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
function EditPhone({ phone }) {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <EditEmail>
      <div>
        SĐt hiện tại: <span>{phone}</span>
      </div>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          newEmail: '',
          password: '',
        }}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      >
        {/* ----------------begin mail---------------- */}
        <Form.Item
          name="newEmail"
          label="E-mail mới"
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            đăng ký
          </Button>
        </Form.Item>
      </Form>
    </EditEmail>
  );
}
const EditEmail = styled.div`
  .ant-modal-root {
    .ant-modal-wrap {
      .ant-modal {
        .ant-modal-content {
          .ant-modal-footer {
            display: none;
          }
        }
      }
    }
  }
`;
export default EditPhone;
