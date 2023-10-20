import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './style.css';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { mbtiDetail } from '../../components/mbtiDetail/mbtiDetail';
import { Button } from 'antd';

function Banner() {
  return (
    <BannerContainer>
      {/* begin banner slide */}
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        spaceBetween={80}
        loop={true}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
        }}
        modules={[EffectCoverflow]}
        className="swiper_container"
      >
        {mbtiDetail.details.map((val, idx) => (
          <SwiperSlide key={idx}>
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
                borderRadius: '20px',
              }}
              className="reflection"
            ></div>
            <div className="job-name">
              <span data-text={val.text}>{val.text}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
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
            <span> khám phá ngay</span>
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

  .reflection {
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
    &:before {
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
    /* padding-bottom: 6px; */
    transform: translate(-50%, 0);
    text-align: center;
    transition: 0s ease;
    width: 100%;
    span {
      height: fit-content;
      font-size: 1.6rem;
      font-weight: 800;
      text-transform: capitalize;
      color: var(--text-secondary-color);
      background-color: black;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
const Question = styled.div`
  position: absolute;
  left: 0;
  bottom: 20px;
  width: 100vw;
  z-index: 1;
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
export default Banner;
