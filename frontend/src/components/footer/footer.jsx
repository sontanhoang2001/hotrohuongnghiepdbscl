import React from 'react';
import styled from 'styled-components';

function Footer() {
  return (
    <div>
      <FooterContainer>
        <div>
          <div className="footer-bg">
            <div className="footer-bg-car"></div>
            <div className="footer-bg-bike"></div>
          </div>
        </div>
      </FooterContainer>
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-row">
            <div className="footer-text">© cakecounter Inc.. 2019 All rights reserved.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
const FooterContainer = styled.div`
  padding: 120px 0px 270px;
  position: relative;
  overflow-x: hidden;
  .footer-bg {
    position: absolute;
    bottom: 0;
    background: url(https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEigB8iI5tb8WSVBuVUGc9UjjB8O0708X7Fdic_4O1LT4CmLHoiwhanLXiRhe82yw0R7LgACQ2IhZaTY0hhmGi0gYp_Ynb49CVzfmXtYHUVKgXXpWvJ_oYT8cB4vzsnJLe3iCwuzj-w6PeYq_JaHmy_CoGoa6nw0FBo-2xLdOPvsLTh_fmYH2xhkaZ-OGQ/s16000/footer_bg.png)
      no-repeat scroll center 0;
    width: 100%;
    height: 266px;
    .footer-bg-car {
      background: url(https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEia0PYPxwT5ifToyP3SNZeQWfJEWrUENYA5IXM6sN5vLwAKvaJS1pQVu8mOFFUa_ET4JuHNTFAxKURFerJYHDUWXLXl1vDofYXuij45JZelYOjEFoCOn7E6Vxu0fwV7ACPzArcno1rYuVxGB7JY6G7__e4_KZW4lTYIaHSLVaVLzklZBLZnQw047oq5-Q/s16000/volks.gif)
        no-repeat center center;
      width: 330px;
      height: 105px;
      background-size: 100%;
      position: absolute;
      bottom: 0;
      left: 30%;
      -webkit-animation: move-set 22s linear infinite;
      animation: move-set 22s linear infinite;
    }
    .footer-bg-bike {
      background: url(https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhyLGwEUVwPK6Vi8xXMymsc-ZXVwLWyXhogZxbcXQYSY55REw_0D4VTQnsVzCrL7nsyjd0P7RVOI5NKJbQ75koZIalD8mqbMquP20fL3DxsWngKkOLOzoOf9sMuxlbyfkIBTsDw5WFUj-YJiI50yzgVjF8cZPHhEjkOP_PRTQXDHEq8AyWpBiJdN9SfQA/s16000/cyclist.gif)
        no-repeat center center;
      width: 88px;
      height: 100px;
      background-size: 100%;
      bottom: 0;
      left: 38%;
      position: absolute;
      -webkit-animation: move-set 30s linear infinite;
      animation: move-set 30s linear infinite;
    }
    .footer-bottom {
    }
  }

  @-moz-keyframes move-set {
    0% {
      left: -25%;
    }
    100% {
      left: 100%;
    }
  }

  @-webkit-keyframes move-set {
    0% {
      left: -25%;
    }
    100% {
      left: 100%;
    }
  }

  @keyframes move-set {
    0% {
      left: -25%;
    }
    100% {
      left: 100%;
    }
  }
`;
export default Footer;
