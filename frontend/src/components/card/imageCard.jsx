import { Card } from 'antd';
import React from 'react';
import styled from 'styled-components';

const { Meta } = Card;
function ImageCard(props) {
  return (
    <SimpleCard
      cover={<img alt="example" src="./images/news/istockphoto-1402360271-612x612.jpg" />}
    >
      <Meta title={props.title} />
    </SimpleCard>
  );
}

const SimpleCard = styled.div`
  .ant-card {
    margin: 20px 30px;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 8px 12px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    div > img {
      height: 300px;
      object-fit: cover;
    }
    &:hover {
      opacity: 0.7;
      transform: scale(1.05);
    }
  }
`;

export default ImageCard;
