import { useEffect, useState } from 'react';

import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
  Radio,
  Switch,
  Upload,
  message,
} from 'antd';

import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons';

import BgProfile from '../../../assets/images/bg-profile.jpg';
import profilavatar from '../../../assets/images/face-1.jpg';
import convesionImg from '../../../assets/images/face-3.jpg';
import convesionImg2 from '../../../assets/images/face-4.jpg';
import convesionImg3 from '../../../assets/images/face-5.jpeg';
import convesionImg4 from '../../../assets/images/face-6.jpeg';
import convesionImg5 from '../../../assets/images/face-2.jpg';
import project1 from '../../../assets/images/home-decor-1.jpeg';
import project2 from '../../../assets/images/home-decor-2.jpeg';
import project3 from '../../../assets/images/home-decor-3.jpeg';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsOtp, selectLoginData } from '../../../redux/authSlice';

function Profile() {
  const [imageURL, setImageURL] = useState(false);
  const [, setLoading] = useState(false);
  //gọi redux
  const sentOtp = useSelector(selectIsOtp);
  const dispatch = useDispatch();
  const getProfile = useSelector(selectLoginData);
  const { role, status } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   console.log(getProfile);
  //   console.log(getProfile.UserDetail);
  // }, [getProfile]);

  const roleName = [
    {
      ADMIN: 'ADMIN',
    },
    {
      ORGANIZATION: 'ADMIN',
    },
    {
      ADMIN: 'ADMIN',
    },
  ];

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(false);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoading(false);
        setImageURL(false);
      });
    }
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

  const project = [
    {
      img: project1,
      titlesub: 'Project #1',
      title: 'Modern',
      disciption: 'As Uber works through a huge amount of internal management turmoil.',
    },
    {
      img: project2,
      titlesub: 'Project #2',
      title: 'Scandinavian',
      disciption: 'Music is something that every person has his or her own specific opinion about.',
    },
    {
      img: project3,
      titlesub: 'Project #3',
      title: 'Minimalist',
      disciption:
        'Different people have different taste, and various types of music, Zimbali Resort',
    },
  ];

  return (
    <>
      <div className="profile-nav-bg" style={{ backgroundImage: 'url(' + BgProfile + ')' }}></div>

      <Card
        className="card-profile-head"
        bodyStyle={{ display: 'none' }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                {getProfile?.UserDetail?.avatar ? (
                  <Avatar size={74} shape="square" src={getProfile?.UserDetail?.avatar} />
                ) : (
                  // <img src={getProfile?.UserDetail.avatar} alt="avatar" />
                  <img src="./images/pngegg.png" alt="avatar" />
                )}

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{getProfile?.UserDetail?.fullName}</h4>
                  <p>CEO / Co-Founder</p>
                </div>
              </Avatar.Group>
            </Col>
          </Row>
        }
      ></Card>

      <Row gutter={[24, 0]}>
        <Col span={24} md={12} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Thong tin cá nhân</h6>}
            className="header-solid h-full card-profile-information"
            extra={<Button type="link">{pencil}</Button>}
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            {/* <p className="text-dark">
              {' '}
              Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two
              equally difficult paths, choose the one more painful in the short term (pain avoidance
              is creating an illusion of equality).{' '}
            </p> */}
            <hr style={{}} />
            <Descriptions>
              <Descriptions.Item label="Họ và Tên" span={3}>
                {getProfile?.UserDetail?.fullName}
              </Descriptions.Item>
              <Descriptions.Item label="SĐT" span={3}>
                {getProfile?.phone}

                {/* {getProfile?.phone} */}
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={3}>
                {getProfile?.email}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ" span={3}>
                {getProfile?.UserDetail?.address}, {getProfile?.UserDetail?.addressDetail}
                {/* {getProfile?.UserDetail?.address}, {getProfile?.UserDetail?.addressDetail} */}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col span={24} md={12} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Conversations</h6>}
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
    </>
  );
}

export default Profile;
