import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { Button } from 'antd';
import { mbtiDetail } from '../../components/mbtiDetail/mbtiDetail';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Test() {
  const [slideIndex, setSlideIndex] = useState(0);
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    initialSlide: 0,
    dots: false,
    autoplay: false,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    focusOnSelect: true,
    centerPadding: '0',
    beforeChange: (current, next) => {
      setSlideIndex(next);
    },
  };
  return (
    <Container_1>
      <div className="container" style={{ marginTop: '20px' }}>
        <Slider {...settings} className="banner-container">
          {mbtiDetail.details.map((val, idx) => (
            <div className={idx === slideIndex ? 'slide slide-active' : 'slide'} key={idx}>
              <div>
                <div
                  style={{
                    width: '100%',
                    height: '500px',
                    position: 'relative',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundImage: `url(./images/mbti/${val.image})`,
                    backgroundColor: 'var(--text-secondary-color)',
                    borderRadius: '20px',
                  }}
                  className="banner-image"
                ></div>
                {/* job name name */}
                <div className={idx === slideIndex ? 'job-name job-name-active' : 'job-name '}>
                  <span>{val.text}</span>
                </div>
              </div>

              <div>
                <div
                  style={{
                    width: '100%',
                    height: '500px',
                    position: 'relative',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundImage: `url(./images/mbti/${val.image})`,
                    backgroundColor: 'var(--text-secondary-color)',
                    borderRadius: '20px',
                  }}
                  className="banner-image reverse-image"
                ></div>
                {/* job name name */}
                <div
                  className={
                    idx === slideIndex ? 'reverse-job-name job-name-active' : 'reverse-job-name'
                  }
                >
                  <span data-text={val.text}>{val.text}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </Container_1>
  );
}
const Container_1 = styled.div`
  overflow: hidden;
  height: calc(100vh - 120px);
  background-color: var(--primary-color);
  background-image: linear-gradient(180deg, var(--primary-color) 0%, #041612 100%);
  .slick-arrow {
    display: none !important;
  }
  .slide {
    transform: scale(0.8);
    .banner-image {
    }
    .job-name {
      position: absolute;
      left: 50%;
      bottom: 50%;
      transform: translate(-50%, 0);
      background-color: var(--black-line);
      width: 101%;
      height: 12%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;

      span {
        color: var(--text-secondary-color);
        font-size: 1.6rem;
        font-weight: 800;
        text-align: center;
      }
    }
    .reverse-image {
      transform: scaleY(-1);
      opacity: 0.5;
    }
    .reverse-job-name {
      transform: scaleY(-1);
      position: absolute;
      left: 50%;
      bottom: 40%;
      transform: translate(-50%, 0);
      background-color: var(--black-line);
      width: 101%;
      height: 12%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
    }
  }
  .slide-active {
    opacity: 1;
    transform: scale(1);
    transition: 0.7s ease-in-out;
  }
`;

export default Test;
