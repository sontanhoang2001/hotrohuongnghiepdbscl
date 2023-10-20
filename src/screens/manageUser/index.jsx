import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import authApi from '../../api/auth';
import { Avatar, Space, Typography } from 'antd';
import Table from 'rc-table';

function ManageUser() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  //giá trị mặc định của người dùng
  // const [userData, setUserData] = useState({
  //   id: 0,
  //   account_type: 0,
  //   username: '',
  //   password: null,
  //   fullname: 'unknow',
  //   avatar:
  //     'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fen%2Fsearch%3Fq%3Duser&psig=AOvVaw0J1XTXtOJjRHEsOUcRLZz3&ust=1697902769888000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNjnj-76hIIDFQAAAAAdAAAAABAE',
  //   email: 'unknow.@gmail.com',
  //   birthday: 'dd/mm/yyyy',
  //   phone: '098765432',
  //   address: null,
  //   role: null,
  //   createdAt: null,
  //   updatedAt: null,
  // });

  useEffect(() => {
    setLoading(true);
    const testUser = async () => {
      try {
        //chưa khởi tạo getUser.js
        const result = await authApi.getUser();
        setDataSource(result.data);
        console.log('result', result);
      } catch (error) {}
    };
  }, []);

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
