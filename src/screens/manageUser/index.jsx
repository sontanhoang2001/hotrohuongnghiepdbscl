import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Avatar, Space, Tag, Typography } from 'antd';
import Table from 'rc-table';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserAsync, selectUser } from '../../redux/userSlice.js';
import TableTest from './table.jsx';
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
    title: 'Mã xác thực',
    dataIndex: 'authCode',
    key: 'authCode',
    width: 150,
  },
];
function ManageUser() {
  const [loading, setLoading] = useState(true);

  //gọi redux
  const dispatch = useDispatch();
  const getAllUser = useSelector(selectUser);
  useEffect(() => {
    dispatch(getAllUserAsync(2, 10));
    if (getAllUser != null && getAllUser !== undefined) {
      setLoading(false);
      console.log(loading);
    }
  }, []);
  // console.log(getAllUser);

  return (
    <div>
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Quản Lý Người Dùng</Typography.Title>
        <TableTest columns={columns} data={getAllUser} />
      </Space>
    </div>
  );
}

export default ManageUser;
