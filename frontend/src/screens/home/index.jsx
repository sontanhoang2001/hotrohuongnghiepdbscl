import { Button } from "antd";
import React from "react";

import styled from "styled-components";

const bannerImg = [
  {
    url: "bf0707d1efba0d683c529ddcf5fbf8f6.jpg",
    text: "tư vấn viên",
  },
  {
    url: "dbc939b7b140e4fd8a64195ace83e0e8.jpg",
    text: "ca sĩ",
  },
  {
    url: "e008883738c7703153b460edee9a56ca.jpg",
    text: "thương nhân",
  },
  {
    url: "f5d68f23622c5cbc2267a9f4a51b23a2.jpg",
    text: "hoạ sĩ",
  },
  { url: "9f6376688b1b68355a3bfede62714317.jpg", text: "iT" },
];

function Home() {
  return (
    <HomeContainer>
      {/* begin banner */}
      <Banner className="container banner-bg">
        {/* banner image box */}
        {bannerImg.map((val, idx) => (
          <div className="banner-box" key={idx}>
            <img src={"./images/banner/" + val.url} alt={idx} />
            {/* overlay */}
            <div className="overlay-text">
              <span>{val.text}</span>
            </div>
          </div>
        ))}
      </Banner>
      {/* end banner */}

      <Question>
        <div>
          <h3>bạn có muốn biết tính cách của mình là gì?</h3>
          <h3>và tính cách của bạn có liên quan đến nghề nghiệp nào?</h3>
        </div>
        <Button type="primary" danger>
          khám phá ngay
        </Button>
      </Question>
    </HomeContainer>
  );
}

const HomeContainer = styled.div``;
const Banner = styled.section`
  height: 600px;
  width: 100%;
  /* background-color: black; */
  display: flex;
  align-items: center;
  justify-content: center;
  .banner-box {
    height: 500px;
    width: auto;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

    border-radius: 17px;
    overflow: hidden;
    position: relative;
    margin-left: 15px;
    margin-right: 15px;
    &:nth-child(2),
    &:nth-child(4) {
      margin-top: 60px;
    }
    &:hover {
      img {
        width: 300px;
        transition: 0.7s all ease-in;
      }
      .overlay-text {
        visibility: visible;
        opacity: 0.5;
        transition: 0.7s all ease-in;
        span {
          transition: 0.7s all ease-in;
        }
      }
    }
    img {
      width: 150px;
      height: 500px;
      object-fit: cover;
      transition: 0.5s all ease-in;
      position: relative;
    }
    .overlay-text {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      /* background-color: black; */
      width: 300px;
      height: 500px;
      opacity: 0;
      display: flex;
      align-items: flex-end;
      text-align: center;
      overflow: hidden;
      visibility: hidden;
      span {
        width: 100%;
        position: absolute;
        background-color: var(--text-hover-color);
        padding-bottom: 20px;
        font-size: 2.5rem;
        font-weight: 800;
        text-transform: capitalize;
      }
    }
  }
`;
const Question = styled.div`
  /* display: flex; */
  text-align: center;
  div {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

export default Home;
