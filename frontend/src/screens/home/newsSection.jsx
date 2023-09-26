import { Card } from 'antd';
import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

const { Meta } = Card;

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
    // autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
  };
  return (
    <div>
      <div className="container">
        <Title className="row">
          <h3>tin tức</h3>
        </Title>
        <Slider {...settings} className="container">
          {data.map((val, idx) => (
            <NewsContainer key={idx}>
              <Card cover={<img alt="example" src={`./images/news/${val.image}`} />}>
                <Meta title="Europe Street beat" description="www.instagram.com" />
              </Card>
            </NewsContainer>
          ))}
        </Slider>
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
const NewsContainer = styled.div`
  .ant-card {
    margin: 20px 30px;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 8px 12px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    div > img {
      height: 300px;
      object-fit: cover;
    }
    &:hover {
      opacity: 0.7;
      transform: scale(1.05);
    }
  }
`;

export default NewsSection;
