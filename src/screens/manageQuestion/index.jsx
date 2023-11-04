import { Button, Space, Table, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMbtiQuestion, selectMBTIQuestions } from '../../redux/mbtiSlice';

function ManageQuestion() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const [page, setPage] = useState(1);
  const [size, setsize] = useState(10);

  const dispatch = useDispatch();

  const getMbtiData = useSelector(selectMBTIQuestions);
  useEffect(() => {
    dispatch(getMbtiQuestion({ page: page, size: size }));
    if (getMbtiData && getMbtiData?.data && getMbtiData != null && getMbtiData !== undefined) {
      setDataSource(getMbtiData.data);
    }
    setPage();
    setsize();

    // setLoading(true);
    //   getCustomers().then((res) => {
    //     setDataSource(res.users);
    //     setLoading(false);
    //   });
  }, [dataSource, page, size]);

  const columns = [
    {
      title: 'Câu hỏi',
      dataIndex: 'question',
      key: 'question',
      width: 200,
    },
    {
      title: 'Đáp án',
      dataIndex: 'Answers',
      key: 'Answers',
      render: (Answers) => (
        <ul>
          {Answers.map((answer, index) => (
            <li key={index}>{answer.answer}</li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div>
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Customers</Typography.Title>
        <Table
          loading={loading}
          columns={columns}
          dataSource={dataSource.data}
          pagination={{
            pageSize: 5,
          }}
        ></Table>
      </Space>
    </div>
  );
}

export default ManageQuestion;
