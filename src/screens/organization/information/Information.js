import React, { useEffect, useRef, useState } from 'react';

import {
  Button,
  Row,
  Col,
  Card,
  List,
  Descriptions,
  Avatar,
  Modal,
  Form,
  Input,
  Badge,
  Tabs,
  Upload,
  message,
} from 'antd';

import {
  VerticalAlignTopOutlined,
  GlobalOutlined,
  LoadingOutlined,
  MailFilled,
} from '@ant-design/icons';

import convesionImg from '../../../assets/images/face-3.jpg';
import convesionImg2 from '../../../assets/images/face-4.jpg';
import convesionImg3 from '../../../assets/images/face-5.jpeg';
import convesionImg4 from '../../../assets/images/face-6.jpeg';
import convesionImg5 from '../../../assets/images/face-2.jpg';
import { DeleteFilled, LeftCircleFilled, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import TextArea from 'antd/es/input/TextArea';
import {
  getOneByOrganizationId,
  getOrganizationsById,
  updateOrganization,
} from '../../../redux/universitySlice';
import { useParams } from 'react-router-dom';
import { uploadFile } from '../../../firebase/uploadConfig';

const pencil = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
      className="fill-gray-7"
    ></path>
    <path
      d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
      className="fill-gray-7"
    ></path>
  </svg>,
];
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

const Information = () => {
  const [imageURL, setImageURL] = useState(false);
  const [loading, setLoading] = useState(true);
  //route
  const { id } = useParams();
  //redux state
  const dispatch = useDispatch();
  const { pending, organization } = useSelector((state) => state.university);

  //upload image
  //file trong uoload
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (organization?.OrganizationDetail) {
      setFileList([{ url: organization?.OrganizationDetail.image }]);
    }
  }, [organization]);
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
          image: imgUrl,
        });
        console.log('uploaded', imgUrl);
      })
      .catch((err) => {
        onError({ message: err.message });
      });
  };
  //huỷ preview
  //hàm preview
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  //Form cập nhật thông tin tổ chức
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const formRef = React.useRef(null);
  const handleSubmitForm = () => {
    formRef.current
      .validateFields()
      .then((values) => {
        //update
        dispatch(updateOrganization(values)).then(() => {
          dispatch(getOneByOrganizationId(id));
        });
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setOpenUpdateForm(false);
      });
  };
  const handleOpenForm = () => {
    setOpenUpdateForm(true);
    setTimeout(() => {
      // set form data
      const formData = {
        id: organization?.id,
        name: organization?.name,
        image: organization?.OrganizationDetail.image,
        address: organization?.OrganizationDetail.address,
        province: organization?.OrganizationDetail.province,
        email: organization?.OrganizationDetail.email,
        phone: organization?.OrganizationDetail.phone,
        lat: organization?.OrganizationDetail.lat,
        long: organization?.OrganizationDetail.long,
        description: organization?.OrganizationDetail.description,
        url: organization?.OrganizationDetail.url,
        rank: organization?.OrganizationDetail.rank,
        uploadThumbnail: organization?.OrganizationDetail.image,
      };
      formRef.current?.setFieldsValue({ ...formData });
    }, 500);
  };

  return (
    <>
      <Card
        loading={pending}
        bordered={false}
        title={<h6 className="font-semibold m-0">Thông tin tổ chức</h6>}
        className="header-solid h-full card-profile-information"
        extra={
          <Button onClick={handleOpenForm} type="link">
            {pencil}
          </Button>
        }
        bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
      >
        <p className="text-dark">{organization?.OrganizationDetail?.description}</p>
        <hr className="my-25" />
        <Descriptions title="Chi tiết">
          <Descriptions.Item label="Tên tổ chức" span={3}>
            {organization?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Điện thoại" span={3}>
            {organization?.OrganizationDetail?.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Email" span={3}>
            {organization?.OrganizationDetail?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Khu vực" span={3}>
            {organization?.OrganizationDetail?.province}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ" span={3}>
            {organization?.OrganizationDetail?.address}
          </Descriptions.Item>
          <Descriptions.Item label="Social" span={3}>
            <a
              href={organization?.OrganizationDetail?.url}
              target="_blank"
              rel="noreferrer"
              className="mx-5 px-5"
            >
              Trang web <GlobalOutlined />
            </a>
            {/* <a href="#pablo" className="mx-5 px-5">
                  {<FacebookOutlined style={{ color: '#344e86' }} />}
                </a>
                <a href="#pablo" className="mx-5 px-5">
                  {<InstagramOutlined style={{ color: '#e1306c' }} />}
                </a> */}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Form cập nhật thông tin */}
      <Modal
        confirmLoading={pending}
        title={<p style={{ textAlign: 'center', margin: 0 }}>Cập nhật thông tin tổ chức</p>}
        okText="Lưu"
        centered
        width={1400}
        style={{ height: 'auto' }}
        bodyStyle={{ overflowY: 'scroll' }}
        open={openUpdateForm}
        onOk={handleSubmitForm}
        onCancel={() => setOpenUpdateForm(false)}
      >
        <Card style={{ margin: 0, padding: 0 }} loading={pending}>
          <Form wrapperCol={{ span: 20 }} labelCol={{ span: 4 }} ref={formRef}>
            <Row gutter={[18, 20]}>
              <Col span={12}>
                <Form.Item
                  label="Tên tổ chức"
                  name="name"
                  rules={[{ required: true, message: 'Nhập tên tổ chức!' }]}
                >
                  <Input placeholder="Tên tổ chức" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name={'uploadThumbnail'}
                  label="Ảnh đại diện"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Chưa có ảnh đại diện',
                  //   },
                  // ]}
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
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Ảnh đại diện"
                  name="image"
                  rules={[{ required: true, message: 'Chọn ảnh đại diện!' }]}
                >
                  <Input rows={2} placeholder="Ảnh đại diện" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Khu vực"
                  name="province"
                  rules={[{ required: true, message: 'Nhập tên khu vực!' }]}
                >
                  <Input placeholder="Khu vực" />
                </Form.Item>
              </Col>
              <Col span={12}>
                {' '}
                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  rules={[{ required: true, message: 'Nhập tên địa chỉ!' }]}
                >
                  <Input placeholder="Địa chỉ" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: 'Nhập Email!' }]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[{ required: true, message: 'Nhập số điện thoại!' }]}
                >
                  <Input placeholder="Số điện thoại" />
                </Form.Item>
              </Col>
              <Col span={12}>
                {' '}
                <Form.Item
                  label="Trang web"
                  name="url"
                  rules={[{ required: true, message: 'Nhập đường dẫn trang web!' }]}
                >
                  <Input placeholder="Trang web" />
                </Form.Item>
              </Col>
              <Col span={24}>
                {' '}
                <Form.Item
                  wrapperCol={24}
                  labelCol={6}
                  label="Mô tả"
                  name="description"
                  rules={[{ required: true, message: 'Nhập câu hỏi!' }]}
                >
                  <TextArea rows={10} placeholder="Mô tả" />
                </Form.Item>
              </Col>

              {/* hidden */}
              <Form.Item name="id" hidden>
                <Input />
              </Form.Item>
              <Form.Item name="lat" hidden>
                <Input />
              </Form.Item>
              <Form.Item name="long" hidden>
                <Input />
              </Form.Item>
              <Form.Item name="rank" hidden>
                <Input />
              </Form.Item>
            </Row>
          </Form>
        </Card>
      </Modal>
    </>
  );
};

export default Information;
