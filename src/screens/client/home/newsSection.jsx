import React, { useEffect } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import ImageCard from '../../../components/card/imageCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllPublicPostsTemp,
  selectPostsPending,
  selectPublicPosts,
  selectPublicPostsTempData,
} from '../../../redux/postsSlice';
import { Button, Col, Row, Skeleton, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { DoubleRightOutlined } from '@ant-design/icons';

const data = [
  { image: 'istockphoto-1402360271-612x612.jpg', title: 'abc' },
  { image: 'istockphoto-1402360271-612x612.jpg', title: 'abc' },
  { image: 'istockphoto-1402360271-612x612.jpg', title: 'abc' },
  { image: 'istockphoto-1402360271-612x612.jpg', title: 'abc' },
  { image: 'istockphoto-1402360271-612x612.jpg', title: 'abc' },
  { image: 'istockphoto-1402360271-612x612.jpg', title: 'abc' },
];

function NewsSection() {
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
  };
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
          <Row gutter={[8, 16]}>
            {getPostsTemp?.data.map((val, idx) => (
              <Col key={idx} xs={24} sm={24} md={12} lg={6}>
                <Link to={`/tin-tuc/${val.id}`}>
                  <ImageCard title={val.title} src={`${val.image}`} />
                </Link>
              </Col>
            ))}
          </Row>
        </Spin>
        <NewFooterStyled>
          <Button type="link" onClick={() => navigate('/tin-tuc/')} style={{ fontSize: `14pt` }}>
            Xem thêm
            <DoubleRightOutlined />
          </Button>
        </NewFooterStyled>
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
const NewFooterStyled = styled.div`
  display: flex;
  justify-content: end;
  margin-right: 3%;
`;
export default NewsSection;
