import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import authApi from '../../api/auth';
import { Avatar, Space, Typography } from 'antd';
import Table from 'rc-table';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAsync, selectUser } from '../../redux/userSlice.js';

import {} from '../../redux/userSlice';

function ManageUser() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    // const testUser = async () => {
    //   try {
    //     //chưa khởi tạo getUser.js
    //     const result = await authApi.getUser();
    //     setDataSource(result.data);
    //     console.log('result', result);
    //   } catch (error) {}
    // };
    setLoading(true);
    dispatch(getUserAsync());
  }, [dispatch]);

  return (
    <div>
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Customers</Typography.Title>
        <Table
          loading={loading}
          columns={[
            {
              title: 'STT',
              dataIndex: 'id',
            },
            {
              title: 'Avatar',
              dataIndex: 'image',
              render: (link) => {
                return <Avatar src={link} />;
              },
            },
            {
              title: 'Loại TK',
              dataIndex: 'account_type',
            },
            {
              title: 'Họ và tên',
              dataIndex: 'fullname',
            },
            {
              title: 'Username',
              dataIndex: 'username',
            },
            {
              title: 'Password',
              dataIndex: 'password',
            },
            {
              title: 'Ngày sinh',
              dataIndex: 'email',
            },
            {
              title: 'email',
              dataIndex: 'email',
            },
            {
              title: 'Phone',
              dataIndex: 'phone',
            },
            {
              title: 'Địa chỉ',
              dataIndex: 'address',
            },

            {
              title: 'role',
              dataIndex: 'role',
            },
            {
              title: 'Ngày khởi tạo',
              dataIndex: 'createdAt',
            },
            {
              title: 'Ngày cập nhật',
              dataIndex: 'updatedAt',
            },
          ]}
          dataSource={dataSource}
          pagination={{
            pageSize: 5,
          }}
        ></Table>
      </Space>
    </div>
  );
}

export default ManageUser;
