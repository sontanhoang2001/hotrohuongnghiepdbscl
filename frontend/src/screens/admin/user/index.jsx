import { Row, Col, Card, Radio, Table, Button, Avatar, Typography, Pagination, Tag } from 'antd';

import { DeleteOutlined, EditOutlined, GoogleOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  getAllUserAsync,
  selectUser,
  selectUserPage,
  selectUserPending,
  selectUserSizePage,
  selectUserTotalRow,
} from '../../../redux/userSlice';

const { Title } = Typography;

function User() {
  //hàm bắt event edit
  const handleEdit = (id) => {
    console.log(id);
  };
  //hàm bắt event delete
  const handleDelete = (id) => {
    console.log(id);
  };
  //định dạng cột hiển thị
  const columns = [
    {
      title: 'account_type',
      dataIndex: 'account_type',
      key: 'account_type',
      render: (record) => (
        <>
          {record === 1 ? (
            <div className="author-info">
              <Tag color={'Orange'} key={record}>
                <GoogleOutlined /> Google
              </Tag>
            </div>
          ) : (
            <div className="author-info">
              <Tag color={'green'} key={record}>
                Bình thường
              </Tag>
            </div>
          )}
        </>
      ),
    },
    {
      title: 'trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (record) => (
        <>
          {record === 1 ? (
            <div className="author-info">
              <Tag color={'geekblue'} key={record}>
                Hoạt động
              </Tag>
            </div>
          ) : (
            <div className="author-info">
              <Tag color={'volcano'} key={record}>
                Không hoạt động
              </Tag>
            </div>
          )}
        </>
      ),
    },

    {
      title: 'Loại tk',
      dataIndex: 'RoleId',
      key: 'RoleId',
      render: (record) => {
        let tagColor, tagContent;

        switch (record) {
          case 1:
            tagColor = 'geekblue';
            tagContent = 'Admin';
            break;
          case 2:
            tagColor = 'blue';
            tagContent = 'Trường học';
            break;
          case 3:
            tagColor = 'green';
            tagContent = 'Doanh nghiệp - Công ty';
            break;
          case 4:
            tagColor = 'violet';
            tagContent = 'Tư vấn viên - Cố vấn';
            break;
          case 5:
            tagColor = 'yellow';
            tagContent = 'Học Sinh';
            break;
          default:
            tagColor = 'volcano';
            tagContent = 'Không xác định';
        }

        return (
          <div className="author-info">
            <Tag color={tagColor} key={record}>
              {tagContent}
            </Tag>
          </div>
        );
      },
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
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
      title: 'Mã xác thực',
      dataIndex: 'authCode',
      key: 'authCode',
      render: (record) => (
        <div className="author-info">
          <Title level={5}>{record}</Title>
        </div>
      ),
    },
    {
      title: 'Ngày khởi tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (record) => (
        <div className="author-info">
          <Title level={5}>{record}</Title>
        </div>
      ),
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (record) => (
        <div className="author-info">
          <Title level={5}>{record}</Title>
        </div>
      ),
    },

    {
      key: 'action',
      render: (record) => (
        <>
          <div className="author-info">
            <Button type="text">
              <EditOutlined onClick={() => handleEdit(record.id)} style={{ color: 'green' }} />
            </Button>
            <Button type="text" danger onClick={() => handleDelete(record.id)}>
              <DeleteOutlined />
            </Button>
          </div>
        </>
      ),
    },
  ];

  //gọi redux
  const dispatch = useDispatch();
  const page = useSelector(selectUserPage);
  const size = useSelector(selectUserSizePage);
  const Totalpage = useSelector(selectUserTotalRow);
  const getAllUser = useSelector(selectUser);
  const pendingState = useSelector(selectUserPending);

  useEffect(() => {
    const payload = { page, size };
    //gọi api thông qua redux
    dispatch(getAllUserAsync(payload));
  }, []);
  const convertedData = getAllUser?.data.map((user, index) => {
    return {
      key: index.toString(),
      account_type: user.account_type,
      status: user.status,
      RoleId: user.RoleId,
      email: user.email,
      phone: user.phone,
      authCode: user.authCode,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  });
  //hàm phan trang
  const handlePageChange = (page, pageSize) => {
    const payload = { page, pageSize };
    dispatch(getAllUserAsync(payload));
  };

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Danh sách người dùng"
            >
              <div className="table-responsive">
                <Table
                  bordered={true}
                  columns={columns}
                  loading={pendingState} //truyền peding
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
    </>
  );
}

export default User;
