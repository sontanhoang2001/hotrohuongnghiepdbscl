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
  Image,
  Popconfirm,
} from 'antd';

import {
  DeleteOutlined,
  EditOutlined,
  MinusCircleOutlined,
  PlusCircleFilled,
  PlusCircleOutlined,
  UndoOutlined,
} from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { addNewMbti, getMbtiQuestion, setParams, updateMbti } from '../../../redux/mbtiSlice';
import React from 'react';
import TextArea from 'antd/es/input/TextArea';
import Search from 'antd/es/input/Search';
import { deletePost, getAllPosts, restorePost, setPostParams } from '../../../redux/postsSlice';

const { Title } = Typography;

function PostList({ setStep, organizationId, dispatchEdit, dispatchCreate }) {
  //form
  // Filter `option.label` match the user type `input`

  const formRef = React.useRef(null);
  const handleSubmitForm = () => {
    formRef.current
      .validateFields()
      .then((values) => {
        if (!isEditing) {
          //create
          dispatch(addNewMbti(values));
        } else {
          //update
          dispatch(updateMbti(values));
        }
      })
      .catch((errorInfo) => {
        console.log('Form validation failed:', errorInfo);
      });
  };
  //delete
  const handleDelete=(id)=>{
    dispatch(deletePost({id,organizationId})).then(() => {
      dispatch(setPostParams({ search: postsParams.search }));
    });
  }
  //restore
  const handleRestore=(id)=>{
    dispatch(restorePost({id,organizationId})).then(() => {
      dispatch(setPostParams({ search: postsParams.search }));
    });
  }

  //editing
  const [isEditing, setIsEditing] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleEdit = (id) => {
    dispatchEdit(id);
  };

  //định dạng cột hiển thị
  const columns = useMemo(
    () => [
      {
        title: 'STT',
        dataIndex: 'id',
        key: 'id',
        width: 50,
      },
      {
        title: 'Tiêu đề',
        dataIndex: 'title',
        key: 'title',
        width: 300,
        render: (_, record) => (
          <div style={{ width: '100%' }} className="author-info">
            {record.deletedAt && (
              <Button className="mb-3" type="primary" danger shape="round">
                Đã xóa
              </Button>
            )}

            <Title level={5}>{record.title}</Title>
          </div>
        ),
      },
      {
        title: 'Ảnh đại diện',
        dataIndex: 'thumbnail',
        key: 'thumbnail',
        render: (_, record) => (
          <div className="author-info">
            <Image width={200} src={record.thumbnail} />
          </div>
        ),
      },
      {
        title: 'Người viết',
        dataIndex: 'value',
        key: 'value',
        render: (_) => <div className="author-info">Người viết</div>,
      },
      {
        title: 'Loại',

        render: (_, record) => (
          <div className="author-info">
            <Title level={5}>{record.PostsCategory.name}</Title>
          </div>
        ),
      },
      {
        title: 'Ngày đăng',

        render: (_, record) => (
          <div className="author-info">
            <span>
              {new Date(record.displayDate)
                .toLocaleString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'UTC',
                })
                .replace(',', '')}
            </span>
            <p>(Ngày - tháng - năm)</p>
          </div>
        ),
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
                <Button success>
                  <UndoOutlined />
                </Button>
              </Popconfirm>
            )}
          </div>
        ),
      },
    ],
    [],
  );

  //gọi redux state
  const dispatch = useDispatch();

  const { posts, pending, page, size, total, postsParams } = useSelector((state) => state.posts);

  //Lấy danh sách nhóm câu hỏi
  useEffect(() => {
    //gọi api thông qua redux
    dispatch(getAllPosts(organizationId));
    console.log('triggerd');
  }, [dispatch, organizationId, postsParams]);

  //hàm phan trang
  const handlePageChange = (page, pageSize) => {
    dispatch(setPostParams({ page: page, size: pageSize }));
  };

  //tìm kiếm
  const onSearch = (value, _e) => {
    console.log(value);
    dispatch(setPostParams({ search: value, page: 1 }));
  };

  return (
    <React.Fragment>
      {/* Data list */}
      <div className="tabled">
        <Row gutter={[18, 20]}>
          <Col span={8} style={{ display: 'flex', justifyContent: 'start' }}>
            <Button
              style={{ padding: '0 1rem' }}
              onClick={dispatchCreate}
              type="primary"
              size="large"
            >
              <PlusCircleFilled />
              &nbsp; Tạo bài viết
            </Button>
          </Col>
          <Col span={16}>
            <Search placeholder="Tìm kiếm câu hỏi" onSearch={onSearch} enterButton="Tìm" />
          </Col>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Danh sách bài viết"
            >
              <div className="table-responsive">
                <Table
                  bordered={true}
                  columns={columns}
                  loading={pending}
                  dataSource={posts}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
              <Pagination
                current={page}
                pageSize={size}
                total={total}
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
    </React.Fragment>
  );
}

export default PostList;
