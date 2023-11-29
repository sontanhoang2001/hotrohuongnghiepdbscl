import { Card } from 'antd';
import React from 'react';
import styled from 'styled-components';

const { Meta } = Card;
function ImageCard(props) {
  return (
    <SimpleCard>
      <Card
        cover={<img alt="example" src={props.src} style={{ width: `100%`, objectFit: 'cover' }} />}
        style={{ height: `100%` }}
      >
        {props.personality ? (
          <p
            style={{
              textAlign: `center`,
              fontWeight: 800,
              fontSize: '20pt',
              color: `var(--primary-color)`,
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            {props.title}
          </p>
        ) : (
          <Meta title={props.title} style={{ marginTop: 10, textAlign: 'center' }} />
        )}
        <p style={{ marginTop: 10, textAlign: 'justify' }}>{props.description}</p>
      </Card>
    </SimpleCard>
  );
}
const SimpleCard = styled.div`
  height: 100%;
  .card-container {
    height: 100%;
  }
  .ant-card {
    margin: 0 10px;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 8px 12px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    div > img {
      height: 300px;
      object-fit: cover;
    }
    &:hover {
      opacity: 0.7;
      transform: scale(1.05);
    }
    .ant-card-meta {
      text-transform: capitalize;
      .ant-card-meta-detail {
        .ant-card-meta-title {
          white-space: inherit;
        }
      }
    }
    .personality-name .ant-card-meta-detail .ant-card-meta-title {
      text-align: center;
      font-weight: 800;
      font-size: 20pt;
      color: var(--primary-color);
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
`;
export default ImageCard;
