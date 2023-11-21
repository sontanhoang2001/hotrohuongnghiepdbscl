import React, { useEffect, useRef, useState } from 'react';

import {
  Row,
  Col,
  Card,
  Button,
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
import {
  getOneByOrganizationId,
  getOrganizationsById,
  updateOrganization,
} from '../../../redux/universitySlice';
import { useParams } from 'react-router-dom';
import Information from './Information';
import Posts from './Posts';
import Faqs from './Faqs';

//verification status
const verificationStatus = {
  0: 'error',
  1: 'success',
  2: 'warning',
};
const verificationText = {
  0: 'Tổ chức chưa được xác thực',
  1: 'Đã xác thực tổ chức',
  2: 'Đang chờ xác thực',
};

function OrganizationProfile() {
  const [imageURL, setImageURL] = useState(false);
  const [loading, setLoading] = useState(true);
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
          dispatch(getOrganizationsById(id));
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

  //Lấy thông tin tổ chức
  const { id } = useParams();
  useEffect(() => {
    dispatch(getOneByOrganizationId(id));
    setLoading(false);
  }, [dispatch, id]);

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

  if (loading) return <Card loading="true" style={{ width: '100%', height: '100vh' }} />;
  return (
    <>
      {/* ảnh đại diện  */}
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: 'url(' + organization?.OrganizationDetail?.image + ')' }}
      ></div>

      <Card
        className="card-profile-head"
        style={{ padding: '1rem, -0.5rem' }}
        bodyStyle={{ display: 'none' }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={organization?.OrganizationDetail?.image} />

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">
                    {organization?.name} {' ('}
                    <Badge
                      size="default"
                      status={verificationStatus[organization?.VerifyOrganization?.status]}
                      text={verificationText[organization?.VerifyOrganization?.status]}
                    />{' '}
                    {')'}
                  </h4>
                  <p>{organization?.OrganizationType?.description}</p>
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
              {organization?.VerifyOrganization?.status === 0 && (
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
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: 'Thông tin tổ chức',
            key: '1',
            children: <Information />,
          },
          {
            label: 'Bài viết',
            key: '2',
            children: <Posts organizationId={id} />,
          },
          {
            label: 'FAQS',
            key: '3',
            children: <Faqs organizationId={id}  />,
          },
          {
            label: 'Tin nhắn',
            key: '4',
            children: (
              <Row>
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
            ),
          },
        ]}
      />

      {/* Form yêu cầu xác thực tổ chức */}
      <Modal
        confirmLoading={pending}
        title={<p style={{ textAlign: 'center', margin: 0 }}>Yêu cầu xác thực tổ chức</p>}
        okText="Gửi"
        centered
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
