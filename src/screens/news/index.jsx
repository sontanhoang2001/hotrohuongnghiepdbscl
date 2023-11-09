import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Card, List, Modal, Pagination } from 'antd';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch } from 'react-redux';
import ImageCard from '../../components/card/imageCard';
import { HeadingTitle, MarginTopContent } from '../../globalStyles';

const data = [
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc1',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc2',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc3',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc4',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc6',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc8',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
];
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
          dataSource={data}
          pagination={false}
          //render content
          renderItem={(val, idx) => (
            <div
              onClick={() => {
                setCardSelected(idx);
                setOpen(true);
              }}
            >
              <ImageCard key={idx} title={val.title} src={`../images/news/${val.image}`} />
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
        {/* <Modal
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
              src={`${getUniversity?.data[cardSelected].UniversityDetail.image}`}
              alt=""
            />
          </div>
          <p style={{ marginTop: '3%' }}>
            {getUniversity?.data[cardSelected].UniversityDetail.description}{' '}
            <Button type="link">
              <a target="_blank" href={getUniversity?.data[cardSelected].UniversityDetail.url}>
                Xem thêm
              </a>
            </Button>
          </p>
        </Modal> */}
      </MarginTopContent>
    </div>
  );
}
const Title = styled.div`
  margin-top: 60px;
  .underline {
    border-bottom: 4px solid var(--primary-color);
  }
`;

export default News;
