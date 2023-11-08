import React, { useEffect, useState } from 'react';
import TableFormat from '../../components/table';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllUniversity,
  selectUniversityPage,
  selectUniversityPagesize,
  selectUniversityPending,
  selectUniversityToalRow,
  selectUniversity,
} from '../../redux/universitySlice';
import { Button, Pagination, Space, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Modals from './modal';
import { openModal } from '../../redux/modalSlice';

function ManageUniversity() {
  const handleEdit = (id) => {
    const payload = { actionName: 'edit', id };
    dispatch(openModal(payload));
  };

  const handleDelete = (id) => {
    const payload = { actionName: 'delete', id };
    dispatch(openModal(payload));
  };

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
      width: 300,
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

  //goi redux
  const dispatch = useDispatch();
  const page = useSelector(selectUniversityPage);
  const size = useSelector(selectUniversityPagesize);
  const Totalpage = useSelector(selectUniversityToalRow);
  const getUniversity = useSelector(selectUniversity);
  const pendingState = useSelector(selectUniversityPending);

  useEffect(() => {
    const payload = { page, size };
    dispatch(getAllUniversity(payload));
  }, []);

  const handlePageChange = (page, pageSize) => {
    const payload = { page, pageSize };
    dispatch(getAllUniversity(payload));
  };

  const handleOnNew = () => {
    const payload = { actionName: 'create' };
    dispatch(openModal(payload));
  };
  return (
    <div>
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Danh sách các trường</Typography.Title>
        <Button type="primary" onClick={handleOnNew}>
          Thêm mới
        </Button>
        <TableFormat loading={pendingState} columns={columns} data={getUniversity} />

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

      <Modals />
    </div>
  );
}

export default ManageUniversity;
