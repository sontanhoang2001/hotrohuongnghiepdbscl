import React, { useState } from 'react';
import { HeadingTitle, MarginTopContent, Title } from '../../../globalStyles';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row, Skeleton } from 'antd';
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
  const [temp, setTemp] = useState();
  // goi redux
  const dispatch = useDispatch();
  const pendingState = useSelector(selectPostsPending);
  const getPosts = useSelector(selectPublicPosts);
  const getPostsTemp = useSelector(selectPublicPostsTempData);
  const { tempClientPosts } = useSelector((state) => state.posts);
  useEffect(() => {
    //gọi api thông qua redux
    dispatch(getAllPublicPostsById(1));
    dispatch(getAllPublicPostsTemp(tempClientPosts));
  }, []);

  const handleOnClick = (id) => {
    dispatch(getAllPublicPostsById(id));
    window.scrollTo(0, 0);
  };
  return (
    <>
      <Skeleton
        loading={pendingState}
        paragraph={{
          rows: 10,
        }}
        active
        style={{ marginTop: `3%`, margin: `0 3%` }}
      >
        <Title>
          <HeadingTitle>{getPosts?.title}</HeadingTitle>
          <div className="underline"></div>
        </Title>
        <Row justify="center">
          <Col span={22}>
            <MarginTopContent>
              <NewsContent>
                <p>{getPosts?.content}</p>
              </NewsContent>
              <Button type="primary" onClick={() => navigate(-2)}>
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
        <Row gutter={[8, 16]}>
          {getPostsTemp?.data.map((val, idx) => (
            <Col key={idx} xs={24} sm={24} md={12} lg={6}>
              {/* {pendingState ? (
                <Skeleton.Image
                  shape={'square'}
                  active={pendingState}
                  style={{ marginTop: 60, width: 300, height: 300 }}
                />
              ) : (
                <Link to={`/tin-tuc/${val.id}`}>
                  <ImageCard title={val.title} src={`${val.image}`} />
                </Link>
              )} */}
              <Link to={`/tin-tuc/${val.id}`} onClick={() => handleOnClick(val.id)}>
                <ImageCard title={val.title} src={`${val.image}`} />
              </Link>
            </Col>
          ))}
        </Row>
      </NewsFooterStyled>
    </>
  );
}

const NewsTitle = styled.div`
  text-transform: uppercase;
  text-align: center;
`;

const NewsContent = styled.div`
  margin-top: 3%;
`;
const NewsFooterStyled = styled.div``;
export default NewsDetail;
