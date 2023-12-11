import React, { useEffect } from 'react';
import styled from 'styled-components';
import ImageCard from '../../../components/card/imageCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllPublicPostsTemp,
  selectPostsPending,
  selectPublicPostsTempData,
} from '../../../redux/postsSlice';
import { Button, Col, Row, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { DoubleRightOutlined } from '@ant-design/icons';
import { format } from 'date-fns';

function NewsSection() {
  const navigate = useNavigate();
  // gọi redux
  const dispatch = useDispatch();
  const pendingState = useSelector(selectPostsPending);
  const getPostsTemp = useSelector(selectPublicPostsTempData);
  const { tempClientPosts } = useSelector((state) => state.posts);

  useEffect(() => {
    //gọi api thông qua redux
    dispatch(getAllPublicPostsTemp(tempClientPosts));
  }, []);
  return (
    <div>
      <div className="container">
        <Title className="row">
          <h3>tin tức</h3>
        </Title>
        <Spin spinning={pendingState}>
          <Row gutter={[32, 40]}>
            {getPostsTemp?.data.map((val, idx) => (
              <Col key={idx} span={24} md={12}>
                <Link to={`/tin-tuc/${val.id}`} onClick={() => window.scrollTo(0, 0)}>
                  {/* <ImageCard src={val.thumbnail} title={val.title} /> */}
                  <ImageCard
                    src={`${val.thumbnail}`}
                    title={val.title}
                    description={
                      <>
                        <p>Ngày đăng: {format(new Date(val.displayDate), 'dd/MM/yyyy')}</p>
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
          <Row justify={'center'} style={{ marginTop: 30, marginRight: 10 }}>
            <Button
              type="primary"
              onClick={() => {
                window.scrollTo(0, 0);
                navigate('/tin-tuc/');
              }}
              size="large"
            >
              Xem thêm
              <DoubleRightOutlined style={{ marginRight: 0 }} />
            </Button>
          </Row>
        </Spin>
      </div>
    </div>
  );
}

const Title = styled.div`
  padding-top: 5%;
  padding-bottom: 40px;
  padding-left: 8px;
  h3 {
    border-left: 10px solid var(--primary-color);
    font-size: 2rem;
    font-weight: 500;
    text-transform: uppercase;
    margin: 5px;
  }
`;
export default NewsSection;
