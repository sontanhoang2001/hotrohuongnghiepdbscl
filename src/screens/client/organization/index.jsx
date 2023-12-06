import { Button, Col, ConfigProvider, Empty, Input, Modal, Pagination, Row, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import ImageCard from '../../../components/card/imageCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllPublicUniversityInfo,
  selectUniversity,
  selectUniversityPending,
  selectclientParams,
} from '../../../redux/universitySlice';

import {
  ContainerStyled,
  HeadingTitle,
  MarginTopContent,
  SearchBox,
  Title,
} from '../../../globalStyles';
import { debounce } from 'lodash';
import viVN from 'antd/lib/locale/vi_VN';

function OrganiztionPublic() {
  const [open, setOpen] = useState(false);
  const [cardSelected, setCardSelected] = useState(0);

  //goi redux
  const dispatch = useDispatch();
  const organiztionPublic = useSelector(selectclientParams);

  const organiztio = useSelector(selectUniversity); //page 1 size 10 init value redux
  const pendingState = useSelector(selectUniversityPending);

  useEffect(() => {
    //gọi api thông qua redux
    dispatch(getAllPublicUniversityInfo({ ...organiztionPublic, organizationType: 2 }));
  }, []);
  console.log(organiztio);

  //hàm bắt sự kiện phân trang và làm mới lại api
  const handlePageChange = (page, pageSize) => {
    dispatch(
      getAllPublicUniversityInfo({
        ...organiztionPublic,
        page: page,
        size: pageSize,
        organizationType: 2,
      }),
    );
    window.scrollTo(0, 200);
    // dispatch(getAllPublicUniversityInfo(clientParams));
  };
  //tìm kiếm
  const onSearchChange = debounce((e) => {
    if (e.target.value === '') {
      dispatch(
        getAllPublicUniversityInfo({
          ...organiztionPublic,
          search: e.target.value,
          organizationType: 2,
        }),
      );
    }
  }, 500);
  const onSearch = (value) => {
    dispatch(
      getAllPublicUniversityInfo({ ...organiztionPublic, search: value, organizationType: 2 }),
    );
  };

  return (
    <ContainerStyled>
      <Title>
        <HeadingTitle>các trường đại học ĐBSCL</HeadingTitle>
        <div className="underline"></div>
      </Title>
      <SearchBox>
        <ConfigProvider locale={viVN}>
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
        </ConfigProvider>
      </SearchBox>
      <MarginTopContent>
        <Spin spinning={pendingState} size="large">
          <Row gutter={[16, 24]}>
            {organiztio?.data?.map((val, idx) => (
              <Col key={idx} xs={24} sm={24} md={12} lg={8}>
                <div
                  onClick={() => {
                    setCardSelected(idx);
                    setOpen(true);
                  }}
                >
                  <ImageCard
                    src={`${val?.OrganizationDetail?.image}`}
                    title={val?.name}
                    center={true}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </Spin>
        {organiztio?.data?.length === 0 ? (
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
        {organiztio && organiztio?.data[cardSelected] && (
          <Modal
            className="universities-modal"
            title={organiztio?.data[cardSelected].name}
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
            footer={null}
          >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img
                style={{ width: '80%', objectFit: 'cover' }}
                src={`${organiztio?.data[cardSelected].OrganizationDetail.image}`}
                alt=""
              />
            </div>
            <p style={{ marginTop: '3%' }}>
              {organiztio?.data[cardSelected].OrganizationDetail.description}{' '}
              <Button type="link">
                <a
                  target="_blank"
                  href={organiztio?.data[cardSelected].OrganizationDetail.url}
                  rel="noopener noreferrer"
                >
                  Xem thêm
                </a>
              </Button>
            </p>
          </Modal>
        )}
      </MarginTopContent>
    </ContainerStyled>
  );
}

export default OrganiztionPublic;
