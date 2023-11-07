import React, { useEffect, useState } from 'react';
import TableFormat from '../../components/table';
import { useDispatch, useSelector } from 'react-redux';
import CommonModal from '../../components/CommonModal';

import {
  getAllUniversity,
  selectUniversityPage,
  selectUniversityPagesize,
  selectUniversityPending,
  selectUniversityToalRow,
  selectUniversity,
} from '../../redux/universitySlice';
import { Button, Input, Pagination, Space, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Form } from 'react-router-dom';

function ManageUniversity() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Thực hiện logic khi ấn OK
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
  return (
    <div>
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Danh sách các trường</Typography.Title>
        <Button type="primary" onClick={showModal}>
          Tạo mới
        </Button>
        <CommonModal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Form.Item
            name="url"
            label="URL"
          >
            <Input placeholder="input placeholder" />
          </Form.Item>
        </CommonModal>

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
    </div>
  );
}

export default ManageUniversity;
