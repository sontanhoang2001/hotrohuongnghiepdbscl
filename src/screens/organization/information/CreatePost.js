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
import React, { useRef } from 'react';
import { useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { DeleteFilled, LeftCircleFilled, PlusOutlined } from '@ant-design/icons';
import './style.css';
import viVN from 'antd/lib/locale/vi_VN';
import { uploadFile } from '../../../firebase/uploadConfig';
import { useDispatch, useSelector } from 'react-redux';
import {
  createPost,
  deletePost,
  getPostById,
  restorePost,
  updatePost,
} from '../../../redux/postsSlice';
import { useEffect } from 'react';
import postsApi from '../../../api/postsApi';
import dayjs from 'dayjs';

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

function CreatePost({ organizationId, setStep, currentPostId, backTolist }) {
  const dispatch = useDispatch();
  const { status, currentPost } = useSelector((state) => state.posts);

  //category
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    postsApi
      .getCategories()
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formRef = React.useRef(null);
  const sunEditorRef = React.useRef(null);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  //fillter của select
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

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
  const customUpload = ({ onError, onSuccess, file }) => {
    uploadFile(file)
      .then((imgUrl) => {
        onSuccess(null, imgUrl);
        formRef.current?.setFieldsValue({
          thumbnail: imgUrl,
        });
        // console.log('uploaded', imgUrl);
      })
      .catch((err) => {
        onError({ message: err.message });
      });
  };

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

  //Editing
  const [isEditing, setIsEditing] = useState(currentPostId !== null);

  useEffect(() => {
    setTimeout(() => {
      formRef.current?.setFieldsValue({
        ...currentPost,
        postsCategoryId: currentPost.PostsCategory?.id,
        displayDate: dayjs(currentPost.displayDate, 'YYYY-MM-DD HH:mm[Z]'),
        title: currentPost.title,
      });
      // console.log(currentPost.displayDate);
      // console.log(dayjs(currentPost.displayDate,"YYYY-MM-DD HH:mm[Z]"));
      setFileList([{ url: currentPost.thumbnail }]);
      // Ensure the SunEditor is fully loaded before accessing its editor
      if (sunEditorRef.current && sunEditorRef.current.editor) {
        sunEditorRef.current.editor.core.setContents(currentPost.content);
      }
    }, 500);
  }, [currentPost]);

  //hàm submit form
  const onFinish = (values) => {
    //process form data
    const formValues = {
      ...values,
      displayDate: values.displayDate.format('YYYY-MM-DD HH:mm'),
      status: 1,
      organizationId: organizationId ?? 2,
    };
    if (!isEditing) dispatch(createPost(formValues));
    else {
      dispatch(updatePost(formValues));
      // console.log('values',formValues);
    }
  };
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          style={{ padding: '0 1rem', marginBottom: '1rem' }}
          onClick={backTolist}
          type="primary"
          size="large"
        >
          <LeftCircleFilled />
          &nbsp; Quay lại
        </Button>
        <div>
          {isEditing && currentPost.deletedAt === null && (
            <Button
              style={{ padding: '0 1rem', marginBottom: '1rem' }}
              onClick={() => {
                dispatch(deletePost({ id: currentPost.id, organizationId: organizationId }));
              }}
              danger
              loading={status === 'delete'}
              type="primary"
              size="large"
            >
              <DeleteFilled />
              &nbsp; Ẩn bài viết
            </Button>
          )}
          {isEditing && currentPost.deletedAt !== null && (
            <Button
              style={{ padding: '0 1rem', marginBottom: '1rem' }}
              onClick={() => {
                dispatch(restorePost({ id: currentPost.id, organizationId: organizationId }));
              }}
              danger
              loading={status === 'restore'}
              type="primary"
              size="large"
            >
              <DeleteFilled />
              &nbsp; Khôi phục bài viết
            </Button>
          )}
        </div>
      </div>

      <Card title={(!isEditing && 'Tạo bài viết') || 'Cập nhật bài viết'}>
        <Form name="NewPosts" ref={formRef} layout="vertical" onFinish={onFinish}>
          <Form.Item hidden name="id">
            <Input hidden />
          </Form.Item>
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
                  options={categories?.map((category) => ({
                    value: category.id,
                    label: category.name + ' - ' + category.description,
                  }))}
                  filterOption={filterOption}
                  style={{ height: 50 }}
                />
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
                  locale="vi-VN"
                  onChange={handleDateChange}
                  style={{ width: '100%', height: 50 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="center" gutter={[24, 16]}>
            <Col sm={24} md={24}>
              <Form.Item
                name={'uploadThumbnail'}
                label="Ảnh đại diện"
                rules={[
                  {
                    required: !isEditing,
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
                  customRequest={customUpload}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
              </Form.Item>
              <Form.Item hidden name={'thumbnail'}>
                <Input hidden />
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
              defaultValue={isEditing ? currentPost?.content : 'Nội dung bài viết'}
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

              <Button
                type="primary"
                loading={status === 'creating' || status === 'editing'}
                htmlType="submit"
              >
                {!isEditing ? 'Tạo bài viết' : 'Cập nhật bài viết'}
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

export default CreatePost;
