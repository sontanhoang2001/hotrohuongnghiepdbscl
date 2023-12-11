import React, { useEffect, useState } from 'react';

import {
  Row,
  Col,
  Card,
  Button,
  Descriptions,
  Avatar,
  Radio,
  Upload,
  message,
  Dropdown,
  Form,
  Modal,
  Space,
  Input,
  Select,
  Cascader,
} from 'antd';

import { PlusOutlined, WomanOutlined, ManOutlined } from '@ant-design/icons';

import BgProfile from '../../../assets/images/bg-profile.jpg';
import { useDispatch, useSelector } from 'react-redux';
import {
  authChangeEmailAsync,
  authChangePhone,
  authOTP,
  changePasswordAsync,
  isOtp,
  logout,
  requestOtp,
} from '../../../redux/authSlice';
import { getUserProfile, updateUser } from '../../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../../../firebase/config';
import { uploadFile } from '../../../firebase/uploadConfig';
import { InputOTP } from 'antd-input-otp';
import ProvincesOpenApi from '../../../api/province';
import styled from 'styled-components';
import TextArea from 'antd/es/input/TextArea';

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
const residences = await ProvincesOpenApi();
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
function Profile() {
  const navigate = useNavigate();
  const [result, setResult] = useState('');
  const [otpType, setOtpType] = useState('email');
  const [form] = Form.useForm();
  const [editPassword, setEditPassword] = useState(false);
  const [formEidtValue, setFormEditValue] = useState({});
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [imageURL, setImageURL] = useState(false);
  const formRef = React.useRef(null);
  //trạng thái đóng/ mở modal
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [openOtp, setOpenOtp] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [beginSendOTP, setBeginSendOTP] = useState(false); //thay đối giá trị đóng mở của của sổ
  //gọi redux
  const dispatch = useDispatch();

  const { data, pending: userPending } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

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

  // const handleChange = (info) => {
  //   if (info.file.status === 'uploading') {
  //     setLoading(false);
  //     return;
  //   }
  //   if (info.file.status === 'done') {
  //     getBase64(info.file.originFileObj, (imageUrl) => {
  //       setLoading(false);
  //       setImageURL(false);
  //     });
  //   }
  // };

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

  const items = [
    {
      key: '1',
      label: (
        <div
          onClick={() => {
            setOpenEditProfile(true);
          }}
        >
          Cập nhật thông tin
        </div>
      ),
    },
    {
      key: '2',
      label: <div onClick={() => handleEditMailnPhone()}>Cập nhật thông tin đăng nhập</div>,
    },
    {
      key: '3',
      label: (
        <div
          onClick={() => {
            setOpenOtp(true);
            setEditPassword(true);
            setBeginSendOTP(false);
          }}
        >
          Đổi mật khẩu
        </div>
      ),
    },
  ];

  const handleSendOTP = () => {
    if (otpType === 'email') {
      setBeginSendOTP(true);
      const requestData = {
        userId: data?.id,
        type: otpType,
      };

      dispatch(requestOtp(requestData));
    } else if (otpType === 'phone') {
      setBeginSendOTP(true);

      let phoneNumber = `+84${data?.phone.substring(1)}`;

      setTimeout(() => {
        signin(phoneNumber);
      }, 5000);
    }
  };

  const signin = (phoneNumber) => {
    try {
      if (phoneNumber === '') return;

      let verify = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });

      signInWithPhoneNumber(auth, phoneNumber, verify)
        .then((result) => {
          setResult(result);
        })
        .catch((err) => {
          console.log('error o trong', err);

          console.log(err);
        });
    } catch (error) {
      console.log('error', error);
      console.log('hết hạn');
      message.error('Gửi mã xác thực OTP đã hết hạn!', 3);
    }
  };

  //hàm xác thựcn otp bằng số điện thoại
  const ValidateOtpByPhone = (otp) => {
    if (otp.length < 6) {
      message.error('Bạn chưa nhập đủ mã OTP', 3);
    }

    if (otp === null) return;

    return new Promise((resolve, reject) => {
      return result
        .confirm(otp)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          // console.log('Incorrect code');
          reject(err);
        });
    });
  };
  //hàm sử lý khi người dùng submit
  const handleFinishOtp = (values) => {
    // The value will be array of string
    // Check the field if there is no value, or value is undefined/empty string
    const { otp } = values;

    //kiểm tra otp có đúng định dạng hay không
    //khác undefined
    //khác chuỗi rỗng
    //khác null
    if (!otp || otp.includes(undefined) || otp.includes('')) {
      return form.setFields([
        {
          name: 'otp',
          errors: ['mã xác nhận không hợp lệ!!!'],
        },
      ]);
    }

    //chuyển đổi mảng otp sang chuỗi
    const otpString = otp.join('');

    // tạo giá trị request cho api
    if (data.id) {
      if (otpType === 'email') {
        const formData = {
          userId: data?.id,
          type: otpType,
          otpCode: otpString,
        };
        setOpenOtp(false);
        if (editPassword) {
          dispatch(authOTP(formData)).then(() => {
            setOpenOtp(false);
            setOpenEdit(true);
          });
        } else {
          if (formEidtValue.newEmail !== '' && formEidtValue.newEmail !== data?.email) {
            setOpenOtp(false);
            dispatch(authOTP(formData)).then(() => {
              dispatch(authChangeEmailAsync(formEidtValue.newEmail)).then(() => {
                dispatch(getUserProfile());
              });
            });

            dispatch(isOtp(false));
          }
        }
      } else if (otpType === 'phone') {
        const formData = {
          userId: data?.id,
          type: otpType,
          otpCode: '',
        };
        // Update status active for user
        ValidateOtpByPhone(otpString)
          .then((result) => {
            if (result) {
              if (editPassword) {
                dispatch(authOTP(formData)).then(() => {
                  setOpenOtp(false);
                  setOpenEdit(true);
                });
              } else {
                if (formEidtValue.newPhone !== '' && formEidtValue.newPhone !== data?.phone) {
                  setOpenOtp(false);
                  dispatch(authOTP(formData)).then(() => {
                    dispatch(authChangePhone(formEidtValue.newPhone)).then(() => {
                      dispatch(getUserProfile());
                    });
                    // dispatch(getUserProfile());
                  });

                  dispatch(isOtp(false));
                }
              }
            }
          })
          .catch(() => {
            message.error('Xác thực OTP thất bại!', 3);
          });
      }
    }
  };

  //hàm đổi mật khẩu
  const handleFinishChangePassWord = (value) => {
    setOpenOtp(false);
    dispatch(changePasswordAsync(value)).then(() => {
      setOpenEdit(false);
      setEditPassword(false);
      dispatch(isOtp(false));
      setTimeout(() => {
        navigate('/dang-nhap');
        dispatch(logout());
      }, 300);
    });
  };
  const handleEditMailnPhone = () => {
    form.current?.resetFields();
    setOpenEdit(true);
    setEditPassword(false);
  };
  //hàm đổi thông tin đăng nhập
  const handleFinishEdit = (value) => {
    setFormEditValue(value);
    setOpenEdit(false);
    setOpenOtp(true);
  };
  //customUpload tải hình ảnh
  //customUpload tải hình ảnh
  const customUpload = ({ onError, onSuccess, file }) => {
    uploadFile(file)
      .then((imgUrl) => {
        onSuccess(null, imgUrl);
        formRef.current?.setFieldsValue({
          avatar: imgUrl,
        });
      })
      .catch((err) => {
        onError({ message: err.message });
      });
  };

  //upload avatar và preview
  const [fileList, setFileList] = useState([]);
  // useEffect(() => {
  //   setFileList([data?.UserDetail?.avatar]);
  // }, [data]);
  useEffect(() => {
    if (data?.UserDetail) {
      setFileList([{ url: data?.UserDetail?.avatar }]);
    }
  }, [data]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const filter = (inputValue, path) =>
    path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
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

  const handleUpdateProfile = (value) => {
    dispatch(updateUser(value)).then(() => {
      dispatch(getUserProfile());
      setOpenEditProfile(false);
    });
  };

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
                {data?.UserDetail?.avatar ? (
                  <Avatar size={74} shape="square" src={data?.UserDetail?.avatar} />
                ) : (
                  // <img src={getProfile?.UserDetail.avatar} alt="avatar" />
                  <img src="./images/pngegg.png" alt="avatar" />
                )}

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{data?.UserDetail?.fullName}</h4>
                  <p>{data?.email}</p>
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
            title={<h6 className="font-semibold m-0">Thông tin cá nhân</h6>}
            className="header-solid h-full card-profile-information"
            extra={
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottomRight"
              >
                <Button type="link">{pencil}</Button>
              </Dropdown>
            }
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            {/* <p className="text-dark">
              {' '}
              Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two
              equally difficult paths, choose the one more painful in the short term (pain avoidance
              is creating an illusion of equality).{' '}
            </p> */}
            <hr style={{}} />

            {data?.UserDetail && (
              <Descriptions lo>
                <Descriptions.Item label="Họ và Tên" span={3}>
                  {data.UserDetail.fullName}
                </Descriptions.Item>
                <Descriptions.Item label="Giới tính" span={3}>
                  {data.UserDetail.gender === 1 ? (
                    <span>
                      <ManOutlined style={{ color: 'var(--primary-color)', fontSize: '15px' }} />
                    </span>
                  ) : data.UserDetail.gender === 2 ? (
                    <span>
                      <WomanOutlined
                        style={{ color: 'var(--secondary-color)', fontSize: '15px' }}
                      />
                    </span>
                  ) : data.UserDetail.gender === 0 ? (
                    <>🏳️‍🌈</>
                  ) : (
                    <span>undefined</span>
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="SĐT" span={3}>
                  {data.phone}
                </Descriptions.Item>
                <Descriptions.Item label="Email" span={3}>
                  {data.email}
                </Descriptions.Item>
                <Descriptions.Item label="Địa chỉ" span={3}>
                  {data.UserDetail.address}
                </Descriptions.Item>
                <Descriptions.Item label="Chi tiết địa chỉ" span={3}>
                  {data.UserDetail.addressDetail}
                </Descriptions.Item>
              </Descriptions>
            )}
          </Card>
        </Col>
      </Row>
      {/* xác thực otp */}
      <Modal
        centered
        open={openOtp}
        onCancel={() => {
          setOpenOtp(false);
          setBeginSendOTP(false);
          dispatch(isOtp(false));
        }}
        footer={null}
      >
        {beginSendOTP === false ? (
          <div className="box">
            <h3 className="box-title">Xác thực OTP</h3>
            <div className="group-btn-send-otp">
              <Space direction="vertical" size="middle">
                <p>Otp sẽ được gửi qua :</p>
                <Radio.Group onChange={(e) => setOtpType(e.target.value)} value={otpType}>
                  <Space direction="vertical">
                    {data?.email && (
                      <Radio value={'email'}>
                        email: <span style={{ color: `var(--secondary-color)` }}>{data.email}</span>
                      </Radio>
                    )}
                    {data?.phone && (
                      <Radio value={'phone'}>
                        số điện thoại:{' '}
                        <span style={{ color: `var(--secondary-color)` }}>{data.phone}</span>
                      </Radio>
                    )}
                  </Space>
                </Radio.Group>
              </Space>
              <Row gutter={[16, 8]} style={{ marginTop: '1rem' }}>
                <Col span={24}>
                  <Button
                    type="primary"
                    disabled={!data?.email}
                    block
                    onClick={() => {
                      handleSendOTP();
                      form.current?.resetFields();
                    }}
                  >
                    Nhận mã xác thực
                  </Button>
                </Col>
                <Col span={24}>
                  <Button
                    type="primary"
                    block
                    danger
                    onClick={() => {
                      setOpenOtp(false);
                      setBeginSendOTP(false);
                    }}
                  >
                    Huỷ
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        ) : (
          <div className="box" style={{ padding: 20 }}>
            <div>
              <main>
                <section className="request-otp-box">
                  <h2 className="otp-title" style={{ marginBottom: 20 }}>
                    Nhập mã xác nhận
                  </h2>
                  <Form form={form} onFinish={handleFinishOtp}>
                    <Form.Item
                      name="otp"
                      className="center-error-message"
                      rules={[{ validator: async () => Promise.resolve() }]}
                    >
                      <InputOTP name="otp" autoFocus inputType="numeric" length={6} />
                    </Form.Item>
                    <div id="recaptcha-container"></div>
                    <Form.Item noStyle>
                      <Button block htmlType="submit" type="primary" className="otp-send-btn">
                        Gửi
                      </Button>
                    </Form.Item>
                  </Form>
                </section>
              </main>
            </div>
          </div>
        )}
      </Modal>
      {/*  */}
      {/* modal edit thông tin đăng nhập*/}
      <Modal
        title={<>{(editPassword && 'Đổi mật khẩu') || 'Cập nhật thông tin đăng nhập'}</>}
        centered
        open={openEdit}
        onCancel={() => {
          setOpenEdit(false);
          setEditPassword(false);
        }}
        footer={null}
        width={500}
        style={{ overflowY: 'auto' }}
      >
        {editPassword ? (
          <Form
            {...formItemLayout}
            form={form}
            initialValues={{
              oldPassword: '',
              newPassword: '',
            }}
            onFinish={handleFinishChangePassWord}
          >
            {/* ----------------begin old password---------------- */}
            <Form.Item
              name="oldPassword"
              label="Mật Khẩu Cũ"
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
            {/* ----------------end old password---------------- */}
            {/* ----------------begin new password---------------- */}
            <Form.Item
              name="newPassword"
              label="Mật Khẩu Mới"
              rules={[
                {
                  required: true,
                  message: 'bạn chưa nhập mật khẩu',
                },
                {
                  max: 40,
                  message: 'mật khẩu không quá 40 ký tự',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('oldPassword') !== value) {
                      return Promise.resolve(); // Mật khẩu mới không trùng với mật khẩu cũ
                    }
                    return Promise.reject(new Error('Mật khẩu mới không thể giống mật khẩu cũ'));
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            {/* ----------------end new password---------------- */}
            <Form.Item noStyle>
              <Button block htmlType="submit" type="primary">
                Đồng ý
              </Button>
            </Form.Item>
          </Form>
        ) : (
          // form cập nhật thông tin
          <Form
            {...formItemLayout}
            form={form}
            initialValues={{
              newEmail: data?.email,
              newPhone: data?.phone,
            }}
            onFinish={handleFinishEdit}
          >
            {/* ----------------begin newEmail---------------- */}
            <Form.Item
              name="newEmail"
              label="Email mới"
              rules={[
                {
                  type: 'email',
                  message: 'Email của không hợp lệ',
                },
                {
                  max: 255,
                  message: 'email không quá 255 ký tự',
                },
              ]}
            >
              <Input />
            </Form.Item>
            {/* ----------------end newEmail---------------- */}
            {/* ----------------begin newPhone---------------- */}
            <Form.Item
              name="newPhone"
              label="SĐT mới"
              rules={[
                {
                  min: 10,
                  message: 'Sđt chưa đủ 10 số',
                },
                {
                  max: 10,
                  message: 'Độ dài sdt không quá 10 số',
                },
                {
                  pattern: /^\d+$/,
                  message: 'Số điện thoại phải là số',
                },
              ]}
            >
              <Input />
            </Form.Item>
            {/* ----------------end newPhone---------------- */}
            <Form.Item noStyle>
              <Button block htmlType="submit" type="primary">
                Đồng ý
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
      {/*  */}
      {/* modal edit thông tin*/}
      <Modal
        title={<>{(editPassword && 'Đổi mật khẩu') || 'Cập nhật thông tin đăng nhập'}</>}
        open={openEditProfile}
        centered
        onCancel={() => {
          setOpenEditProfile(false);
        }}
        footer={null}
        width={500}
        style={{ overflowY: 'auto' }}
      >
        {data?.UserDetail && (
          <Form
            {...formItemLayout}
            initialValues={{
              fullName: `${data.UserDetail.fullName}`,
              gender: `${data.UserDetail.gender}`,
              birthday: `${data.UserDetail.birthday}`,
              address: `${data.UserDetail.address}`,
              addressDetail: `${data.UserDetail.addressDetail}`,
            }}
            ref={formRef}
            onFinish={handleUpdateProfile}
          >
            {/* ----------------begin birthday---------------- */}
            <Form.Item hidden name="birthday">
              <Input style={{ height: 50, display: 'none' }} />
            </Form.Item>
            {/* ----------------end birthday---------------- */}
            {/* ----------------begin fullName---------------- */}
            <Form.Item
              name="fullName"
              label="Họ và Tên"
              rules={[
                {
                  required: true,
                  message: 'Chưa nhập họ và tên',
                },
                {
                  max: 255,
                  message: 'Độ dài họ và tên không quá 255 ký tự ',
                },
              ]}
            >
              <Input style={{ height: 50 }} />
            </Form.Item>
            {/* ----------------end fullName---------------- */}
            {/* ----------------begin gender---------------- */}
            <Form.Item
              name="gender"
              label="Giới tính"
              rules={[
                {
                  required: true,
                  message: 'Chưa chọn giới tính',
                },
              ]}
            >
              <Select
                options={[
                  {
                    value: '1',
                    label: 'Nam',
                  },
                  {
                    value: '2',
                    label: 'Nữ',
                  },
                  {
                    value: '0',
                    label: 'Khác',
                  },
                ]}
                style={{ height: 50 }}
              />
            </Form.Item>
            {/* ----------------end gender---------------- */}
            {/* ----------------begin avatar---------------- */}
            <Form.Item
              name="uploadAvatar"
              label="Ảnh đại diện"
              rules={[
                {
                  required: true,
                  message: 'Chưa chọn hình',
                },
              ]}
            >
              <AvatarUploadStyled>
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
              </AvatarUploadStyled>
            </Form.Item>
            <Form.Item hidden name={'avatar'}>
              <Input hidden />
            </Form.Item>
            {/* ----------------end avatar---------------- */}
            {/* ----------------begin address---------------- */}
            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[
                {
                  // type: 'array',
                  required: true,
                  message: 'Hãy nhập địa chỉ của bạn',
                },
              ]}
            >
              <Cascader
                options={residences}
                showSearch={{
                  filter,
                }}
                style={{ height: 50 }}
              />
            </Form.Item>
            {/* ----------------end address---------------- */}
            {/* ----------------begin addressDetail---------------- */}
            <Form.Item
              name="addressDetail"
              label="Chi tiết địa chỉ"
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập địa chỉ của bạn',
                },
              ]}
            >
              <TextArea rows={4} maxLength={500} />
            </Form.Item>
            {/* ----------------end addressDetail---------------- */}
            <Form.Item noStyle>
              <Button block htmlType="submit" type="primary">
                Đồng ý
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
      {/* preview avtar */}
      <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
        <img
          alt="preview"
          style={{
            width: '100%',
            marginTop: 30,
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
}

const AvatarUploadStyled = styled.div`
  .ant-upload-select,
  .ant-upload-list-item-container {
    width: 200px !important;
    height: 200px !important;

    .ant-upload-list-item {
      .ant-upload-list-item-actions {
      }
    }
  }
`;

export default Profile;
