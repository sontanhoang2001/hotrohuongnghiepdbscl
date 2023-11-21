import { Button, Input, List, Modal, Pagination, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ImageCard from '../../../components/card/imageCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllPublicUniversityInfo,
  getClientParams,
  // getAllUniversity,
  selectUniversity,
  selectUniversityPending,
  selectclientParams,
} from '../../../redux/universitySlice';
import { SearchOutlined } from '@ant-design/icons';
import { HeadingTitle, MarginTopContent, SearchBox, Title } from '../../../globalStyles';
import Search from 'antd/es/input/Search';

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
  console.log(getUniversity);

  // console.log('card', cardSelected);
  // console.log(getUniversity?.data[cardSelected].name);
  //hàm bắt sự kiện phân trang và làm mới lại api
  const handlePageChange = (page, pageSize) => {
    console.log('page - pageSize', page, pageSize);
    dispatch(getClientParams({ page: page, size: pageSize }));
    console.log(clientParams);
    // dispatch(getAllPublicUniversityInfo(clientParams));
    console.log(getUniversity);
  };
  //tìm kiếm
  const onSearch = (value) => {
    dispatch(getAllPublicUniversityInfo({ page: 1, search: value, type: 1 }));
    setCardSelected(0);
  };

  return (
    <div className="container">
      <Title>
        <HeadingTitle>các trường đại học ĐBSCL</HeadingTitle>
        <div className="underline"></div>
      </Title>
      <SearchBox>
        <Input.Search
          placeholder="Tìm kiếm câu hỏi"
          onSearch={onSearch}
          enterButton={
            <Button type="primary" style={{ height: 50 }}>
              Tìm kiếm
            </Button>
          }
          allowClear
          style={{ height: 50 }}
        />
      </SearchBox>
      <MarginTopContent>
        <List
          loading={pendingState}
          grid={{ column: 3 }}
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
          current={clientParams.page}
          pageSize={clientParams.size}
          total={clientParams.total}
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
