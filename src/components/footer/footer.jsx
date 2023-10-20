import { Col, Row, Space } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Footer() {
  const navigate = useNavigate();
  return (
    <div>
      <FooterContainer className="container">
        <div>
          <div className="footer-bg">
            <div className="footer-container">
              <Row>
                <Col span={6}>
                  <Row className="footer-logo">
                    <Col span={10}>
                      <img
                        src="./images/logo/logo2.webp"
                        alt="home"
                        onClick={() => navigate('/')}
                      />
                    </Col>
                    <Col span={14}>
                      <h1>trung tâm hướng nghiệp ĐBSCL</h1>
                    </Col>
                  </Row>
                </Col>
                <Col span={6}>
                  <Row>thông tin</Row>
                  <Row onClick={() => navigate('/thong-tin-cac-truong-dai-hoc')}>
                    các trường đại học
                  </Row>
                  <Row onClick={() => navigate('/trach-nghiem-tinh-cach')}>
                    phương phá trắc nghiệm
                  </Row>
                </Col>
                <Col span={6}>
                  <Row>dịch vụ</Row>
                </Col>
                <Col span={6}>
                  <Row>mạng xã hội</Row>
                </Col>
              </Row>
            </div>
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
    .footer-container {
      .footer-logo {
        img {
          width: 100px;
        }
      }
    }
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
