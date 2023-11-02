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
                ></div>
                {/* job name name */}
                <div className={idx === slideIndex ? 'job-name job-name-active' : 'job-name '}>
                  <span>{val.text}</span>
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
    opacity: 0.8;
    transform: scale(0.8);
    overflow: hidden;
    border-radius: 20px;
    -webkit-box-reflect: below 10px linear-gradient(transparent 50%, rgba(0, 0, 0, 0.3));
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    transition: 0.6s ease-in-out;
    .slide-box {
      position: relative;
      .banner-image {
        &:after {
          content: '';
          background-image: inherit;
          background-repeat: no-repeat;
          background-position: bottom;
          background-size: cover;
          width: inherit;
          height: 40%;
          position: absolute;
          bottom: -41%;
          transform: scaleY(-1);
          opacity: 0.5;
        }
        &::before {
          content: '';
          width: inherit;
          height: 42%;
          position: absolute;
          bottom: -42%;
          background: linear-gradient(transparent 50%, rgba(0, 0, 0, 0.3));
          z-index: 1;
          opacity: 0.5;
        }
      }
      .job-name {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translate(-50%, 0);
        text-align: center;
        transition: 0s ease;
        background-color: black;
        width: 100%;
        span {
          visibility: hidden;
          padding-bottom: 20px;
          font-size: 2.5rem;
          font-weight: 800;
          text-transform: capitalize;
          color: var(--text-secondary-color);
        }
      }
      .job-name-active {
        visibility: visible;
        opacity: 1;
        width: 101%;
        transition: 0.5s ease;
        span {
          visibility: visible;
        }
      }
    }
  }
  .slide-active {
    opacity: 1;
    transform: scale(1);
    transition: 0.7s ease-in-out;
  }
`;

export default Test;
