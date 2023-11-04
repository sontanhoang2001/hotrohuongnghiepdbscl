import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Avatar, Space, Typography } from 'antd';
import Table from 'rc-table';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserAsync, selectUser } from '../../redux/userSlice.js';

const columns = [
  {
    title: 'STT',
    dataIndex: 'id',
    width: 50,
  },
  {
    title: 'account_type',
    dataIndex: 'account_type',
    width: 100,
  },
  {
    title: 'trạng thái',
    dataIndex: 'status',
    width: 100,
  },
  {
    title: 'Mã xác thực',
    dataIndex: 'authCode',
    width: 200,
  },

  {
    title: 'Loại tk',
    dataIndex: 'RoleId',
    width: 100,
  },
  {
    title: 'email',
    dataIndex: 'email',
    width: 100,
  },
  {
    title: 'SĐT',
    dataIndex: 'phone',
    width: 100,
  },
  {
    title: 'Ngày khởi tạo',
    dataIndex: 'createdAt',
    width: 150,
  },
  {
    title: 'Ngày cập nhật',
    dataIndex: 'updatedAt',
    width: 150,
  },
];

function ManageUser() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState('1');
  const [size, setSize] = useState('10');
  const [data, setData] = useState();

  //gọi redux
  const dispatch = useDispatch();
  // const getAllUser = useSelector(
  //   (state) => selectUser(state),
  //   (prev, next) => {
  //     return prev === next; // Bảo đảm rằng component chỉ re-render khi giá trị thực sự thay đổi
  //   },
  // );
  const getAllUser = useSelector(selectUser);
  useEffect(() => {
    dispatch(getAllUserAsync(page, size));

    // console.log(getAllUser);
  }, []);
  console.log(getAllUser);
  const dataSource = getAllUser?.map((item) => {
    return {
      key: item.id.toString(),
      id: item.id,
      account_type: item.account_type,
      email: item.email,
      phone: item.phone,
      authCode: item.authCode,
      roleId: item.roleId,
      status: item.status, // Thay thế giá trị tương ứng với account_type
      createdAt: item.phocreatedAtne,
      updatedAt: item.updatedAt,
    };
  });
  console.log(dataSource);

  return (
    <div>
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Quản Lý Người Dùng</Typography.Title>
        <Table
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          // pagination={{
          //   pageSize: 5,
          // }}
        ></Table>
      </Space>
    </div>
  );
}

export default ManageUser;
