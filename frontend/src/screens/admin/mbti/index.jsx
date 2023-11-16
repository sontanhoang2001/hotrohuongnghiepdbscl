import { Row, Col, Card, Table, Button, Typography, Pagination, List } from 'antd';

import { DeleteOutlined, EditOutlined, CaretRightOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  getMbtiQuestion,
  selectMbtiPage,
  selectMbtiPagesize,
  selectMbtiPending,
  selectMbtiQuestions,
  selectMbtiToalRow,
} from '../../../redux/mbtiSlice';

const { Title } = Typography;

function Mbti() {
  //hàm bắt event edit
  const handleEdit = (id) => {
    console.log(id);
  };
  //hàm bắt event delete
  const handleDelete = (id) => {
    console.log(id);
  };
  //định dạng cột hiển thị
  const columns = [
    {
      title: 'Câu hỏi',
      dataIndex: 'question',
      key: 'question',
      reder: (record) => (
        <div className="author-info">
          <Title level={5}>{record}</Title>
        </div>
      ),
    },
    {
      title: 'Đáp án',
      dataIndex: 'answers',
      key: 'answers',
      render: (record) => (
        <div className="author-info">
          <List
            size="small"
            bordered
            dataSource={record}
            renderItem={(item, idx) => (
              <List.Item>
                {idx + 1}. {item.answer}
              </List.Item>
            )}
          />
        </div>
      ),
    },
    {
      title: 'Giá trị',
      dataIndex: 'value',
      key: 'value',
      render: (record) => (
        <div className="author-info">
          <List
            size="small"
            bordered
            dataSource={record}
            renderItem={(item, idx) => (
              <List.Item>
                <CaretRightOutlined /> {item.value}
              </List.Item>
            )}
          />
        </div>
      ),
    },

    {
      key: 'action',
      render: (record) => (
        <>
          <div className="author-info">
            <Button type="text">
              <EditOutlined onClick={() => handleEdit(record.id)} style={{ color: 'green' }} />
            </Button>
            <Button type="text" danger onClick={() => handleDelete(record.id)}>
              <DeleteOutlined />
            </Button>
          </div>
        </>
      ),
    },
  ];

  //gọi redux
  const dispatch = useDispatch();
  const getMbtiData = useSelector(selectMbtiQuestions);
  const page = useSelector(selectMbtiPage);
  const size = useSelector(selectMbtiPagesize);
  const Totalpage = useSelector(selectMbtiToalRow);
  const pendingState = useSelector(selectMbtiPending);

  useEffect(() => {
    const payload = { page, size };
    //gọi api thông qua redux
    dispatch(getMbtiQuestion(payload));
  }, []);

  const convertedData = getMbtiData?.data.map((mbti, index) => {
    return {
      key: index.toString(),
      id: mbti.id,
      question: mbti.question,
      answers: mbti.Answers,
      value: mbti.Answers,
    };
  });

  //hàm phan trang
  const handlePageChange = (page, pageSize) => {
    const payload = { page, pageSize };
    dispatch(getMbtiQuestion(payload));
  };

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card bordered={false} className="criclebox tablespace mb-24" title="Danh sách câu hỏi">
              <div className="table-responsive">
                <Table
                  bordered={true}
                  columns={columns}
                  loading={pendingState}
                  dataSource={convertedData}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
              <Pagination
                current={page}
                pageSize={size}
                total={Totalpage}
                onChange={handlePageChange}
                showQuickJumper
                showSizeChanger
                onShowSizeChange={handlePageChange}
                style={{ marginTop: 20, marginBottom: 20 }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Mbti;
