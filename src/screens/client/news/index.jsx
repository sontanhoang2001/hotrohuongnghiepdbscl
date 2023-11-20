import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Card, List, Modal, Pagination } from 'antd';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch } from 'react-redux';
import ImageCard from '../../../components/card/imageCard';
import { HeadingTitle, MarginTopContent, Title } from '../../../globalStyles';
import { news } from './news';
import { Link } from 'react-router-dom';

function News() {
  const [open, setOpen] = useState(false);
  const [cardSelected, setCardSelected] = useState(0);
  //goi redux
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const payload = { page, size };
  //   //gọi api thông qua redux
  //   dispatch(getAllUniversity(payload));
  // }, []);
  // console.log(getUniversity);
  //hàm bắt sự kiện phân trang và làm mới lại api

  // const handlePageChange = (page, pageSize) => {
  //   const payload = { page, pageSize };
  //   dispatch(getAllUniversity(payload));
  // };
  return (
    <div className="container">
      <Title>
        <HeadingTitle>Tin Tức</HeadingTitle>
        <div className="underline"></div>
      </Title>
      <MarginTopContent>
        <List
          // loading={pendingState}
          grid={{ column: 3 }}
          dataSource={news}
          pagination={false}
          //render content
          renderItem={(val, idx) => (
            <div
              onClick={() => {
                setCardSelected(idx);
                setOpen(true);
              }}
            >
              <Link to={`/tin-tuc/${val.id}`}>
                <ImageCard key={idx} title={val.title} src={`../images/news/${val.image}`} />
              </Link>
            </div>
          )}
        ></List>
        <Pagination
          // current={page}
          // pageSize={size}
          // total={Totalpage}
          // onChange={handlePageChange}
          showQuickJumper
          showSizeChanger
          // onShowSizeChange={handlePageChange}
          style={{ marginTop: 20, marginBottom: 20 }}
        />
      </MarginTopContent>
    </div>
  );
}

export default News;
