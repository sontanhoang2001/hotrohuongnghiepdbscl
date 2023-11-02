import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { Button } from 'antd';
import { mbtiDetail } from '../../components/mbtiDetail/mbtiDetail';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';

function BannerSection() {
  const [slideIndex, setSlideIndex] = useState(0);
  const navigate = useNavigate();
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    initialSlide: 0,
    dots: false,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    focusOnSelect: true,
    centerPadding: '0',
    beforeChange: (current, next) => {
      setSlideIndex(next);
    },
  };
  return (
    <BannerContainer>
      {/* banner slide */}
      <div className="container">
        <Slider {...settings} className="banner-container">
          {mbtiDetail.details.map((val, idx) => (
            <div className={idx === slideIndex ? 'slide slide-active' : 'slide'} key={idx}>
              <div className="slide-box">
                <div
                  style={{
                    width: '100%',
                    height: 'calc(100vh - 320px)',
                    position: 'relative',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundImage: `url(./images/mbti/${val.image})`,
                    backgroundColor: 'var(--text-secondary-color)',
                  }}
                  className="banner-image"
                ></div>
                {/* job name name */}
                <div className={idx === slideIndex ? 'job-name job-name-active' : 'job-name'}>
                  <span>{val.text}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {/* end banner slide */}

      {/* banner question */}
      <Question>
        <div className="banner-row">
          <div>
            <h3>bạn có muốn biết tính cách của mình là gì?</h3>
            <h3>và tính cách của bạn có liên quan đến nghề nghiệp nào?</h3>
          </div>
        </div>
        <div className="banner-row">
          <Button type="primary" danger className="explore-btn">
            <span onClick={() => navigate('/trach-nghiem-tinh-cach')}> khám phá ngay</span>
          </Button>
        </div>
      </Question>
      {/* end banner question */}
    </BannerContainer>
  );
}
const BannerContainer = styled.div`
  width: 100%;
  margin: auto;
  overflow: hidden;
  height: calc(100vh - 120px);
  background-color: var(--primary-color);
  background-image: linear-gradient(180deg, var(--primary-color) 0%, #041612 100%);
  .slick-arrow {
    display: none !important;
  }
  .container {
    .banner-container {
      width: 100%;
      padding-top: 25px;
      .slick-slide > div {
        height: calc(100vh - 120px);
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
        filter: blur(0);
        transition: 0.7s ease-in-out;
      }
    }
  }
`;
//end banner section

const Question = styled.div`
  /* display: flex;
  text-align: center; */
  position: absolute;
  left: 0;
  bottom: 20px;
  width: 100vw;
  .banner-row {
    display: flex;
    justify-content: center;
    align-items: center;
    div > h3 {
      text-align: center;
      color: var(--text-hover-color);
      text-transform: capitalize;
    }

    .explore-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 8px;
      padding: 20px 5px;
      span {
        font-weight: 500;
        text-transform: capitalize;
        font-size: 1.2rem;
      }
    }
  }
`;
export default BannerSection;
