import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function CLientFooter() {
  const navigate = useNavigate();
  const facebook = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      id="facebook"
      width="30"
      height="30"
      key={0}
    >
      <path
        fill="#1976D2"
        d="M14 0H2C.897 0 0 .897 0 2v12c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V2c0-1.103-.897-2-2-2z"
      ></path>
      <path
        fill="#FAFAFA"
        fillRule="evenodd"
        d="M13.5 8H11V6c0-.552.448-.5 1-.5h1V3h-2a3 3 0 0 0-3 3v2H6v2.5h2V16h3v-5.5h1.5l1-2.5z"
        clipRule="evenodd"
      ></path>
    </svg>,
  ];
  const instagram = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 102 102"
      id="instagram"
      key={1}
    >
      <defs>
        <radialGradient id="a" cx="6.601" cy="99.766" r="129.502" gradientUnits="userSpaceOnUse">
          <stop offset=".09" stopColor="#fa8f21"></stop>
          <stop offset=".78" stopColor="#d82d7e"></stop>
        </radialGradient>
        <radialGradient id="b" cx="70.652" cy="96.49" r="113.963" gradientUnits="userSpaceOnUse">
          <stop offset=".64" stopColor="#8c3aaa" stopOpacity="0"></stop>
          <stop offset="1" stopColor="#8c3aaa"></stop>
        </radialGradient>
      </defs>
      <path
        fill="url(#a)"
        d="M25.865,101.639A34.341,34.341,0,0,1,14.312,99.5a19.329,19.329,0,0,1-7.154-4.653A19.181,19.181,0,0,1,2.5,87.694,34.341,34.341,0,0,1,.364,76.142C.061,69.584,0,67.617,0,51s.067-18.577.361-25.14A34.534,34.534,0,0,1,2.5,14.312,19.4,19.4,0,0,1,7.154,7.154,19.206,19.206,0,0,1,14.309,2.5,34.341,34.341,0,0,1,25.862.361C32.422.061,34.392,0,51,0s18.577.067,25.14.361A34.534,34.534,0,0,1,87.691,2.5a19.254,19.254,0,0,1,7.154,4.653A19.267,19.267,0,0,1,99.5,14.309a34.341,34.341,0,0,1,2.14,11.553c.3,6.563.361,8.528.361,25.14s-.061,18.577-.361,25.14A34.5,34.5,0,0,1,99.5,87.694,20.6,20.6,0,0,1,87.691,99.5a34.342,34.342,0,0,1-11.553,2.14c-6.557.3-8.528.361-25.14.361s-18.577-.058-25.134-.361"
        data-name="Path 16"
      ></path>
      <path
        fill="url(#b)"
        d="M25.865,101.639A34.341,34.341,0,0,1,14.312,99.5a19.329,19.329,0,0,1-7.154-4.653A19.181,19.181,0,0,1,2.5,87.694,34.341,34.341,0,0,1,.364,76.142C.061,69.584,0,67.617,0,51s.067-18.577.361-25.14A34.534,34.534,0,0,1,2.5,14.312,19.4,19.4,0,0,1,7.154,7.154,19.206,19.206,0,0,1,14.309,2.5,34.341,34.341,0,0,1,25.862.361C32.422.061,34.392,0,51,0s18.577.067,25.14.361A34.534,34.534,0,0,1,87.691,2.5a19.254,19.254,0,0,1,7.154,4.653A19.267,19.267,0,0,1,99.5,14.309a34.341,34.341,0,0,1,2.14,11.553c.3,6.563.361,8.528.361,25.14s-.061,18.577-.361,25.14A34.5,34.5,0,0,1,99.5,87.694,20.6,20.6,0,0,1,87.691,99.5a34.342,34.342,0,0,1-11.553,2.14c-6.557.3-8.528.361-25.14.361s-18.577-.058-25.134-.361"
        data-name="Path 17"
      ></path>
      <path
        fill="#fff"
        d="M461.114,477.413a12.631,12.631,0,1,1,12.629,12.632,12.631,12.631,0,0,1-12.629-12.632m-6.829,0a19.458,19.458,0,1,0,19.458-19.458,19.457,19.457,0,0,0-19.458,19.458m35.139-20.229a4.547,4.547,0,1,0,4.549-4.545h0a4.549,4.549,0,0,0-4.547,4.545m-30.99,51.074a20.943,20.943,0,0,1-7.037-1.3,12.547,12.547,0,0,1-7.193-7.19,20.923,20.923,0,0,1-1.3-7.037c-.184-3.994-.22-5.194-.22-15.313s.04-11.316.22-15.314a21.082,21.082,0,0,1,1.3-7.037,12.54,12.54,0,0,1,7.193-7.193,20.924,20.924,0,0,1,7.037-1.3c3.994-.184,5.194-.22,15.309-.22s11.316.039,15.314.221a21.082,21.082,0,0,1,7.037,1.3,12.541,12.541,0,0,1,7.193,7.193,20.926,20.926,0,0,1,1.3,7.037c.184,4,.22,5.194.22,15.314s-.037,11.316-.22,15.314a21.023,21.023,0,0,1-1.3,7.037,12.547,12.547,0,0,1-7.193,7.19,20.925,20.925,0,0,1-7.037,1.3c-3.994.184-5.194.22-15.314.22s-11.316-.037-15.309-.22m-.314-68.509a27.786,27.786,0,0,0-9.2,1.76,19.373,19.373,0,0,0-11.083,11.083,27.794,27.794,0,0,0-1.76,9.2c-.187,4.04-.229,5.332-.229,15.623s.043,11.582.229,15.623a27.793,27.793,0,0,0,1.76,9.2,19.374,19.374,0,0,0,11.083,11.083,27.813,27.813,0,0,0,9.2,1.76c4.042.184,5.332.229,15.623.229s11.582-.043,15.623-.229a27.8,27.8,0,0,0,9.2-1.76,19.374,19.374,0,0,0,11.083-11.083,27.716,27.716,0,0,0,1.76-9.2c.184-4.043.226-5.332.226-15.623s-.043-11.582-.226-15.623a27.786,27.786,0,0,0-1.76-9.2,19.379,19.379,0,0,0-11.08-11.083,27.748,27.748,0,0,0-9.2-1.76c-4.041-.185-5.332-.229-15.621-.229s-11.583.043-15.626.229"
        data-name="Path 18"
        transform="translate(-422.637 -426.196)"
      ></path>
    </svg>,
  ];
  const youtube = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28.87 28.87"
      id="youtube"
      width="30"
      height="30"
      key={2}
    >
      <g data-name="Layer 2">
        <g data-name="Layer 1">
          <rect width="28.87" height="28.87" fill="#fd3832" rx="6.48" ry="6.48"></rect>
          <path
            fill="#fff"
            fillRule="evenodd"
            d="M8 19.77a1.88 1.88 0 0 1-1.24-1.21c-.54-1.48-.7-7.66.34-8.88A2 2 0 0 1 8.46 9c2.79-.3 11.41-.26 12.4.1a1.94 1.94 0 0 1 1.22 1.17c.59 1.53.61 7.09-.08 8.56a1.89 1.89 0 0 1-.87.88c-1.04.52-11.75.51-13.13.06zm4.43-2.9l5-2.6-5-2.62z"
          ></path>
        </g>
      </g>
    </svg>,
  ];

  const linkedin = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="0 0 128 128"
      id="linkedin"
      width="30"
      height="30"
      key={3}
    >
      <rect width="128" height="128" fill="#0177b5" rx="24" ry="24"></rect>
      <path
        fill="#fff"
        d="M92 32H36a4 4 0 0 0-4 4v56a4 4 0 0 0 4 4h56a4 4 0 0 0 4-4V36a4 4 0 0 0-4-4ZM52 86H42V56h10Zm-5-34a6 6 0 1 1 6-6 6 6 0 0 1-6 6Zm39 34H76V66c0-1.66-2.24-3-5-3-4 0-5 5.34-5 7v16H56V56h10v7c0-5 4.48-7 10-7a10 10 0 0 1 10 10Z"
      ></path>
    </svg>,
  ];
  const tiktok = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      id="tiktok"
      width="30"
      height="30"
      style={{ background: '#fff' }}
      key={4}
    >
      <path d="M21 2H3a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Zm-3.281 8.725a3.602 3.602 0 0 1-.328.017A3.571 3.571 0 0 1 14.4 9.129v5.493a4.061 4.061 0 1 1-4.06-4.06c.085 0 .167.008.251.013v2a2.067 2.067 0 1 0-.251 4.119 2.123 2.123 0 0 0 2.16-2.045l.02-9.331h1.914A3.564 3.564 0 0 0 17.719 8.5Z"></path>
    </svg>,
  ];

  return (
    <Box>
      <FooterBanner>
        <img src="../images/logo/logo2.webp" alt="Trung Tâm Hướng Nghiệp ĐBSCL" />
        <h1
          style={{
            color: 'var(--text-white-color)',
            textAlign: 'center',
            marginLeft: 10,
          }}
        >
          Trung Tâm Hướng Nghiệp ĐBSCL
        </h1>
      </FooterBanner>
      <FooterContainer>
        <Row>
          <Column>
            <Heading>Thông Tin</Heading>
            <FooterLink href="#">Các Trường Đại Học</FooterLink>
            <FooterLink href="#">Phương Pháp trác nghiệm</FooterLink>
          </Column>
          <Column>
            <Heading>Dịch vụ</Heading>
            <FooterLink href="#">chuyên viên tư vấn</FooterLink>
          </Column>
          <Column>
            <Heading>Social Media</Heading>
            <FooterLinkIcon>
              {facebook}
              {instagram}
              {youtube}
              {linkedin}
              {tiktok}
            </FooterLinkIcon>
          </Column>
        </Row>
      </FooterContainer>
    </Box>
  );
}
const Box = styled.div`
  padding: 5% 2.5%;
  background: var(--footer-color);
  // position: absolute;
  bottom: 0;
  width: 100%;
  margin-top: 60px;

  @media (max-width: 1000px) {
    // padding: 70px 30px;
  }
`;
const FooterBanner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 100px;
  }
`;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
  /* background: red; */
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 60px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(185px, 1fr));
  grid-gap: 20px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }
`;

const FooterLink = styled.a`
  color: var(--text-white-color);
  margin-bottom: 20px;
  font-size: 18px;
  text-decoration: none;
  text-transform: capitalize;

  &:hover {
    opacity: 0.5;
    transition: 200ms ease-in;
  }
`;
const FooterLinkIcon = styled.div`
  color: #fff;
  display: flex;

  align-items: center;
  font-size: 30px;
  svg {
    margin: 8px;
    cursor: pointer;
    &:hover {
      transform: scale(1.2);
    }
  }
`;

const Heading = styled.p`
  font-size: 24px;
  color: #fff;
  margin-bottom: 15px;
  font-weight: bold;
  text-transform: uppercase;
`;

export default CLientFooter;
