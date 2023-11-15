import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import ImageCard from '../../../components/card/imageCard';

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
  return (
    <div>
      <div className="container">
        <Title className="row">
          <h3>tin tức</h3>
        </Title>
        <Slider {...settings} className="container">
          {data.map((val, idx) => (
            <ImageCard key={idx} title={val.title} src={`./images/news/${val.image}`} />
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

export default NewsSection;
