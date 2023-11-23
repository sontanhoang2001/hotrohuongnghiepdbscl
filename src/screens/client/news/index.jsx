import React, { useEffect, useState } from 'react';
import { Button, ConfigProvider, Input, List, Pagination } from 'antd';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch, useSelector } from 'react-redux';
import ImageCard from '../../../components/card/imageCard';
import { HeadingTitle, MarginTopContent, SearchBox, Title } from '../../../globalStyles';

import { Link } from 'react-router-dom';
import {
  getAllPublicPosts,
  selectClientPosts,
  selectPostsPending,
  selectPublicPosts,
} from '../../../redux/postsSlice';
import { debounce } from 'lodash';
import viVN from 'antd/lib/locale/vi_VN';

function News() {
  // goi redux
  const pendingState = useSelector(selectPostsPending);
  const getPosts = useSelector(selectPublicPosts);
  const ClientPosts = useSelector(selectClientPosts);
  const dispatch = useDispatch();
  useEffect(() => {
    //gọi api thông qua redux
    dispatch(getAllPublicPosts(ClientPosts));
  }, []);

  //hàm bắt sự kiện phân trang và làm mới lại api
  const handlePageChange = (page, pageSize) => {
    dispatch(getAllPublicPosts({ ...ClientPosts, page: page, size: pageSize }));
    window.scrollTo(0, 200);
  };
  //tìm kiếm
  const onSearchChange = debounce((e) => {
    if (e.target.value === '') {
      dispatch(getAllPublicPosts({ ...ClientPosts, search: e.target.value }));
    }
  }, 500);
  const onSearch = (value) => {
    dispatch(getAllPublicPosts({ ...ClientPosts, search: value }));
  };

  return (
    <div className="container">
      <Title>
        <HeadingTitle>Tin Tức</HeadingTitle>
        <div className="underline"></div>
      </Title>
      <SearchBox>
        <ConfigProvider locale={viVN}>
          <Input.Search
            placeholder="Tìm kiếm..."
            onChange={onSearchChange}
            onSearch={onSearch}
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
          grid={{ column: 3 }}
          dataSource={getPosts?.data}
          pagination={false}
          //render content
          renderItem={(val, idx) => (
            <div key={val.id}>
              <Link to={`/tin-tuc/${val.id}`}>
                <ImageCard title={val.title} src={`${val.image}`} />
              </Link>
            </div>
          )}
        />
        <Pagination
          current={ClientPosts.page}
          pageSize={ClientPosts.size}
          total={ClientPosts.total}
          onChange={handlePageChange}
          showQuickJumper
          showSizeChanger
          onShowSizeChange={handlePageChange}
          style={{ marginTop: 20, marginBottom: 20 }}
        />
      </MarginTopContent>
    </div>
  );
}

export default News;
