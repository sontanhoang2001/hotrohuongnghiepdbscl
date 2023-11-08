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
      title: 'STT',
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
    },
    {
      title: 'Giá trị',
      dataIndex: 'value',
      key: 'value',
    },

    {
      key: 'action',
      dataIndex: 'action',
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

      question: (
        <>
          <div className="author-info">
            <Title level={5}>{mbti.question}</Title>
          </div>
        </>
      ),
      answers: (
        <>
          <div className="author-info">
            <List
              size="small"
              bordered
              dataSource={mbti.Answers}
              renderItem={(item, idx) => (
                <List.Item>
                  {idx + 1}. {item.answer}
                </List.Item>
              )}
            />
          </div>
        </>
      ),
      value: (
        <>
          <div className="author-info">
            <List
              size="small"
              bordered
              dataSource={mbti.Answers}
              renderItem={(item, idx) => (
                <List.Item>
                  <CaretRightOutlined /> {item.value}
                </List.Item>
              )}
            />
          </div>
        </>
      ),
      action: (
        <>
          <div className="author-info">
            <Button type="text">
              <EditOutlined style={{ color: 'green' }} onClick={() => handleEdit(mbti.id)} />
            </Button>
            <Button type="text" danger onClick={() => handleDelete(mbti.id)}>
              <DeleteOutlined />
            </Button>
          </div>
        </>
      ),
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
