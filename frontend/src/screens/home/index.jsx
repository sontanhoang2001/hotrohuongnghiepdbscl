import { Button } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const bannerImg = [
  {
    url: 'bf0707d1efba0d683c529ddcf5fbf8f6.jpg',
    text: 'tư vấn viên',
  },
  {
    url: 'dbc939b7b140e4fd8a64195ace83e0e8.jpg',
    text: 'ca sĩ',
  },
  {
    url: 'e008883738c7703153b460edee9a56ca.jpg',
    text: 'thương nhân',
  },
  {
    url: 'f5d68f23622c5cbc2267a9f4a51b23a2.jpg',
    text: 'hoạ sĩ',
  },
  { url: '9f6376688b1b68355a3bfede62714317.jpg', text: 'iT' },
];

function Home() {
  const [slideIndex, setSlideIndex] = useState(0);

  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerPadding: '80px',
    initialSlide: 0,
    dots: false,
    // speed: 1000,
    autoplay: true,
    autoplaySpeed: 4000,
    beforeChange: (current, next) => {
      setSlideIndex(next);
    },
    responsive: [
      {
        centerPadding: '1px',
      },
    ],
  };

  return (
    <div>
      <BannerContainer>
        {/* banner slide */}
        <div className="banner">
          <Slider {...settings} className="banner-container">
            {bannerImg.map((val, idx) => (
              <div className={idx === slideIndex ? 'slide slide-active' : 'slide'} key={idx}>
                <div className="slide-box">
                  {/* slide image */}
                  <img src={'./images/banner/' + val.url} alt="slide" />
                  {/* slide name */}
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
          <div>
            <h3>bạn có muốn biết tính cách của mình là gì?</h3>
            <h3>và tính cách của bạn có liên quan đến nghề nghiệp nào?</h3>
          </div>
          <Button type="primary" danger className="explore-btn">
            <span> khám phá ngay</span>
          </Button>
        </Question>
        {/* end banner question */}
      </BannerContainer>
      <section className="container"></section>
    </div>
  );
}

//banner section
const BannerContainer = styled.div`
  max-width: 100vw;
  margin: auto;
  overflow: hidden;
  height: calc(100vh - 120px);
  -webkit-height: calc(100vh - 120px);
  -moz-height: calc(100vh - 120px);
  background-color: #f4d03f;
  background-image: linear-gradient(180deg, var(--primary-color) 0%, #041612 100%);
  .banner {
    .banner-container {
      width: 100vw;
      padding-top: 25px;

      .slide {
        opacity: 0.8;
        transform: scale(0.8);
        /* filter: blur(5px); */
        overflow: hidden;
        border-radius: 20px;
        -webkit-box-reflect: below 5px linear-gradient(transparent 50%, rgba(0, 0, 0, 0.3));
        transition: 0.7s ease-in;
        .slide-box {
          position: relative;
          img {
            width: 100%;
            object-fit: cover;
            position: relative;
            height: calc(100vh - 320px);
            -webkit-height: calc(100vh - 320px);
            -moz-height: calc(100vh - 320px);
          }
          .job-name {
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translate(-50%, 0);
            opacity: 0;
            text-align: center;
            visibility: hidden;
            transition: 0s ease;
            span {
              padding-bottom: 20px;
              font-size: 2.5rem;
              font-weight: 800;
              text-transform: capitalize;
            }
          }
          .job-name-active {
            visibility: visible;
            opacity: 0.5;
            background-color: var(--text-hover-color);
            width: 101%;
            transition: 0.7s ease;
          }
        }
      }
      .slide-active {
        opacity: 1;
        transform: scale(1);
        filter: blur(0);
      }
    }
  }
`;
//end banner section

const Question = styled.div`
  /* display: flex; */
  text-align: center;
  div {
    margin-top: 20px;
    margin-bottom: 20px;
    h3 {
      color: var(--text-hover-color);
      text-transform: capitalize;
    }
  }

  .explore-btn {
    height: 60px;
    span {
      font-weight: 500;
      text-transform: capitalize;
      font-size: 1.2rem;
    }
  }
`;

export default Home;
