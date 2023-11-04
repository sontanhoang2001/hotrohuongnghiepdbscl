import { Button, Form, Input, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { authChangeEmailAsync, selectPending } from '../../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';

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

function EditMail({ mail }) {
  const [form] = Form.useForm();
  const [loadinpage, setloadinpage] = useState(false);
  let pending = useSelector(selectPending);
  //gọi redux
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(authChangeEmailAsync(values));
  };

  useEffect(() => {
    setloadinpage(pending && pending != null ? true : false);
  }, [pending, loadinpage]);
  return (
    <Spin spinning={loadinpage}>
      <EditEmail>
        <div>
          E-mail hiện tại: <i>{mail}</i>
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
            marginTop: 20,
          }}
          scrollToFirstError
        >
          {/* ----------------begin mail---------------- */}
          <Form.Item
            name="newEmail"
            label="E-mail Mới"
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
          <Form.Item style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '5%' }}>
            <Button type="primary" htmlType="submit">
              OK
            </Button>
          </Form.Item>
        </Form>
      </EditEmail>
    </Spin>
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
export default EditMail;
