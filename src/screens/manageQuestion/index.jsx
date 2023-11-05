import { Button, Space, Table, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMbtiQuestion, selectMBTIQuestions } from '../../redux/mbtiSlice';
import TableFormat from '../../components/table';
const columns = [
  {
    title: 'Câu hỏi',
    dataIndex: 'question',
    key: 'question',
    width: 300,
  },
  {
    title: 'Lựa chọn 1',
    dataIndex: 'Answers1',
    key: 'Answers1',
    //cách hiển thị khác khi answer là 1 mảng
    // render: (Answers) => (
    //   <ul style={{ paddingLeft: '3%' }}>
    //     {Answers.map((answer, index) => (
    //       <React.Fragment key={index}>
    //         {index === 0 && <li key={index}>{answer}</li>}
    //         {index === 1 && <li key={index}>value: {answer}</li>}
    //       </React.Fragment>
    //     ))}
    //   </ul>
    // ),
  },
  {
    title: 'Giá trị 1',
    dataIndex: 'vaule1',
    key: 'vaule1',
  },
  {
    title: 'Lựa chọn 2',
    dataIndex: 'Answers2',
    key: 'Answers2',
  },
  {
    title: 'Giá trị 2',
    dataIndex: 'vaule2',
    key: 'vaule2',
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
function ManageQuestion() {
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1, // Trang mặc định là trang 1
    pageSize: 10, // Số dòng trên mỗi trang mặc định là 10
    total: 0, // Tổng số dòng dữ liệu
  });

  const dispatch = useDispatch();

  const getMbtiData = useSelector(selectMBTIQuestions);
  useEffect(() => {
    dispatch(getMbtiQuestion(pagination.current, pagination.pageSize));
  }, []);

  return (
    <div>
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Danh sách câu hỏi</Typography.Title>
        <TableFormat columns={columns} data={getMbtiData} />
      </Space>
    </div>
  );
}

export default ManageQuestion;
