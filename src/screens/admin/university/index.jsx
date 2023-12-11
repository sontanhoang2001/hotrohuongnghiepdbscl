import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Button,
  Avatar,
  Typography,
  Pagination,
  Popconfirm,
  Select,
} from 'antd';

import { DeleteOutlined, EditOutlined, LockFilled, UndoOutlined } from '@ant-design/icons';

import {
  deleteOrganization,
  deleteUniversity,
  getAllUniversity,
  restoreOrganization,
  selectUniversity,
  selectUniversityPage,
  selectUniversityPagesize,
  selectUniversityPending,
  selectUniversityToalRow,
} from '../../../redux/universitySlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';

const { Title } = Typography;

function University() {
  //goi redux
  const dispatch = useDispatch();
  const { size, page, total } = useSelector((state) => state.university);
  const getUniversity = useSelector(selectUniversity);
  const pendingState = useSelector(selectUniversityPending);

  useEffect(() => {
    const payload = { page, size };
    //gọi api thông qua redux
    dispatch(getAllUniversity(payload));
  }, [dispatch, page, size]);

  const convertedData = useMemo(
    () =>
      getUniversity?.data.map((university, index) => {
        return {
          key: index.toString(),
          id: university.OrganizationDetail.id,
          name: university,
          organizationName: university.OrganizationType.name,
          rank: university.OrganizationDetail.rank,
          url: university.OrganizationDetail.url,
          address: university.OrganizationDetail.address,
          province: university.OrganizationDetail.province,
          phone: university.OrganizationDetail.phone,
          lat: university.OrganizationDetail.lat,
          long: university.OrganizationDetail.long,
          description: university.OrganizationDetail.description,
          deletedAt: university.deletedAt,
        };
      }),
    [getUniversity],
  );
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
        title: 'Loại',
        dataIndex: 'organizationName',
        key: 'organizationName',
        render: (record) => (
          <div className="author-info">
            <Title level={5}>{record}</Title>
          </div>
        ),
      },
      // {
      //   title: 'Rank',
      //   dataIndex: 'rank',
      //   key: 'rank',
      //   render: (record) => (
      //     <div className="author-info">
      //       <Title level={5}>{record}</Title>
      //     </div>
      //   ),
      // },
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
        render: (record) => <span>{record.description}</span>,
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
            {record.deletedAt === null && (
              <Popconfirm
                placement="leftTop"
                title="Xác nhận xóa"
                okText="Xóa"
                onConfirm={() => handleDelete(record.id)}
                cancelText="Hủy"
              >
                <Button danger>
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
            )}
            {record.deletedAt !== null && (
              <Popconfirm
                placement="leftTop"
                title="Xác nhận khôi phục"
                okText="Khôi phục"
                onConfirm={() => handleRestore(record.id)}
                cancelText="Hủy"
              >
                <Button danger>
                  <UndoOutlined />
                </Button>
              </Popconfirm>
            )}
          </>
        ),
      },
    ],
    [],
  );

  //hàm bắt event delete
  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteOrganization(id)).then(() => {
      dispatch(getAllUniversity({ page, size }));
    });
  };
  //restore
  const handleRestore = (id) => {
    dispatch(restoreOrganization(id)).then(() => {
      dispatch(getAllUniversity({ page, size }));
    });
  };

  //hàm phan trang
  const handlePageChange = (page, pageSize) => {
    const payload = { page, size: pageSize };
    dispatch(getAllUniversity(payload));
  };
  //hàm filter theo loại tổ chức
  const handleChangeOrganizationType = (value) => {
    console.log(value);
    dispatch(getAllUniversity({ page: 1, size: 10, organizationType: value, search: '' }));
  };

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col span={24}>
            {/* <Select
              defaultValue="Tất cả"
              style={{
                width: 200,
              }}
              onChange={handleChangeOrganizationType}
              options={[
                {
                  label: 'Tất cả',
                  value: '',
                },
                {
                  label: 'University',
                  value: '1',
                },
                {
                  label: 'Company',
                  value: '2',
                },
              ]}
            /> */}
          </Col>
          <Col xs="24" xl={24}>
            <Card bordered={false} className="criclebox tablespace mb-24" title="Danh sách tổ chức">
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
                total={total}
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
