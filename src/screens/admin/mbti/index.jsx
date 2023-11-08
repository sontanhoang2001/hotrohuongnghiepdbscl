import { Row, Col, Card, Radio, Table, Button, Avatar, Typography, Pagination, Tag } from 'antd';

import { DeleteOutlined, EditOutlined, GoogleOutlined } from '@ant-design/icons';

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
  console.log(getMbtiData);
  console.log('123123 getpending', pendingState);

  const convertedData = getMbtiData?.data.map((user, index) => {
    return {
      key: index.toString(),
      id: (
        <>
          <div className="author-info">
            <Title level={5}>{user.id}</Title>
          </div>
        </>
      ),
      action: (
        <>
          <div className="author-info">
            <Button type="text">
              <EditOutlined onClick={() => handleEdit(user.id)} style={{ color: 'green' }} />
            </Button>
            <Button type="text" danger onClick={() => handleDelete(user.id)}>
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

  //thay đổi trang thái table với fillter
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Danh sách câu hỏi"
              extra={
                <>
                  <Radio.Group onChange={onChange} defaultValue="a">
                    <Radio.Button value="a">All</Radio.Button>
                    <Radio.Button value="b">ONLINE</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  bordered={true}
                  columns={columns}
                  loading={pendingState}
                  dataSource={''}
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
