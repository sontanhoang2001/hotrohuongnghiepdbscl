import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Typography,
  Pagination,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm,
  Space,
  notification,
} from 'antd';

import { DeleteOutlined, EditOutlined, PlusCircleFilled, UndoOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { getGetAllpersonality } from '../../../redux/mbtiSlice';
import React from 'react';
import Search from 'antd/es/input/Search';

import {
  createMajorMbti,
  deleteMajorMbti,
  getAllMajorMbti,
  restoreMajorMbti,
  updateMajorMbti,
} from '../../../redux/majorMbtiSlice';
import {
  getAllPublicUniversityInfo,
  selectUniversity,
  selectclientParams,
} from '../../../redux/universitySlice';
import majorMbtiApi from '../../../api/majorMbtiApi';
import { debounce } from 'lodash';
import universityApi from '../../../api/universityApi';

const { Title } = Typography;
// Filter `option.label` match the user type `input`
const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


function Faqs() {
  //gọi redux state
  const dispatch = useDispatch();

  const { data, mbtiParams, pending, page, size, total } = useSelector((state) => state.majorMbti);
  const { personality } = useSelector((state) => state.mbti);
  const clientParams = useSelector(selectclientParams);

  const getUniversity = useSelector(selectUniversity); //page 1 size 10 init value redux

  //form
  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const formRef = React.useRef(null);
  const handleSubmitForm = (values) => {
    formRef.current
      .validateFields()
      .then((values) => {
        let formData = { ...values };
        if (!isEditing) {
          dispatch(createMajorMbti(formData)).then(() => {
            dispatch(getAllMajorMbti(mbtiParams));
            setIsOpenModal(false);
          });
        } else {
          dispatch(updateMajorMbti(formData)).then(() => {
            dispatch(getAllMajorMbti(mbtiParams));
            setIsOpenModal(false);
          });
        }
      })
      .catch((errorInfo) => {
        console.log('Form validation failed:', errorInfo);
      });
  };

  //editing
  const [isEditing, setIsEditing] = useState(false);
  const [processId, setProcessId] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);

  //get university select
  const [universitySelect, setUniversitySelect] = useState([]);
  const [searchUniversity, setSearchUniversity] = useState('');
  useEffect(() => {
    universityApi
      .getAllPublicUniversityInfo({
        size: 10,
        page: 1,
        search: searchUniversity,
        organizationType: 1,
      })
      .then((rs) => {
        setUniversitySelect(rs.data.data.data.map(uni=>({value:uni.id,label:uni.name})));
        // console.log(rs.data.data.data);
      })
      .catch((err) => {
        notification.error({ message: 'Lấy danh sách trường thất bại' });
      });
  }, [searchUniversity]);
  //get university select

  const handleEdit = (id) => {
    setProcessId(id);
    majorMbtiApi
      .getMajorMbtiById(id)
      .then((res) => {
        setIsEditing(true);
        setIsOpenModal(true);
        setTimeout(() => {
          const question = res.data.data;
          formRef.current?.resetFields();
          formRef.current?.setFieldsValue({
            ...question,
          });
        }, 200);
        setProcessId(0);
      })
      .catch((error) => {
        console.log(error);
        setProcessId(0);
      });
  };
  //hàm bắt event delete
  const handleDelete = (id) => {
    dispatch(deleteMajorMbti(id)).then(() => {
      dispatch(getAllMajorMbti(mbtiParams));
    });
  };
  //restore
  const handleRestore = (id) => {
    dispatch(restoreMajorMbti(id)).then(() => {
      dispatch(getAllMajorMbti(mbtiParams));
    });
  };

  //Lấy danh sách nhóm câu hỏi
  useEffect(() => {
    //gọi api thông qua redux
    dispatch(getAllMajorMbti(mbtiParams));
    dispatch(getAllPublicUniversityInfo(clientParams));
    dispatch(getGetAllpersonality());
  }, [dispatch]);

  const convertDataSource =
    data?.map((item) => ({
      key: item.id,
      id: item.id,
      majorName: item.majorName,
      link: item.link,
      organizationName: item.Organization?.name,
      mbtiName: item.MBTI?.name,
      deletedAt: item.deletedAt,
    })) || [];

  const selectOrganization =
    getUniversity?.data?.map((item) => ({
      value: item.id,
      label: item.name,
    })) || [];

  const selectPersonality =
    personality?.map((item) => ({
      value: item.id,
      label: item.name,
    })) || [];

  //định dạng cột hiển thị
  const columns = useMemo(
    () => [
      {
        title: 'Tên ngành',
        dataIndex: 'majorName',
        key: 'majorName',

        render: (_, record) => (
          <div className="author-info">
            <Title level={5}>{record.majorName}</Title>
          </div>
        ),
      },
      {
        title: 'Đường dẫn',
        dataIndex: 'link',
        key: 'link',
        render: (_, record) => (
          <div className="author-info">
            <a href={record.link} rel="noopener noreferrer" target="_blank">
              {record.link}
            </a>
          </div>
        ),
      },
      {
        title: 'Tổ chức',
        dataIndex: 'organization',
        key: 'organization',
        render: (_, record) => <div className="author-info">{record?.Organization?.name}</div>,
        render: (_, record) => <div className="author-info">{record?.organizationName}</div>,
      },
      {
        title: 'MBTI',
        dataIndex: 'mbti',
        key: 'mbti',
        render: (_, record) => <div className="author-info">{record?.mbtiName}</div>,
      },

      {
        key: 'action',
        fixed: 'right',
        dataIndex: 'action',
        render: (_, record) => (
          <div className="author-info">
            <Button type="text" onClick={() => handleEdit(record.id)}>
              <EditOutlined style={{ color: 'green' }} />
            </Button>
            {record.deletedAt === null && (
              <Popconfirm
                placement="leftTop"
                title="Xác nhận xóa"
                okText="Xóa"
                onConfirm={() => handleDelete(record.id)}
                cancelText="Hủy"
              >
                <Button danger>
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
            )}
            {record.deletedAt !== null && (
              <Popconfirm
                placement="leftTop"
                title="Xác nhận khôi phục"
                okText="Khôi phục"
                onConfirm={() => handleRestore(record.id)}
                cancelText="Hủy"
              >
                <Button danger>
                  <UndoOutlined />
                </Button>
              </Popconfirm>
            )}
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleDelete, handleEdit],
  );
  //hàm phan trang
  const handlePageChange = (page, pageSize) => {
    // dispatch(setFaqsParams({ page: page, size: pageSize }));
    dispatch(getAllMajorMbti({ ...mbtiParams, page: page, size: pageSize }));
  };

  //tìm kiếm
  const onSearch = (value, _e, info) => {
    // dispatch(setFaqsParams({ search: value, page: 1 }));
    dispatch(getAllMajorMbti({ ...mbtiParams, search: value, page: 1 }));
  };
  const onSearchChange = debounce((e) => {
    if (e.target.value === '') {
      dispatch(getAllMajorMbti({ ...mbtiParams, search: e.target.value }));
    }
  }, 500);
  return (
    <React.Fragment>
      {/* Data list */}
      <div className="tabled">
        <Row gutter={[18, 20]}>
          <Col span={8} style={{ display: 'flex', justifyContent: 'start' }}>
            <Button
              style={{ padding: '0 1rem' }}
              onClick={() => {
                formRef.current?.resetFields();
                setIsEditing(false);
                setIsOpenModal(true);
              }}
              type="primary"
              size="large"
            >
              <PlusCircleFilled />
              &nbsp; Thêm mới
            </Button>
          </Col>
          <Col span={16}>
            <Search
              placeholder="Tìm kiếm câu hỏi"
              onSearch={onSearch}
              enterButton={
                <Button style={{ height: '2.5rem' }} type="primary">
                  Tìm kiếm
                </Button>
              }
            />
          </Col>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Danh sách câu hỏi thường gặp"
            >
              <div className="table-responsive">
                <Table
                  bordered={true}
                  columns={columns}
                  loading={pending}
                  dataSource={convertDataSource}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
              <Pagination
                current={mbtiParams?.page}
                pageSize={mbtiParams?.size}
                total={mbtiParams?.total}
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
      {/* Creating modal */}
      <Modal
        confirmLoading={pending}
        title={
          <p style={{ textAlign: 'center', margin: 0 }}>
            {(isEditing && 'Chỉnh Ngành nghề') || 'Thêm ngành'}
          </p>
        }
        okText="Lưu"
        centered
        width={1000}
        style={{ maxHeight: '80vh', overflowY: 'auto' }}
        open={isOpenModal}
        onOk={handleSubmitForm}
        onCancel={() => setIsOpenModal(false)}
      >
        <Card style={{ margin: 0, padding: 0 }} loading={pending}>
          <Form wrapperCol={{ span: 20 }} labelCol={{ span: 4 }} ref={formRef}>
            <Form.Item name="id">
              <Input type="hidden" />
            </Form.Item>
            <Form.Item
              label="Tên ngành"
              name="majorName"
              rules={[{ required: true, message: 'Nhập tên ngành' }]}
            >
              <Input placeholder="Tên ngành" />
            </Form.Item>
            <Form.Item
              label="Địa chỉ truy cập"
              name="link"
              rules={[{ required: true, message: 'Nhập Đường dẫn' }]}
            >
              <Input placeholder="link.com.vn" />
            </Form.Item>
            <Form.Item
              label="Trường đại học"
              name="organizationId"
              rules={[
                {
                  required: true,
                  message: 'Chưa chọn trường',
                },
              ]}
            >
              <Select
                showSearch
                onSearch={debounce((value) => setSearchUniversity(value),300)}
                placeholder="Chọn trường đại học"
                options={universitySelect}
                filterOption={filterOption}
                allowClear
                style={{ height: 40 }}
              />
            </Form.Item>
            <Form.Item
              label="MBTI"
              name="mbtiId"
              rules={[
                {
                  required: true,
                  message: 'Chưa chọn MBTI',
                },
              ]}
            >
              <Select
                placeholder="Chọn MBTI"
                options={selectPersonality}
                allowClear
                style={{ height: 40 }}
              />
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </React.Fragment>
  );
}

export default Faqs;
