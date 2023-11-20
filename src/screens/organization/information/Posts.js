import {
  Button,
  Card,
  Col,
  ConfigProvider,
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
import viVN from 'antd/lib/locale/vi_VN';

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

function Posts({organizationId}) {
  const [post, setPost] = useState({
    title: '',
    content: '',
    categoryId: '',
  });
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
  const handleChange = (content) => {
    setContent(content);
    console.log(content);
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
  // const customUpload =async ({ onError, onSuccess, file }) => {
  //   const storage = firebase.storage();
  //   const metadata = {
  //       contentType: 'image/jpeg'
  //   }
  //   const storageRef = await storage.ref();
  //   const imageName = generateHashName(); //a unique name for the image
  //   const imgFile = storageRef.child(`Vince Wear/${imageName}.png`);
  //   try {
  //     const image = await imgFile.put(file, metadata);
  //     onSuccess(null, image);
  //   } catch(e) {
  //     onError(e);
  //   }
  // };


  //panel của calendar
  const handleDateChange = (date, dateString) => {
    console.log('Selected Date: ', date);
    console.log('Formatted Date String: ', dateString);
  };
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
  const onFinish = (values) => {
    const formValues = { ...values ,
      displayDate:values.displayDate.format("YYYY-MM-DD HH:mm"),
      status:1,
      organizationId:organizationId??1
    };
    console.log(formValues);
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
                name="postsCategoryId"
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
                name="displayDate"
                label="Hiển Thị"
                rules={[
                  {
                    required: true,
                    message: 'Chưa có ngày hiển thị',
                  },
                ]}
              >
                <DatePicker
                  format="DD-MM-YYYY HH:mm"
                  showTime
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
              onChange={handleChange}
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
