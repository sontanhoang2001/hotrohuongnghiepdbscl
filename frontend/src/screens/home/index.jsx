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
    // centerPadding: '80px',
    slidesToShow: 3,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 1200,
    beforeChange: (current, next) => {
      setSlideIndex(next);
    },
  };

  return (
    <div>
      <BannerContainer>
        <div className="banner">
          <Slider {...settings} className="banner-container">
            {bannerImg.map((val, idx) => (
              <div className={idx === slideIndex ? 'slide slide-active' : 'slide'} key={idx}>
                <div className="slide-box">
                  <img src={'./images/banner/' + val.url} alt={Slide} />
                  <div className={idx === slideIndex ? 'job-name job-name-active' : 'job-name'}>
                    <span>{val.text}</span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <Question>
          <div>
            <h3>bạn có muốn biết tính cách của mình là gì?</h3>
            <h3>và tính cách của bạn có liên quan đến nghề nghiệp nào?</h3>
          </div>
          <Button type="primary" danger>
            khám phá ngay
          </Button>
        </Question>
      </BannerContainer>
    </div>
  );
}

const BannerContainer = styled.div`
  max-width: 100vw;
  margin: auto;
  overflow: hidden;
  background-color: #0093e9;
  background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);

  .banner {
    .banner-container {
      width: 100vw;
      overflow: hidden;
      padding: 40px 60px;
      .slide {
        opacity: 0.8;
        transform: scale(0.7);
        filter: blur(5px);
        overflow: hidden;
        border-radius: 20px;
        img {
          height: 100%;
          position: relative;
        }
        .slide-box {
          position: relative;
          width: 100%;
          height: 100%;
          .job-name {
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translate(-50%, 0);
            opacity: 0;
            text-align: center;
            visibility: hidden;
            span {
              padding-bottom: 20px;
              font-size: 2.5rem;
              font-weight: 800;
              text-transform: capitalize;
            }
          }
          .job-name-active {
            visibility: visible;
            opacity: 0.7;
            background-color: var(--text-hover-color);
            width: 101%;
          }
        }
      }
      .slide-active {
        opacity: 1;
        transform: scale(1);
        filter: blur(0);
        transition: 0.5s ease-in;
      }
    }
  }
`;

const Slide = styled.div``;
// const Banner = styled.section`
//   height: 600px;
//   width: 100%;
//   /* background-color: black; */
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   .banner-box {
//     height: 500px;
//     width: auto;
//     box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px,
//       rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px,
//       rgba(0, 0, 0, 0.09) 0px -3px 5px;

//     border-radius: 17px;
//     overflow: hidden;
//     position: relative;
//     margin-left: 15px;
//     margin-right: 15px;
//     &:nth-child(2),
//     &:nth-child(4) {
//       margin-top: 60px;
//     }
//     &:hover {
//       img {
//         width: 300px;
//         transition: 0.7s all ease-in;
//       }
//       .overlay-text {
//         visibility: visible;
//         opacity: 0.5;
//         transition: 0.7s all ease-in;
//         span {
//           transition: 0.7s all ease-in;
//         }
//       }
//     }
//     img {
//       width: 150px;
//       height: 500px;
//       object-fit: cover;
//       transition: 0.5s all ease-in;
//       position: relative;
//     }
//     .overlay-text {
//       position: absolute;
//       top: 0;
//       bottom: 0;
//       left: 0;
//       /* background-color: black; */
//       width: 300px;
//       height: 500px;
//       opacity: 0;
//       display: flex;
//       align-items: flex-end;
//       text-align: center;
//       overflow: hidden;
//       visibility: hidden;
//       span {
//         width: 100%;
//         position: absolute;
//         background-color: var(--text-hover-color);
//         padding-bottom: 20px;
//         font-size: 2.5rem;
//         font-weight: 800;
//         text-transform: capitalize;
//       }
//     }
//   }
// `;
const Question = styled.div`
  /* display: flex; */
  text-align: center;

  div {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

export default Home;
