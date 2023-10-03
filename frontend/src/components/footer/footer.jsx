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
            <FooterText className="footer-text">© 2023 trung tâm hướng nghiệp ĐBSCL.</FooterText>
          </div>
        </div>
      </div>
    </div>
  );
}
const FooterContainer = styled.div`
  max-width: 1900px;
  padding: 120px 0px 270px;
  position: relative;
  overflow-x: hidden;
  margin-left: auto;
  margin-right: auto;
  .footer-bg {
    position: absolute;
    bottom: 0;
    background: url(./images/footer/footer_bg.png) no-repeat scroll center 0;
    width: 100%;
    height: 266px;
    .footer-bg-car {
      background: url(./images/footer/volks.gif) no-repeat center center;
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
      background: url(./images/footer/cyclist.gif) no-repeat center center;
      width: 88px;
      height: 100px;
      background-size: 100%;
      bottom: 0;
      left: 38%;
      position: absolute;
      -webkit-animation: move-set 30s linear infinite;
      animation: move-set 30s linear infinite;
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
const FooterText = styled.div`
  text-transform: capitalize;
  text-align: center;
`;
export default Footer;
