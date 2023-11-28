import { Button, ConfigProvider, Input, List, Modal, Pagination, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ImageCard from '../../../components/card/imageCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllPublicUniversityInfo,
  selectUniversity,
  selectUniversityPending,
  selectclientParams,
} from '../../../redux/universitySlice';
import { SearchOutlined } from '@ant-design/icons';
import { HeadingTitle, MarginTopContent, SearchBox, Title } from '../../../globalStyles';
import Search from 'antd/es/input/Search';
import { debounce } from 'lodash';
import viVN from 'antd/lib/locale/vi_VN';

function Universities() {
  const [open, setOpen] = useState(false);
  const [cardSelected, setCardSelected] = useState(0);
  const [search, setSearch] = useState('');

  //goi redux
  const dispatch = useDispatch();
  const clientParams = useSelector(selectclientParams);

  const getUniversity = useSelector(selectUniversity); //page 1 size 10 init value redux
  const pendingState = useSelector(selectUniversityPending);

  useEffect(() => {
    //gọi api thông qua redux
    dispatch(getAllPublicUniversityInfo(clientParams));
  }, []);

  //hàm bắt sự kiện phân trang và làm mới lại api
  const handlePageChange = (page, pageSize) => {
    dispatch(getAllPublicUniversityInfo({ ...clientParams, page: page, size: pageSize }));
    window.scrollTo(0, 200);
    // dispatch(getAllPublicUniversityInfo(clientParams));
  };
  //tìm kiếm
  const onSearchChange = debounce((e) => {
    if (e.target.value === '') {
      dispatch(getAllPublicUniversityInfo({ ...clientParams, search: e.target.value }));
    }
  }, 500);
  const onSearch = (value) => {
    dispatch(getAllPublicUniversityInfo({ ...clientParams, search: value }));
  };

  return (
    <div className="container">
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
        <List
          loading={pendingState}
          grid={{
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 3,
          }}
          dataSource={getUniversity?.data}
          pagination={false}
          //render content
          renderItem={(val, idx) => (
            <div
              key={val.id}
              onClick={() => {
                setCardSelected(idx);
                setOpen(true);
                console.log(idx);
              }}
            >
              <ImageCard key={idx} title={val?.name} src={`${val?.OrganizationDetail.image}`} />
            </div>
          )}
        ></List>
        <Pagination
          current={clientParams?.page}
          pageSize={clientParams?.size}
          total={clientParams?.total}
          onChange={handlePageChange}
          showQuickJumper
          showSizeChanger
          onShowSizeChange={handlePageChange}
          style={{ marginTop: 20, marginBottom: 20 }}
        />
        {getUniversity && getUniversity?.data[cardSelected] && (
          <Modal
            className="universities-modal"
            title={getUniversity?.data[cardSelected].name}
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
                src={`${getUniversity?.data[cardSelected].OrganizationDetail.image}`}
                alt=""
              />
            </div>
            <p style={{ marginTop: '3%' }}>
              {getUniversity?.data[cardSelected].OrganizationDetail.description}{' '}
              <Button type="link">
                <a
                  target="_blank"
                  href={getUniversity?.data[cardSelected].OrganizationDetail.url}
                  rel="noopener noreferrer"
                >
                  Xem thêm
                </a>
              </Button>
            </p>
          </Modal>
        )}
      </MarginTopContent>
    </div>
  );
}

export default Universities;
