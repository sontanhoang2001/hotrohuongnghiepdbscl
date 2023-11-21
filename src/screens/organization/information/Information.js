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
import { useDispatch, useSelector } from 'react-redux';
import TextArea from 'antd/es/input/TextArea';
import { getOneByOrganizationId, getOrganizationsById, updateOrganization } from '../../../redux/universitySlice';
import { useParams } from 'react-router-dom';

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

const Information = () => {
  const [imageURL, setImageURL] = useState(false);
  const [loading, setLoading] = useState(true);
  //route
  const { id } = useParams();
  //redux state
  const dispatch = useDispatch();
  const { pending, organization } = useSelector((state) => state.university);
 


  //Form yêu cầu xác thực tổ chức
  const [openVerifyForm, setOpenVerifyForm] = useState(false);
  const verifyFormRef = useRef(null);
  const handleVerifySubmitForm = () => {
    verifyFormRef?.current
      .validateFields()
      .then((values) => {
        //update
        console.log('Received values of form: ', { ...values, id: organization.id });
        // dispatch(updateOrganization(values));
      })
      .catch((errorInfo) => {})
      .finally(() => setOpenUpdateForm(false));
  };
  const handleVerifyClick = () => {
    //setid for verify form
    setOpenVerifyForm(true);
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
          dispatch( (id));
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
      };
      formRef.current?.setFieldsValue({ ...formData });
    }, 500);
  };

  return (
    <>
     
        <Card
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
        width={1000}
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
