import { Row, Col, Card, Radio, Table, Button, Avatar, Typography, Pagination } from 'antd';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import {
  getAllUniversity,
  selectUniversity,
  selectUniversityPage,
  selectUniversityPagesize,
  selectUniversityPending,
  selectUniversityToalRow,
} from '../../../redux/universitySlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const { Title } = Typography;

function University() {
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
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tỉnh',
      dataIndex: 'province',
      key: 'province',
    },

    {
      title: 'SĐT',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Năm',
      dataIndex: 'lat',
      key: 'lat',
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'long',
      key: 'long',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Link',
      dataIndex: 'url',
      key: 'url',
    },

    {
      key: 'action',
      dataIndex: 'action',
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
    //gọi api thông qua redux
    dispatch(getAllUniversity(payload));
  }, []);

  const convertedData = getUniversity?.data.map((university, index) => {
    return {
      key: index.toString(),
      id: (
        <>
          <div className="author-info">
            <Title level={5}>{university.UniversityDetail.id}</Title>
          </div>
        </>
      ),
      name: (
        <>
          <Avatar.Group>
            <Avatar
              className="shape-avatar"
              shape="square"
              size={40}
              src={university.UniversityDetail.image}
            ></Avatar>
            <div className="avatar-info">
              <Title level={5}>{university.name}</Title>
              <p>{university.UniversityDetail.email}</p>
            </div>
          </Avatar.Group>
        </>
      ),
      rank: (
        <>
          <div className="author-info">
            <Title level={5}>{university.UniversityDetail.rank}</Title>
          </div>
        </>
      ),
      url: (
        <>
          <div className="author-info">
            <Title level={5}>{university.UniversityDetail.url}</Title>
          </div>
        </>
      ),
      address: (
        <>
          <div className="author-info">
            <Title level={5}>{university.UniversityDetail.address}</Title>
          </div>
        </>
      ),
      province: (
        <>
          <div className="author-info">
            <Title level={5}>{university.UniversityDetail.province}</Title>
          </div>
        </>
      ),
      phone: (
        <>
          <div className="author-info">
            <Title level={5}>{university.UniversityDetail.phone}</Title>
          </div>
        </>
      ),
      lat: (
        <>
          <div className="author-info">
            <Title level={5}>{university.UniversityDetail.lat}</Title>
          </div>
        </>
      ),
      long: (
        <>
          <div className="author-info">
            <Title level={5}>{university.UniversityDetail.long}</Title>
          </div>
        </>
      ),
      description: (
        <>
          <div className="author-info">
            <Title level={5}>{university.UniversityDetail.description}</Title>
          </div>
        </>
      ),
      action: (
        <>
          <div className="author-info">
            <Button type="text">
              <EditOutlined
                onClick={() => handleEdit(university.UniversityDetail.id)}
                style={{ color: 'green' }}
              />
            </Button>
            <Button type="text" danger onClick={() => handleDelete(university.UniversityDetail.id)}>
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
    dispatch(getAllUniversity(payload));
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
              title="Danh sách trường học"
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

export default University;
