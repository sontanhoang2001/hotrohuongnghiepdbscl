import React, { useState } from 'react';
import { HeadingTitle, MarginTopContent, Title } from '../../../globalStyles';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Empty, Row, Skeleton, Spin } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllPublicPostsById,
  getAllPublicPostsTemp,
  selectPostsPending,
  selectPublicPosts,
  selectPublicPostsTempData,
} from '../../../redux/postsSlice';
import { useEffect } from 'react';
import ImageCard from '../../../components/card/imageCard';

function NewsDetail() {
  // ----------
  const navigate = useNavigate();
  const params = useParams();
  // goi redux
  const dispatch = useDispatch();
  const pendingState = useSelector(selectPostsPending);
  const getPosts = useSelector(selectPublicPosts);
  const getPostsTemp = useSelector(selectPublicPostsTempData);
  const { tempClientPosts } = useSelector((state) => state.posts);
  useEffect(() => {
    //gọi api thông qua redux
    dispatch(getAllPublicPostsById(params.newsId));
    dispatch(getAllPublicPostsTemp(tempClientPosts));
  }, []);

  const handleOnClick = (id) => {
    window.scrollTo(0, 0);
    dispatch(getAllPublicPostsById(id));
  };
  return (
    <>
      <Skeleton
        loading={pendingState}
        paragraph={{
          rows: 10,
        }}
        active
        style={{ paddingTop: `3%`, margin: `0 3%` }}
      >
        <Title>
          <HeadingTitle>{getPosts?.title}</HeadingTitle>
          <div className="underline"></div>
        </Title>
        <Row justify="center">
          <Col span={22}>
            <MarginTopContent>
              <NewsContent>
                {/* <p>{getPosts?.content}</p> */}
                <div dangerouslySetInnerHTML={{ __html: getPosts?.content }} />
              </NewsContent>
              <Button type="primary" onClick={() => navigate(-2)} style={{ marginTop: 20 }}>
                Quay lại
              </Button>
              <div></div>
            </MarginTopContent>
          </Col>
        </Row>
      </Skeleton>

      <NewsFooterStyled>
        <Title>
          <HeadingTitle>{getPosts?.title}</HeadingTitle>
          <div className="underline"></div>
        </Title>
        <Spin spinning={pendingState}>
          {getPostsTemp?.data ? (
            <Row gutter={[16, 24]} style={{ marginTop: 30 }}>
              {getPostsTemp?.data?.map((val, idx) => (
                <Col key={idx} xs={24} sm={24} md={12} lg={6}>
                  <Link to={`/tin-tuc/${val.id}`} onClick={() => handleOnClick(val.id)}>
                    <ImageCard src={`${val?.thumbnail}`} title={val?.title} />
                  </Link>
                </Col>
              ))}
            </Row>
          ) : (
            <Row align={'middle'} justify={'center'}>
              <Empty description={<h3>Không có dữ liệu</h3>} />
            </Row>
          )}
        </Spin>
      </NewsFooterStyled>
    </>
  );
}

const NewsContent = styled.div`
  margin-top: 3%;
`;
const NewsFooterStyled = styled.div``;
export default NewsDetail;
