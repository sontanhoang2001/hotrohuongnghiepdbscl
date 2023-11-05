import React, { useEffect, useState } from 'react';
import TableFormat from '../../components/table';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUniversity, selectUniversity } from '../../redux/universitySlice';
import { Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const columns = [
  {
    title: 'STT',
    dataIndex: 'id',
    key: 'id',
    width: 50,
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name',
    width: 100,
  },
  {
    title: 'Hình ảnh',
    dataIndex: 'image',
    key: 'image',
    width: 100,
    render: (record) => {
      // console.log(record);
      return <img src={record} alt="record" style={{ width: '40px', height: '40px' }} />;
    },
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    key: 'address',
    width: 100,
  },
  {
    title: 'Tỉnh',
    dataIndex: 'province',
    key: 'province',
    width: 100,
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
    title: 'Năm',
    dataIndex: 'lat',
    key: 'lat',
    width: 150,
  },
  {
    title: 'Ngày cập nhật',
    dataIndex: 'long',
    key: 'long',
    width: 150,
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'description',
    width: 200,
  },
  {
    title: 'Link',
    dataIndex: 'url',
    key: 'url',
    width: 150,
  },
  {
    title: 'Rank',
    dataIndex: 'rank',
    key: 'rank',
    width: 150,
  },
  {
    key: 'action',
    render: (record) => {
      return (
        <>
          <Button type="text">
            <EditOutlined style={{ color: 'green' }} />
          </Button>
          <Button type="text" danger>
            <DeleteOutlined />
          </Button>
        </>
      );
    },
  },
];
function ManageUniversity() {
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1, // Trang mặc định là trang 1
    pageSize: 10, // Số dòng trên mỗi trang mặc định là 10
    total: 0, // Tổng số dòng dữ liệu
  });

  //goi redux
  const dispatch = useDispatch();
  const getUniversity = useSelector(selectUniversity);
  useEffect(() => {
    dispatch(getAllUniversity(pagination.current, pagination.pageSize));
  }, []);
  console.log(getUniversity);

  return (
    <div>
      <TableFormat columns={columns} data={getUniversity} scroll={{ x: 'max-content', y: 400 }} />
    </div>
  );
}

export default ManageUniversity;
