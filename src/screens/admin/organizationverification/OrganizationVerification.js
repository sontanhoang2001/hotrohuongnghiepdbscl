import { Avatar, Button, Card, Col, Modal, Pagination, Popconfirm, Row, Table } from 'antd';
import React, { useEffect, useMemo } from 'react';
import {
  deleteOrganization,
  getAllOrganizationVerification,
  getLocalOrganizationsById,
  getOrganizationsById,
  selectUniversity,
  selectUniversityPage,
  selectUniversityPagesize,
  selectUniversityPending,
  selectUniversityToalRow,
  setOrganizationParams,
  updateVerificationStatus,
  updateVerificationStatusByAdmin,
} from '../../../redux/universitySlice';
import Title from 'antd/es/typography/Title';
import {
  CheckCircleFilled,
  CloseOutlined,
  DownloadOutlined,
  EyeFilled,
  LockFilled,
  SettingOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Search from 'antd/es/input/Search';

const OrganizationVerification = () => {
  //goi redux
  const dispatch = useDispatch();
  const { verifications, currentVerification, organizationParams, total } = useSelector(
    (state) => state.university,
  );
  const page = useSelector(selectUniversityPage);
  const size = useSelector(selectUniversityPagesize);
  const Totalpage = useSelector(selectUniversityToalRow);
  const pendingState = useSelector(selectUniversityPending);

  //Xử lý yêu cầu
  const [openProcess, setOpenProcess] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const acceptRequest = () => {
    setAccepting(true);
    dispatch(
      updateVerificationStatusByAdmin({ status: 1, organizationId: currentVerification.id }),
    );
    dispatch(getAllOrganizationVerification());
    setAccepting(false);
    setOpenProcess(false);
  };
  const [rejecting, setRejecting] = useState(false);
  const rejectRequest = () => {
    setRejecting(true);
    dispatch(
      updateVerificationStatusByAdmin({ status: 0, organizationId: currentVerification.id }),
    ).then(() => {
      dispatch(getAllOrganizationVerification());
      setRejecting(false);
      setOpenProcess(false);
    });
  };

  //hàm bắt event process
  const handleProcess = (id) => {
    dispatch(getLocalOrganizationsById(id));
    setOpenProcess(true);
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
            <Button onClick={() => handleProcess(record.id)} title="Xem chi tiết">
              <SettingOutlined />
            </Button>
          </>
        ),
      },
    ],
    [],
  );

  useEffect(() => {
    //gọi api thông qua redux
    dispatch(getAllOrganizationVerification());
  }, [dispatch, page, size, total,organizationParams]);

  const convertedData = useMemo(
    () =>
      verifications?.map((university, index) => {
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
    [verifications],
  );

  //hàm phan trang
  const handlePageChange = (page, pageSize) => {
    const payload = { page, size: pageSize };
    dispatch(getAllOrganizationVerification(payload));
  };

  //onSearch
  const onSearch = (value) => {
    dispatch(setOrganizationParams({ search: value, page: 1 }));
  };

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 18]}>
          <Col span={16} offset={8}>
            <Search
              placeholder="Tìm kiếm tổ chức"
              onSearch={onSearch}
              enterButton={
                <Button style={{ height: '2.5rem' }} type="primary">
                  Tìm kiếm
                </Button>
              }
            />
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
      {/* Creating modal */}
      <Modal
        confirmLoading={pendingState}
        title={<p style={{ textAlign: 'center', margin: 0 }}>Chi tiết yêu cầu xác thực</p>}
        onCancel={() => setOpenProcess(false)}
        centered
        style={{ maxHeight: '80vh', width: 'auto', overflowY: 'auto' }}
        open={openProcess}
        footer={
          <>
            <Button key="1" onClick={() => setOpenProcess(false)}>
              Hủy
            </Button>
            <Button
              loading={rejecting}
              key="2"
              danger
              onClick={rejectRequest}
              icon={<CloseOutlined />}
              type="primary"
            >
              Từ chối
            </Button>
            <Button
              key="3"
              loading={accepting}
              onClick={acceptRequest}
              icon={<CheckCircleFilled />}
              style={{ background: 'green', borderColor: 'white' }}
              type="primary"
            >
              Chấp nhận
            </Button>
          </>
        }
      >
        <Card style={{ margin: 0, padding: 0 }} loading={pendingState}>
          <Link to={currentVerification?.VerifyOrganization?.fileAttached} target="_blank" download>
            <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size}>
              Tải xuống phiếu thông tin
            </Button>
          </Link>
        </Card>
      </Modal>
    </>
  );
};

export default OrganizationVerification;
