import React, { useEffect } from 'react';
import { Button, Col, ConfigProvider, Empty, Input, Pagination, Row, Spin } from 'antd';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch, useSelector } from 'react-redux';
import ImageCard from '../../../components/card/imageCard';
import {
  ContainerStyled,
  HeadingTitle,
  MarginTopContent,
  SearchBox,
  Title,
} from '../../../globalStyles';

import { Link } from 'react-router-dom';
import {
  getAllPostsCategory,
  getAllPublicPosts,
  selectClientPosts,
  selectPostsPending,
  selectPublicPosts,
} from '../../../redux/postsSlice';
import { debounce } from 'lodash';
import viVN from 'antd/lib/locale/vi_VN';
import styled from 'styled-components';

function News() {
  // goi redux
  const { category } = useSelector((state) => state.posts);
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(0);
  const pendingState = useSelector(selectPostsPending);
  const getPosts = useSelector(selectPublicPosts);
  const ClientPosts = useSelector(selectClientPosts);
  const dispatch = useDispatch();
  useEffect(() => {
    //gọi api thông qua redux
    dispatch(getAllPublicPosts(ClientPosts));
    dispatch(getAllPostsCategory());
  }, []);
  useEffect(() => {}, [category]);

  //hàm bắt sự kiện phân trang và làm mới lại api
  const handlePageChange = (page, pageSize) => {
    dispatch(getAllPublicPosts({ ...ClientPosts, page: page, size: pageSize }));
    window.scrollTo(0, 200);
  };

  //tìm kiếm bằng category
  const searchByCategoryid = (id) => {
    dispatch(getAllPublicPosts({ ...ClientPosts, postsCategoryId: id }));
    setSelectedCategoryId(id);
    // dispatch();
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
    <ContainerStyled className="container">
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
      <CategoryNewsStyled>
        <Row gutter={[16, 16]}>
          <>
            <Col className="category-btn-container">
              <Button
                className={selectedCategoryId === 0 ? 'active-category-btn' : 'category-btn'}
                type="text"
                onClick={() => searchByCategoryid(0)}
              >
                Tất cả
              </Button>
            </Col>
            {category?.map((val, idx) => (
              <Col key={idx} className="category-btn-container">
                <Button
                  className={selectedCategoryId === val.id ? 'active-category-btn' : 'category-btn'}
                  type="text"
                  onClick={() => searchByCategoryid(val.id)}
                >
                  {val.name}
                </Button>
              </Col>
            ))}
          </>
        </Row>
      </CategoryNewsStyled>
      <MarginTopContent>
        <Spin spinning={pendingState} size="large">
          <Row gutter={[16, 24]}>
            {getPosts?.data?.map((val, idx) => (
              <Col key={idx} span={24} md={24} lg={12} xl={8}>
                <Link to={`/tin-tuc/${val.id}`} onClick={() => window.scrollTo(0, 0)} replace>
                  <ImageCard src={`${val?.thumbnail}`} title={val?.title} />
                </Link>
              </Col>
            ))}
          </Row>
        </Spin>
        {getPosts?.data?.length === 0 ? (
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
            current={ClientPosts.page}
            pageSize={ClientPosts.size}
            total={ClientPosts.total}
            onChange={handlePageChange}
            showQuickJumper
            showSizeChanger
            onShowSizeChange={handlePageChange}
            style={{ marginTop: 20, marginBottom: 20 }}
          />
        </Row>
      </MarginTopContent>
    </ContainerStyled>
  );
}
const CategoryNewsStyled = styled.div`
  margin-top: 25px;
  border-bottom: 2px solid #b6bbc4;
  padding-bottom: 20px;
  .category-btn {
    border: 1px solid #b6bbc4;
  }
  .active-category-btn {
    background-color: var(--primary-color);
    color: var(--text-hover-color);
    span {
    }
  }
`;
export default News;
