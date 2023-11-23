import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Avatar,
  Typography,
  Pagination,
  Popconfirm,
  Form,
  Input,
  Upload,
  Modal,
  message,
  Select,
} from 'antd';

import { InfoCircleFilled, LockFilled, PlusCircleFilled, PlusOutlined } from '@ant-design/icons';

import {
  createOrganizationAsync,
  deleteOrganization,
  getAllOrganizationsByUser,
  getAllUniversity,
  getOneByOrganizationId,
  selectUniversity,
  selectUniversityPage,
  selectUniversityPagesize,
  selectUniversityPending,
  selectUniversityToalRow,
  updateOrganization,
} from '../../../redux/universitySlice';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import { uploadFile } from '../../../firebase/uploadConfig';
import universityApi from '../../../api/universityApi';

const { Title } = Typography;
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
//fillter của select
const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

function OrganizationList() {
  //hàm bắt event edit
  const handleEdit = (id) => {
    console.log(id);
  };
  //hàm bắt event delete
  const handleDelete = (id) => {
    dispatch(deleteOrganization(id));
  };
  //định dạng cột hiển thị
  const columns = useMemo(
    () => [
      {
        title: 'Tên',
        fixed: 'left',
        dataIndex: 'name',
        key: 'name',
        render: (record) => (
          <Avatar.Group>
            <Avatar
              className="shape-avatar"
              shape="square"
              size={40}
              src={record?.OrganizationDetail?.image}
            ></Avatar>
            <div className="avatar-info">
              {/* <Title level={5}>{university.name}</Title> */}
              <Title level={5}>{record?.name}</Title>
              <p>{record?.OrganizationDetail?.email}</p>
              {/* <p>{university.OrganizationDetail.email}</p> */}
            </div>
          </Avatar.Group>
        ),
      },
      {
        title: 'Rank',
        dataIndex: 'rank',
        key: 'rank',
        render: (record) => (
          <div className="author-info">
            <Title level={5}>{record}</Title>
          </div>
        ),
      },
      {
        title: 'Địa chỉ',
        dataIndex: 'address',
        key: 'address',
        render: (record) => (
          <div className="author-info">
            <Title level={5}>{record}</Title>
          </div>
        ),
      },
      {
        title: 'Tỉnh',
        dataIndex: 'province',
        key: 'province',
        render: (record) => (
          <div className="author-info">
            <Title level={5}>{record}</Title>
          </div>
        ),
      },

      {
        title: 'SĐT',
        dataIndex: 'phone',
        key: 'phone',
        render: (record) => (
          <div className="author-info">
            <Title level={5}>{record}</Title>
          </div>
        ),
      },
      {
        title: 'Năm',
        dataIndex: 'lat',
        key: 'lat',
        render: (record) => (
          <div className="author-info">
            <Title level={5}>{record}</Title>
          </div>
        ),
      },
      {
        title: 'Ngày cập nhật',
        dataIndex: 'long',
        key: 'long',
        render: (record) => (
          <div className="author-info">
            <Title level={5}>{record}</Title>
          </div>
        ),
      },
      {
        title: 'Mô tả',
        key: 'description',
        width: 100,
        render: (record) => <span>{record?.description}</span>,
      },
      {
        title: 'Link',
        dataIndex: 'url',
        key: 'url',
        render: (record) => (
          <div className="author-info">
            <Title level={5}>
              <a href={record} rel="noopener noreferrer" target="_blank">
                {record}
              </a>
            </Title>
          </div>
        ),
      },
      {
        key: 'action',
        title: 'Thao tác',
        fixed: 'right',
        width: 100,
        render: (record) => (
          <>
            <Link to={`/organization/${record?.id}`}>
              <Button title="Xem chi tiết">
                <InfoCircleFilled />
              </Button>
            </Link>
          </>
        ),
      },
    ],
    [],
  );

  //goi redux
  const dispatch = useDispatch();
  const { joinedOrganizations, organization, pending } = useSelector((state) => state.university);
  const { profile } = useSelector((state) => state.auth);
  const page = useSelector(selectUniversityPage);
  const size = useSelector(selectUniversityPagesize);
  const Totalpage = useSelector(selectUniversityToalRow);
  const getUniversity = useSelector(selectUniversity);
  const pendingState = useSelector(selectUniversityPending);

  useEffect(() => {
    //gọi api thông qua redux
    dispatch(getAllOrganizationsByUser());
  }, []);

  const convertedData = useMemo(
    () =>
      joinedOrganizations?.map((university, index) => {
        console.log(university);
        return {
          key: index.toString(),
          id: university?.id,
          name: university?.name,
          rank: university?.OrganizationDetail?.rank,
          url: university?.OrganizationDetail?.url,
          address: university?.OrganizationDetail?.address,
          province: university?.OrganizationDetail?.province,
          phone: university?.OrganizationDetail?.phone,
          lat: university?.OrganizationDetail?.lat,
          long: university?.OrganizationDetail?.long,
          description: university?.OrganizationDetail?.description,
        };
      }),
    [joinedOrganizations],
  );

  //hàm phan trang
  const handlePageChange = (page, pageSize) => {
    const payload = { page, pageSize };
    dispatch(getAllUniversity(payload));
  };
  //upload image
  //file trong uoload
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

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

  //Form tạo tổ chức
  const [orgTypes, setOrgTypes] = useState([]);
  useEffect(() => {
    universityApi.getAllOrganizationType().then((res) => {
      setOrgTypes(res.data.data);
    });
  }, []);

  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [isOpenModal, setisOpenModal] = useState(false);
  const formRef = React.useRef(null);
  const handleSubmitForm = () => {
    formRef.current
      .validateFields()
      .then((values) => {
        //create
        const formValues={...values,userId:profile.id}
        console.log(formValues);
        dispatch(createOrganizationAsync(formValues)).then(() => {
          dispatch(getAllOrganizationsByUser());
          setOpenUpdateForm(false);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col span={8} style={{ display: 'flex', justifyContent: 'start', marginBottom: '1rem' }}>
            <Button
              style={{ padding: '0 1rem' }}
              onClick={() => {
                formRef.current?.resetFields();
                setOpenUpdateForm(true);
              }}
              type="primary"
              size="large"
            >
              <PlusCircleFilled />
              &nbsp; Tạo tổ chức mới
            </Button>
          </Col>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Danh sách trường học"
            >
              <div className="table-responsive">
                <Table
                  bordered={true}
                  columns={columns}
                  loading={pendingState}
                  dataSource={convertedData}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
              <Pagination
                current={page}
                pageSize={size}
                total={Totalpage}
                onChange={handlePageChange}
                showQuickJumper
                showSizeChanger
                onShowSizeChange={handlePageChange}
                style={{ marginTop: 20, marginBottom: 20 }}
              />
            </Card>
          </Col>
        </Row>
      </div>
      {/* Form cập nhật thông tin */}
      <Modal
        confirmLoading={pending}
        title={<p style={{ textAlign: 'center', margin: 0 }}>Tạo tổ chức</p>}
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
                  label="Loại tổ chức"
                  name="organizationTypeId"
                  rules={[{ required: true, message: 'Nhập loại tổ chức!' }]}
                >
                  <Select
                    placeholder="Chọn loại tổ chức"
                    options={orgTypes?.map((category) => ({
                      value: category.id,
                      label: category.description,
                    }))}
                    filterOption={filterOption}
                    style={{ height: 50 }}
                  />
                </Form.Item>
              </Col>
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
                <Form.Item name={'uploadThumbnail'} label="Ảnh đại diện">
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChangeUpload}
                    beforeUpload={beforeUpload}
                    accept=".jpeg,.png,.jpg,.raw,.tiff"
                    maxCount={1}
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
}

export default OrganizationList;
