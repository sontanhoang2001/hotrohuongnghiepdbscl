import { Button, Pagination, Select, Space, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMbtiQuestion,
  selectMbtiQuestions,
  selectMbtiPage,
  selectMbtiPagesize,
  selectMbtiPending,
  selectMbtiToalRow,
} from '../../redux/mbtiSlice';
import TableFormat from '../../components/table';

function ManageQuestion() {
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleChange = (selectedIndex) => {
    setSelectedAnswer(selectedIndex);
  };

  const handleEdit = (record) => {
    console.log(record);
  };

  const handleDelete = (record) => {
    console.log(record);
  };

  const columns = [
    {
      title: 'Câu hỏi',
      dataIndex: 'id',
      key: 'id',
      width: 50,
    },
    {
      title: 'Câu hỏi',
      dataIndex: 'question',
      key: 'question',
      width: 300,
    },
    {
      title: 'Đáp án',
      dataIndex: 'answers',
      key: 'answers',
      render: (Answers) => (
        <Select
          size={'middle'}
          defaultValue={Answers[0].label}
          onChange={(value, option) => {
            const selectedIndex = Answers.findIndex((item) => item.value === value);
            // selectedIndex chứa chỉ mục của tùy chọn đã chọn
            handleChange(selectedIndex);
          }}
          options={Answers}
        />
      ),
    },
    {
      title: 'Giá trị',
      dataIndex: 'value',
      key: 'value',
      render: (value) => {
        return value[selectedAnswer]?.label;
      },
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
  const getMbtiData = useSelector(selectMbtiQuestions);
  const page = useSelector(selectMbtiPage);
  const size = useSelector(selectMbtiPagesize);
  const totalPage = useSelector(selectMbtiToalRow);
  const pendingState = useSelector(selectMbtiPending);

  useEffect(() => {
    //     dispatch(getMbtiQuestion(page, pageSize).then(() => {
    //   setPagination({ ...pagination, total: selectTotal });
    // });
    const payload = { page, size };
    dispatch(getMbtiQuestion(payload));
  }, []);

  const handlePageChange = (page, pageSize) => {
    const payload = { page, pageSize };
    dispatch(getMbtiQuestion(payload));
  };
  // console.log(selectTotal);
  return (
    <div>
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Danh sách câu hỏi</Typography.Title>
        <TableFormat loading={pendingState} columns={columns} data={getMbtiData} />

        <Pagination
          current={page}
          pageSize={size}
          total={totalPage}
          onChange={handlePageChange}
          showQuickJumper
          showSizeChanger
          onShowSizeChange={handlePageChange}
        />
      </Space>
    </div>
  );
}

export default ManageQuestion;
