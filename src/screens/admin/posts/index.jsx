import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Upload,
  message,
} from 'antd';
import React from 'react';
import { useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { PlusOutlined } from '@ant-design/icons';
import './style.css';
import { isBefore, isToday } from 'date-fns';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const beforeUpload = (file) => {
  const isImage =
    file.type === 'image/jpeg' ||
    file.type === 'image/png' ||
    file.type === 'image/jpg' ||
    file.type === 'image/raw' ||
    file.type === 'image/tiff ';
  if (!isImage) {
    message.error('Chỉ có thể tải lên jpeg/png/jpg/raw/tiff file!', 3);
  }
  const isLt2M = file.size / 1024 / 1024 <= 10;
  if (!isLt2M) {
    message.error('File không vượt quá 10MB', 3);
  }
  return (isImage && isLt2M) || Upload.LIST_IGNORE;
};

function Posts() {
  const creator = [
    {
      value: 'nguyen thi b',
      label: 'nguyen thi b',
    },
    {
      value: 'nguyen thi c',
      label: 'nguyen thi c',
    },
    {
      value: 'nguyen thi d',
      label: 'nguyen thi d',
    },
  ];
  const category = [
    {
      value: 'tin tức',
      label: 'tin tức',
    },
    {
      value: 'tin đồn',
      label: 'tin đồn',
    },
    {
      value: 'tin người',
      label: 'tin người',
    },
  ];
  const formRef = React.useRef(null);
  const [content, setContent] = useState('');
  const [selectedDate, setSelectedDate] = useState('Ngày/Tháng/Năm');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  //fillter của select
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  //content trong SunEditor
  const handleChangeContent = (content) => {
    setContent(content);
  };
  //file trong uoload
  const handleChangeUpload = ({ fileList: newFileList }) => setFileList(newFileList);
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
  //panel của calendar
  const handleDateChange = (date, dateString) => {};
  //huỷ preview
  const handleCancel = () => setPreviewOpen(false);
  //hàm preview
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  //hàm submit form
  const onFinish = (value) => {
    console.log(value);
  };
  const onReset = () => {
    formRef.current?.resetFields();
  };
  return (
    <div>
      <Card title={'Tạo bài đăng'}>
        <Form name="NewPosts" ref={formRef} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="title"
            label={'Tiêu đề'}
            rules={[
              {
                required: true,
                message: 'Chưa có tiêu đề',
              },
            ]}
          >
            <Input placeholder="Nhập tiêu đề..." style={{ height: 50 }}></Input>
          </Form.Item>
          <Row gutter={[16, 16]}>
            <Col sm={24} lg={12}>
              <Form.Item
                name="creator"
                label="Người viết"
                rules={[
                  {
                    required: true,
                    message: 'Chưa có người viết',
                  },
                ]}
              >
                <Select
                  placeholder="Chọn người viết"
                  options={creator}
                  filterOption={filterOption}
                  style={{ height: 50 }}
                />
              </Form.Item>
            </Col>
            <Col sm={24} lg={12}>
              <Form.Item
                name="category"
                label="Danh mục"
                rules={[
                  {
                    required: true,
                    message: 'Chưa có danh mục',
                  },
                ]}
              >
                <Select
                  placeholder="Chọn danh mục"
                  options={category}
                  filterOption={filterOption}
                  style={{ height: 50 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="center" gutter={[24, 16]}>
            <Col sm={24} md={24} lg={12}>
              <Form.Item
                name={'thumbnail'}
                label="Ảnh đại diện"
                rules={[
                  {
                    required: true,
                    message: 'Chưa có ảnh đại diện',
                  },
                ]}
              >
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChangeUpload}
                  beforeUpload={beforeUpload}
                  accept=".jpeg,.png,.jpg,.raw,.tiff"
                  maxCount={1}
                  style={{ width: 200, height: 200 }}
                  customRequest={({ file, onSuccess }) => {
                    setTimeout(() => {
                      onSuccess('ok');
                    }, 0);
                  }}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
              </Form.Item>
            </Col>
            <Col sm={24} md={24} lg={12}>
              <Form.Item
                name="dateview"
                label="Hiển Thị"
                rules={[
                  {
                    required: true,
                    message: 'Chưa chọn ngày',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      // console.log(value?.$d);
                      // console.log('Date', new Date());
                      // console.log(isBefore(value?.$d, new Date()));

                      if (isToday(value?.$d)) {
                        return Promise.resolve();
                      } else if (isBefore(value?.$d, new Date())) {
                        return Promise.reject(
                          new Error('Không thể chọn đăng bài vào ngày hôm qua'),
                        );
                      } else {
                        return Promise.resolve();
                      }
                    },
                  }),
                ]}
              >
                <DatePicker
                  format="DD-MM-YYYY"
                  onChange={handleDateChange}
                  style={{ width: '100%', height: 50 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="content"
            label="Nội dung"
            rules={[
              {
                required: true,
                message: 'Chưa có nội dung',
              },
            ]}
          >
            <SunEditor
              height="700px"
              onChange={handleChangeContent}
              setOptions={{
                mode: 'classic',
                rtl: false,
                katex: 'window.katex',
                imageGalleryUrl:
                  'https://etyswjpn79.execute-api.ap-northeast-1.amazonaws.com/suneditor-demo',
                videoFileInput: false,
                tabDisable: false,
                buttonList: [
                  [
                    'undo',
                    'redo',
                    'font',
                    'fontSize',
                    'formatBlock',
                    'paragraphStyle',
                    'blockquote',
                    'bold',
                    'underline',
                    'italic',
                    'strike',
                    'subscript',
                    'superscript',
                    'fontColor',
                    'hiliteColor',
                    'textStyle',
                    'removeFormat',
                    'outdent',
                    'indent',
                    'align',
                    'horizontalRule',
                    'list',
                    'lineHeight',
                    'table',
                    'link',
                    'image',
                    'video',
                    'audio',
                    'math',
                    'imageGallery',
                    'fullScreen',
                    'preview',
                    'print',
                    'save',
                  ],
                ],
              }}
            />
          </Form.Item>

          <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
            <Space size={'middle'}>
              <Button type="primary" danger>
                Huỷ
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Cài lại
              </Button>
              <Button type="primary" htmlType="submit">
                Tạo bài đăng
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="preview"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
}

export default Posts;
