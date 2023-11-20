import React from 'react';
import { MarginTopContent, Title } from '../../../globalStyles';
import { useParams } from 'react-router-dom';
import { news } from '../news/news';
import { Card } from 'antd';
import styled from 'styled-components';

function NewsDetail() {
  const params = useParams();
  const newsDetail = news.find((news) => news.id.toString() === params.newsId);

  return (
    <div className="container">
      <MarginTopContent>
        <Card>
          <NewsTitle>
            <h2>{newsDetail?.title}</h2>
          </NewsTitle>
          <NewsContent>
            <p>{newsDetail?.content}</p>
          </NewsContent>
          <div></div>
        </Card>
      </MarginTopContent>
    </div>
  );
}

const NewsTitle = styled.div`
  text-transform: uppercase;
  text-align: center;
`;

const NewsContent = styled.div`
  margin-top: 3%;
`;
export default NewsDetail;
