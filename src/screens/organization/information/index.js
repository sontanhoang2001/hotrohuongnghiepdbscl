import React, { useEffect, useRef, useState } from 'react';

import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
  Radio,
  Modal,
  Form,
  Input,
  Badge,
} from 'antd';

import {
  VerticalAlignTopOutlined,
  GlobalOutlined,
  LoadingOutlined,
  CheckCircleFilled,
  DownloadOutlined,
  MailFilled,
} from '@ant-design/icons';

import convesionImg from '../../../assets/images/face-3.jpg';
import convesionImg2 from '../../../assets/images/face-4.jpg';
import convesionImg3 from '../../../assets/images/face-5.jpeg';
import convesionImg4 from '../../../assets/images/face-6.jpeg';
import convesionImg5 from '../../../assets/images/face-2.jpg';
import universityApi from '../../../api/universityApi';
import { useDispatch, useSelector } from 'react-redux';
import TextArea from 'antd/es/input/TextArea';
import { updateOrganization } from '../../../redux/universitySlice';
import { useForm } from 'antd/es/form/Form';

function OrganizationProfile() {
  const [imageURL, setImageURL] = useState(false);
  const [loading, setLoading] = useState(true);
  //redux state
  const dispatch = useDispatch();
  const { pending } = useSelector((state) => state.university);

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
        dispatch(updateOrganization(values));
      })
      .catch((errorInfo) => {})
      .finally(() => setOpenUpdateForm(false));
  };

  //Lấy thông tin tổ chức
  const [organization, setOrganization] = useState(null);
  useEffect(() => {
    universityApi
      .getOrganizationById(1)
      .then((response) => {
        const org = response.data.data;
        setOrganization(org);
        console.log('org', org);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, []);

  const handleOpenForm = () => {
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
    setOpenUpdateForm(true);
  };

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

  const uploadButton = (
    <div className="ant-upload-text font-semibold text-dark">
      {<VerticalAlignTopOutlined style={{ width: 20, color: '#000' }} />}
      <div>Upload New Project</div>
    </div>
  );

  const data = [
    {
      title: 'Sophie B.',
      avatar: convesionImg,
      description: 'Hi! I need more information…',
    },
    {
      title: 'Anne Marie',
      avatar: convesionImg2,
      description: 'Awesome work, can you…',
    },
    {
      title: 'Ivan',
      avatar: convesionImg3,
      description: 'About files I can…',
    },
    {
      title: 'Peterson',
      avatar: convesionImg4,
      description: 'Have a great afternoon…',
    },
    {
      title: 'Nick Daniel',
      avatar: convesionImg5,
      description: 'Hi! I need more information…',
    },
  ];

  if (loading) return <LoadingOutlined />;
  return (
    <>
      {/* ảnh đại diện  */}
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: 'url(' + organization?.OrganizationDetail.image + ')' }}
      ></div>

      <Card
        className="card-profile-head"
        style={{ padding: '1rem, -0.5rem' }}
        bodyStyle={{ display: 'none' }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={organization?.OrganizationDetail.image} />

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">
                    {organization?.name} {' ('}
                    <Badge
                      size="default"
                      status={organization.VerifyOrganization.status === 1 ? 'success' : 'error'}
                      text={
                        organization.VerifyOrganization.status === 1
                          ? 'Đã xác thực tổ chức'
                          : 'Tổ chức chưa được xác thực'
                      }
                    />{' '}
                    {')'}
                  </h4>
                  <p>{organization?.OrganizationType.description}</p>
                </div>
              </Avatar.Group>
            </Col>
            <Col
              span={24}
              md={12}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              {organization && (
                <Button
                  type="primary"
                  onClick={handleVerifyClick}
                  shape="round"
                  icon={<MailFilled />}
                  size="large"
                >
                  Gửi yêu cầu xác thực
                </Button>
              )}
            </Col>
          </Row>
        }
      ></Card>
      {/* thông tin tổ chức */}
      <Row gutter={[24, 0]}>
        {/* <Col span={24} md={8} className="mb-24 ">
          <Card
            bordered={false}
            className="header-solid h-full"
            title={<h6 className="font-semibold m-0">Platform Settings</h6>}
          >
            <ul className="list settings-list">
              <li>
                <h6 className="list-header text-sm text-muted">ACCOUNT</h6>
              </li>
              <li>
                <Switch defaultChecked />

                <span>Email me when someone follows me</span>
              </li>
              <li>
                <Switch />
                <span>Email me when someone answers me</span>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Email me when someone mentions me</span>
              </li>
              <li>
                <h6 className="list-header text-sm text-muted m-0">APPLICATION</h6>
              </li>
              <li>
                <Switch defaultChecked />
                <span>New launches and projects</span>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Monthly product updates</span>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Subscribe to newsletter</span>
              </li>
            </ul>
          </Card>
        </Col> */}
        <Col span={24} md={12} className="mb-24">
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
            <p className="text-dark">{organization?.OrganizationDetail.description}</p>
            <hr className="my-25" />
            <Descriptions title="Chi tiết">
              <Descriptions.Item label="Tên tổ chức" span={3}>
                {organization?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Điện thoại" span={3}>
                {organization?.OrganizationDetail.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={3}>
                {organization?.OrganizationDetail.email}
              </Descriptions.Item>
              <Descriptions.Item label="Khu vực" span={3}>
                {organization?.OrganizationDetail.province}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ" span={3}>
                {organization?.OrganizationDetail.address}
              </Descriptions.Item>
              <Descriptions.Item label="Social" span={3}>
                <a
                  href={organization?.OrganizationDetail.url}
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
        </Col>
        <Col span={24} md={12} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Tin nhắn</h6>}
            className="header-solid h-full"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <List
              itemLayout="horizontal"
              dataSource={data}
              split={false}
              className="conversations-list"
              renderItem={(item) => (
                <List.Item actions={[<Button type="link">REPLY</Button>]}>
                  <List.Item.Meta
                    avatar={<Avatar shape="square" size={48} src={item.avatar} />}
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

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
            <Form.Item
              label="Tên tổ chức"
              name="name"
              rules={[{ required: true, message: 'Nhập tên tổ chức!' }]}
            >
              <Input placeholder="Tên tổ chức" />
            </Form.Item>
            <Form.Item
              label="Ảnh đại diện"
              name="image"
              rules={[{ required: true, message: 'Chọn ảnh đại diện!' }]}
            >
              <Input rows={2} placeholder="Ảnh đại diện" />
            </Form.Item>
            <Form.Item
              label="Khu vực"
              name="province"
              rules={[{ required: true, message: 'Nhập tên khu vực!' }]}
            >
              <Input placeholder="Khu vực" />
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[{ required: true, message: 'Nhập tên địa chỉ!' }]}
            >
              <Input placeholder="Địa chỉ" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Nhập Email!' }]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[{ required: true, message: 'Nhập số điện thoại!' }]}
            >
              <Input placeholder="Số điện thoại" />
            </Form.Item>
            <Form.Item
              label="Trang web"
              name="url"
              rules={[{ required: true, message: 'Nhập đường dẫn trang web!' }]}
            >
              <Input placeholder="Trang web" />
            </Form.Item>

            <Form.Item
              label="Mô tả"
              name="description"
              rules={[{ required: true, message: 'Nhập câu hỏi!' }]}
            >
              <TextArea rows={5} placeholder="Mô tả" />
            </Form.Item>

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
          </Form>
        </Card>
      </Modal>

      {/* Form yêu cầu xác thực tổ chức */}
      <Modal
        confirmLoading={pending}
        title={<p style={{ textAlign: 'center', margin: 0 }}>Yêu cầu xác thực tổ chức</p>}
        okText="Gửi"
        centered
        width={1000}
        style={{ height: 'auto' }}
        bodyStyle={{ overflowY: 'scroll' }}
        open={openVerifyForm}
        onOk={handleVerifySubmitForm}
        onCancel={() => setOpenVerifyForm(false)}
      >
        <Card style={{ margin: 0, padding: 0 }} loading={pending}>
          <Form wrapperCol={{ span: 16 }} labelCol={{ span: 8 }} ref={verifyFormRef}>
            <Form.Item
              label="Phiếu thông tin tổ chức"
              name="fileAttached"
              rules={[{ required: true, message: 'Phiếu thông tin tổ chức không để trống!' }]}
            >
              <Input placeholder="Phiếu thông tin tổ chức" />
            </Form.Item>

            {/* hidden */}
            <Form.Item name="id" hidden>
              <Input />
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </>
  );
}

export default OrganizationProfile;
