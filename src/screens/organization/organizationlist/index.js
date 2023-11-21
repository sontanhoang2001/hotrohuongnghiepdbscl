import {
    Row,
    Col,
    Card,
    Table,
    Button,
    Avatar,
    Typography,
    Pagination,
    Popconfirm,
  } from 'antd';
  
  import { InfoCircleFilled, LockFilled } from '@ant-design/icons';
  
  import {
    deleteOrganization,
    getAllOrganizationsByUser,
    getAllUniversity,
    selectUniversity,
    selectUniversityPage,
    selectUniversityPagesize,
    selectUniversityPending,
    selectUniversityToalRow,
  } from '../../../redux/universitySlice';
  import { useDispatch, useSelector } from 'react-redux';
  import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
  
  const { Title } = Typography;
  
  function OrganizationList() {
    //hàm bắt event edit
    const handleEdit = (id) => {
      console.log(id);
    };
    //hàm bắt event delete
    const handleDelete = (id) => {
      dispatch(deleteOrganization(id));
    };
    //định dạng cột hiển thị
    const columns = useMemo(
      () => [
        {
          title: 'Tên',
          fixed: 'left',
          dataIndex: 'name',
          key: 'name',
          render: (record) => (
            <Avatar.Group>
              <Avatar
                className="shape-avatar"
                shape="square"
                size={40}
                src={record.OrganizationDetail.image}
              ></Avatar>
              <div className="avatar-info">
                {/* <Title level={5}>{university.name}</Title> */}
                <Title level={5}>{record.name}</Title>
                <p>{record.OrganizationDetail.email}</p>
                {/* <p>{university.OrganizationDetail.email}</p> */}
              </div>
            </Avatar.Group>
          ),
        },
        {
          title: 'Rank',
          dataIndex: 'rank',
          key: 'rank',
          render: (record) => (
            <div className="author-info">
              <Title level={5}>{record}</Title>
            </div>
          ),
        },
        {
          title: 'Địa chỉ',
          dataIndex: 'address',
          key: 'address',
          render: (record) => (
            <div className="author-info">
              <Title level={5}>{record}</Title>
            </div>
          ),
        },
        {
          title: 'Tỉnh',
          dataIndex: 'province',
          key: 'province',
          render: (record) => (
            <div className="author-info">
              <Title level={5}>{record}</Title>
            </div>
          ),
        },
  
        {
          title: 'SĐT',
          dataIndex: 'phone',
          key: 'phone',
          render: (record) => (
            <div className="author-info">
              <Title level={5}>{record}</Title>
            </div>
          ),
        },
        {
          title: 'Năm',
          dataIndex: 'lat',
          key: 'lat',
          render: (record) => (
            <div className="author-info">
              <Title level={5}>{record}</Title>
            </div>
          ),
        },
        {
          title: 'Ngày cập nhật',
          dataIndex: 'long',
          key: 'long',
          render: (record) => (
            <div className="author-info">
              <Title level={5}>{record}</Title>
            </div>
          ),
        },
        {
          title: 'Mô tả',
          key: 'description',
          width: 100,
          render: (record) => (<span>{record.description}</span>)
        },
        {
          title: 'Link',
          dataIndex: 'url',
          key: 'url',
          render: (record) => (
            <div className="author-info">
              <Title level={5}>
                <a href={record} rel="noopener noreferrer" target="_blank">
                  {record}
                </a>
              </Title>
            </div>
          ),
        },
        {
          key: 'action',
          title: 'Thao tác',
          fixed: 'right',
          width: 100,
          render: (record) => (
            <>            
            <Link to={`/organization/${record.id}`}>
            <Button  title='Xem chi tiết'>
                  <InfoCircleFilled />
                </Button>
            </Link>
                
            </>
          ),
        },
      ],
      [],
    );
  
    //goi redux
    const dispatch = useDispatch();
    const {joinedOrganizations}=useSelector(state=>state.university)
    const page = useSelector(selectUniversityPage);
    const size = useSelector(selectUniversityPagesize);
    const Totalpage = useSelector(selectUniversityToalRow);
    const getUniversity = useSelector(selectUniversity);
    const pendingState = useSelector(selectUniversityPending);
  
    useEffect(() => {
      
      //gọi api thông qua redux
      dispatch(getAllOrganizationsByUser());
    }, []);
  
    const convertedData = useMemo(
      () =>
      joinedOrganizations?.map((university, index) => {
          return {
            key: index.toString(),
            id: university.OrganizationDetail.id,
            name: university,
            rank: university.OrganizationDetail.rank,
            url: university.OrganizationDetail.url,
            address: university.OrganizationDetail.address,
            province: university.OrganizationDetail.province,
            phone: university.OrganizationDetail.phone,
            lat: university.OrganizationDetail.lat,
            long: university.OrganizationDetail.long,
            description: university.OrganizationDetail.description,
          };
        }),
      [joinedOrganizations],
    );
  
    //hàm phan trang
    const handlePageChange = (page, pageSize) => {
      const payload = { page, pageSize };
      dispatch(getAllUniversity(payload));
    };
  
    return (
      <>
        <div className="tabled">
          <Row gutter={[24, 0]}>
            <Col xs="24" xl={24}>
              <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="Danh sách trường học"
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
  
  export default OrganizationList;
  