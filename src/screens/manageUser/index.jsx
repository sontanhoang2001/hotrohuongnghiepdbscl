import React from 'react';
import { useEffect } from 'react';
import { Button, Pagination, Space, Tag, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllUserAsync,
  selectUser,
  selectUserPage,
  selectUserPending,
  selectUserSizePage,
  selectUserTotalRow,
} from '../../redux/userSlice.js';
import TableFormat from '../../components/table/index.jsx';

function ManageUser() {
  const handleEdit = (record) => {
    console.log(record);
  };

  const handleDelete = (record) => {
    console.log(record);
  };
  const columns = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
      width: 50,
    },
    {
      title: 'account_type',
      dataIndex: 'account_type',
      key: 'account_type',
      width: 100,
    },
    {
      title: 'trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (account_type) => {
        let color = '';
        let text = '';
        switch (account_type) {
          case 1:
            color = 'geekblue';
            text = 'Active';
            break;
          default:
            color = 'volcano';
            text = 'Inactive';
        }
        return (
          <Tag color={color} key={account_type}>
            {text}
          </Tag>
        );
      },
    },

    {
      title: 'Loại tk',
      dataIndex: 'RoleId',
      key: 'RoleId',
      width: 100,
      render: (account_type) => {
        let color = '';
        let text = '';
        switch (account_type) {
          case 1:
            color = 'geekblue';
            text = 'Admin';
            break;
          case 5:
            color = 'green';
            text = 'Student';
            break;

          default:
            color = 'volcano';
            text = 'Undifined';
        }
        return (
          <Tag color={color} key={account_type}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
      width: 100,
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
      key: 'phone',
      width: 100,
    },
    {
      title: 'Mã xác thực',
      dataIndex: 'authCode',
      key: 'authCode',
      width: 150,
    },
    {
      title: 'Ngày khởi tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 150,
    },

    {
      key: 'action',
      render: (record) => {
        return (
          <>
            <Button type="text">
              <EditOutlined onClick={() => handleEdit(record.id)} style={{ color: 'green' }} />
            </Button>
            <Button type="text" danger onClick={() => handleDelete(record.id)}>
              <DeleteOutlined />
            </Button>
          </>
        );
      },
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
    dispatch(getAllUserAsync(payload));
  }, []);

  const handlePageChange = (page, pageSize) => {
    const payload = { page, pageSize };
    dispatch(getAllUserAsync(payload));
  };
  return (
    <div>
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Quản Lý Người Dùng</Typography.Title>
        <TableFormat loading={pendingState} columns={columns} data={getAllUser} />
        <Pagination
          current={page}
          pageSize={size}
          total={Totalpage}
          onChange={handlePageChange}
          showQuickJumper
          showSizeChanger
          onShowSizeChange={handlePageChange}
        />
      </Space>
    </div>
  );
}

export default ManageUser;
