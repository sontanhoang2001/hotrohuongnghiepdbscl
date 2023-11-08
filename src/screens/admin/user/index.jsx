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
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'account_type',
      dataIndex: 'account_type',
      key: 'account_type',
    },
    {
      title: 'trạng thái',
      dataIndex: 'status',
      key: 'status',
    },

    {
      title: 'Loại tk',
      dataIndex: 'RoleId',
      key: 'RoleId',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Mã xác thực',
      dataIndex: 'authCode',
      key: 'authCode',
    },
    {
      title: 'Ngày khởi tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },

    {
      key: 'action',
      dataIndex: 'action',
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
      id: (
        <>
          <div className="author-info">
            <Title level={5}>{user.id}</Title>
          </div>
        </>
      ),
      account_type: (
        <>
          {user.account_type === 1 ? (
            <div className="author-info">
              <Tag color={'Orange'} key={user.account_type}>
                <GoogleOutlined /> Google
              </Tag>
            </div>
          ) : (
            <div className="author-info">
              <Tag color={'green'} key={user.account_type}>
                Bình thường
              </Tag>
            </div>
          )}
        </>
      ),
      status: (
        <>
          {user.status === 1 ? (
            <div className="author-info">
              <Tag color={'geekblue'} key={user.status}>
                Hoạt động
              </Tag>
            </div>
          ) : (
            <div className="author-info">
              <Tag color={'volcano'} key={user.status}>
                Không hoạt động
              </Tag>
            </div>
          )}
        </>
      ),
      RoleId: (
        <>
          {user.RoleId === 1 ? (
            <div className="author-info">
              <Tag color={'geekblue'} key={user.RoleId}>
                Admin
              </Tag>
            </div>
          ) : user.RoleId === 5 ? (
            <div className="author-info">
              <Tag color={'green'} key={user.RoleId}>
                Học Sinh
              </Tag>
            </div>
          ) : (
            <div className="author-info">
              <Tag color={'volcano'} key={user.RoleId}>
                Không xác định
              </Tag>
            </div>
          )}
        </>
      ),
      email: (
        <>
          <div className="author-info">
            <Title level={5}>{user.email}</Title>
          </div>
        </>
      ),
      phone: (
        <>
          <div className="author-info">
            <Title level={5}>{user.phone}</Title>
          </div>
        </>
      ),
      authCode: (
        <>
          <div className="author-info">
            <Title level={5}>{user.authCode}</Title>
          </div>
        </>
      ),
      createdAt: (
        <>
          <div className="author-info">
            <Title level={5}>{user.createdAt}</Title>
          </div>
        </>
      ),
      updatedAt: (
        <>
          <div className="author-info">
            <Title level={5}>{user.updatedAt}</Title>
          </div>
        </>
      ),
      action: (
        <>
          <div className="author-info">
            <Button type="text">
              <EditOutlined onClick={() => handleEdit(user.id)} style={{ color: 'green' }} />
            </Button>
            <Button type="text" danger onClick={() => handleDelete(user.id)}>
              <DeleteOutlined />
            </Button>
          </div>
        </>
      ),
    };
  });
  //hàm phan trang
  const handlePageChange = (page, pageSize) => {
    const payload = { page, pageSize };
    dispatch(getAllUserAsync(payload));
  };

  //thay đổi trang thái table với fillter
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Danh sách người dùng"
              extra={
                <>
                  <Radio.Group onChange={onChange} defaultValue="a">
                    <Radio.Button value="a">All</Radio.Button>
                    <Radio.Button value="b">ONLINE</Radio.Button>
                  </Radio.Group>
                </>
              }
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
