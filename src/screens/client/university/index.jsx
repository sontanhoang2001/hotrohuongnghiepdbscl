import { Button, List, Modal, Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ImageCard from '../../../components/card/imageCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllUniversity,
  selectUniversity,
  selectUniversityPage,
  selectUniversityPagesize,
  selectUniversityPending,
  selectUniversityToalRow,
} from '../../../redux/universitySlice';
import { HeadingTitle, MarginTopContent, Title } from '../../../globalStyles';

function Universities() {
  const [open, setOpen] = useState(false);
  const [cardSelected, setCardSelected] = useState(0);

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
  console.log(getUniversity);
  //hàm bắt sự kiện phân trang và làm mới lại api
  const handlePageChange = (page, pageSize) => {
    const payload = { page, pageSize };
    dispatch(getAllUniversity(payload));
  };
  return (
    <div className="container">
      <Title>
        <HeadingTitle>các trường đại học ĐBSCL</HeadingTitle>
        <div className="underline"></div>
      </Title>
      <MarginTopContent>
        <List
          loading={pendingState}
          grid={{ column: 3 }}
          dataSource={getUniversity?.data}
          pagination={false}
          //render content
          renderItem={(val, idx) => (
            <div
              onClick={() => {
                setCardSelected(idx);
                setOpen(true);
              }}
            >
              <ImageCard key={idx} title={val.name} src={`${val.OrganizationDetail.image}`} />
            </div>
          )}
        ></List>
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
              <a target="_blank" href={getUniversity?.data[cardSelected].OrganizationDetail.url}>
                Xem thêm
              </a>
            </Button>
          </p>
        </Modal>
      </MarginTopContent>
    </div>
  );
}

export default Universities;
