import React from 'react';
import { ContainerStyled, HeadingTitle, MarginTopContent, Title } from '../../../globalStyles';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Empty, Row, Skeleton, Spin } from 'antd';
import { DoubleLeftOutlined } from '@ant-design/icons';
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
  }, [params]);

  const handleOnClick = (id) => {
    window.scrollTo(0, 0);
    dispatch(getAllPublicPostsById(id));
  };
  return (
    <ContainerStyled>
      <Skeleton
        loading={pendingState}
        paragraph={{
          rows: 10,
        }}
        active
        style={{ paddingTop: `3%`, margin: `0 3%` }}
      >
        {getPosts && (
          <>
            <Title>
              <HeadingTitle>{getPosts.title}</HeadingTitle>
              <div className="underline"></div>
            </Title>
            <Row justify="center">
              <Col span={22}>
                <MarginTopContent>
                  <NewsContent>
                    <div
                      className="post-content"
                      dangerouslySetInnerHTML={{ __html: getPosts.content }}
                    />
                  </NewsContent>
                  <Row justify={'end'}>
                    <Button
                      type="primary"
                      onClick={() => navigate(-2)}
                      style={{ marginTop: 20 }}
                      size="large"
                    >
                      <DoubleLeftOutlined style={{ marginRight: 0 }} />
                      Quay lại
                    </Button>
                  </Row>
                  <div></div>
                </MarginTopContent>
              </Col>
            </Row>
          </>
        )}
      </Skeleton>

      <NewsFooterStyled>
        <Title>
          <HeadingTitle>{getPosts?.title}</HeadingTitle>
          <div className="underline"></div>
        </Title>
        <Spin spinning={pendingState}>
          {getPostsTemp?.data ? (
            <Row gutter={[32, 40]} style={{ marginTop: 30 }}>
              {getPostsTemp &&
                getPostsTemp.data.map((val, idx) => (
                  <Col key={idx} span={24} md={12}>
                    <Link to={`/tin-tuc/${val.id}`} onClick={() => handleOnClick(val.id)}>
                      {/* <ImageCard src={`${val?.thumbnail}`} title={val?.title} /> */}
                      <ImageCard
                        src={`${val.thumbnail}`}
                        title={val.title}
                        description={
                          <>
                            <div
                              style={{
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                display: '-webkit-box',
                              }}
                              dangerouslySetInnerHTML={{ __html: val.content }}
                            />
                          </>
                        }
                      />
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
    </ContainerStyled>
  );
}

const NewsContent = styled.div`
  margin-top: 3%;
  .post-content {
    p,
    span {
      font-size: 14pt !important;
      text-align: justify;
      line-height: 50px;
    }
    figure {
      text-align: center;
      margin-top: 30px;
      margin-bottom: 30px;
    }
  }
`;
const NewsFooterStyled = styled.div``;
export default NewsDetail;
