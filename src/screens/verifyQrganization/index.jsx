import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Upload,
  message,
} from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import ProvincesOpenApi from '../../api/province';
import { HeadingTitle, MarginTopContent } from '../../globalStyles';
//gọi api thông tin vùng miền
const residences = await ProvincesOpenApi();

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const beforeUpload = (file) => {
  const checkImageExtension =
    file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
  if (!checkImageExtension) {
    message.error('Chỉ có thể tải lên JPG/PNG file!', 3);
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('File không vượt quá 2MB', 3);
  }
  return (checkImageExtension && isLt2M) || Upload.LIST_IGNORE;
};

function VerifyOrganization() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  const initialValues = {
    email: 'abc@gmail.com',
    phone: '0987654321',
    fullName: 'CTTNHHMTV ',
    address: ['Thành phố Hà Nội', 'Quận Ba Đình', 'Quận Ba Đình'],
    role: '2',
    agreement: true,
  };

  const filter = (inputValue, path) =>
    path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Tải lên
      </div>
    </div>
  );
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <MarginTopContent className="container">
      <HeadingTitle>Thông tin hiện tại</HeadingTitle>
      <Card>
        <Form
          name="register"
          initialValues={initialValues}
          onFinish={onFinish}
          scrollToFirstError
          className="row-col"
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={24} md={24} lg={12}>
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
              {/* ----------------begin role---------------- */}
              <Form.Item
                name="role"
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
            </Col>
            <Col xs={24} sm={24} md={24} lg={12}>
              {/* ----------------begin upload---------------- */}
              <Form.Item
                name="file"
                rules={[
                  {
                    required: true,
                    message: 'Chưa chọn file',
                  },
                  {
                    validator(_, file) {
                      return new Promise((resolve, reject) => {
                        if (file.size / 1024 / 1024 < 2) {
                          reject('File không vượt quá 2MB');
                        } else {
                          resolve('Sucess');
                        }
                      });
                    },
                  },
                ]}
              >
                <Row align="middle" justify="center">
                  <Col>
                    <Upload
                      action={'http://localhost:9000'}
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                      beforeUpload={beforeUpload}
                      accept=".png,.jpeg,.jpg"
                      maxCount={1}
                      style={{ width: 200, height: 200 }}
                    >
                      {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                  </Col>
                </Row>
              </Form.Item>
              {/* ----------------end upload---------------- */}

              <Form.Item>
                <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                  Gửi
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
          <img
            alt="preview"
            style={{
              width: '100%',
            }}
            src={previewImage}
          />
        </Modal>
      </Card>
    </MarginTopContent>
  );
}

export default VerifyOrganization;
