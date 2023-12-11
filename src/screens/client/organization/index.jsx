import {
  Button,
  Col,
  Divider,
  Empty,
  Input,
  List,
  Modal,
  Pagination,
  Row,
  Space,
  Spin,
  Typography,
} from 'antd';
import { CompassOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import ImageCard from '../../../components/card/imageCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllPublicUniversityInfo,
  selectUniversity,
  selectUniversityPending,
  setParams,
} from '../../../redux/universitySlice';

import {
  ContainerStyled,
  HeadingTitle,
  MarginTopContent,
  SearchBox,
  Title,
} from '../../../globalStyles';
import { debounce } from 'lodash';
// import viVN from 'antd/lib/locale/vi_VN';

function Universities() {
  const [open, setOpen] = useState(false);
  const [cardSelected, setCardSelected] = useState(0);

  //goi redux
  const dispatch = useDispatch();
  const { organiztionPublic, organiztionPublicParams } = useSelector((state) => state.university);

  const getUniversity = useSelector(selectUniversity); //page 1 size 10 init value redux
  const pendingState = useSelector(selectUniversityPending);

  // reset params
  useEffect(() => {
    console.log('organiztionPublicParams', organiztionPublicParams);
    dispatch(setParams({ ...organiztionPublicParams, page: 1 }));
  }, []);

  useEffect(() => {
    //gọi api thông qua redux
    // dispatch(getAllPublicUniversityInfo());
    dispatch(getAllPublicUniversityInfo('Company'));
  }, [dispatch, organiztionPublicParams]);

  //hàm bắt sự kiện phân trang và làm mới lại api
  const handlePageChange = (page, pageSize) => {
    dispatch(setParams({ page: page, size: pageSize }));
    window.scrollTo(0, 200);
  };
  //tìm kiếm
  const onSearchChange = debounce((e) => {
    if (e.target.value === '') {
      dispatch(setParams({ search: e.target.value }));
    }
  }, 500);
  const onSearch = (value) => {
    dispatch(setParams({ search: value }));
  };

  return (
    <ContainerStyled>
      <Title>
        <HeadingTitle>các doanh nghiệp</HeadingTitle>
        <div className="underline"></div>
      </Title>
      <SearchBox>
        {/* <ConfigProvider locale={viVN}> */}
        <Input.Search
          placeholder="Tìm kiếm..."
          onSearch={onSearch}
          onChange={onSearchChange}
          enterButton={
            <Button type="primary" style={{ height: 50 }}>
              Tìm kiếm
            </Button>
          }
          allowClear
          style={{ height: 50 }}
        />
        {/* </ConfigProvider> */}
      </SearchBox>
      <MarginTopContent>
        <Spin spinning={pendingState} size="large">
          <Row gutter={[16, 24]}>
            {getUniversity?.data?.map((val, idx) => (
              <Col
                key={idx}
                xs={24}
                sm={24}
                md={12}
                lg={8}
                onClick={() => {
                  setCardSelected(idx);
                  setOpen(true);
                }}
              >
                {/* <div
                  onClick={() => {
                    setCardSelected(idx);
                    setOpen(true);
                  }}
                > */}
                <ImageCard
                  src={`${val?.OrganizationDetail?.image}`}
                  title={val?.name}
                  center={true}
                />
                {/* </div> */}
              </Col>
            ))}
          </Row>
        </Spin>
        {getUniversity?.data?.length === 0 ? (
          <Empty
            description={
              <p style={{ fontSize: `14pt`, fontWeight: 600, textAlign: 'center' }}>
                Không tìm thấy kết quả
              </p>
            }
          />
        ) : (
          ''
        )}
        <Row justify={'center'} style={{ marginTop: 20 }}>
          <Pagination
            current={organiztionPublic?.page}
            pageSize={organiztionPublic?.size}
            total={organiztionPublic?.total}
            onChange={handlePageChange}
            showQuickJumper
            showSizeChanger
            onShowSizeChange={handlePageChange}
            style={{ marginTop: 20, marginBottom: 20 }}
          />
        </Row>
        {getUniversity && getUniversity?.data[cardSelected] && (
          <Modal
            className="modalStyle"
            title={<div style={{ fontSize: '18px' }}>{getUniversity?.data[cardSelected].name}</div>}
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
            footer={null}
          >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img
                style={{ width: '55%', objectFit: 'cover' }}
                src={`${getUniversity?.data[cardSelected].OrganizationDetail.image}`}
                alt=""
              />
            </div>
            <Divider orientation="left">Giới thiệu</Divider>
            <p style={{ marginTop: '3%' }}>
              {getUniversity?.data[cardSelected].OrganizationDetail.description}{' '}
            </p>

            <Divider orientation="left">Mọi chi tiết xin liên hệ</Divider>

            <List.Item>
              <Space direction="vertical">
                <Typography.Text>
                  <CompassOutlined />{' '}
                  {getUniversity?.data[cardSelected].OrganizationDetail?.address}
                </Typography.Text>
                <Typography.Text>
                  <PhoneOutlined /> {getUniversity?.data[cardSelected].OrganizationDetail?.phone}
                </Typography.Text>
                <Typography.Text>
                  <MailOutlined /> {getUniversity?.data[cardSelected].OrganizationDetail?.email}
                </Typography.Text>
              </Space>
            </List.Item>

            <Divider orientation="left">Trang Web</Divider>
            <Typography.Text>
              Xem thông tin tuyển dụng <b>{getUniversity?.data[cardSelected].name}</b>
            </Typography.Text>
            <Button type="link">
              <a
                target="_blank"
                href={getUniversity?.data[cardSelected].OrganizationDetail.url}
                rel="noopener noreferrer"
              >
                {'=> Tại đây'}
              </a>
            </Button>
          </Modal>
        )}
      </MarginTopContent>
    </ContainerStyled>
  );
}

export default Universities;
