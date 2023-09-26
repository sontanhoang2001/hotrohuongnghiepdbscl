import React, { useState } from 'react';
import styled from 'styled-components';
import ImageCard from '../../components/card/imageCard';
import { Card, List, Pagination } from 'antd';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const data = [
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
];

function News() {
  return (
    <div>
      <div>
        <Title className="container">
          <h3>tin tức</h3>
          <div className="underline"></div>
        </Title>
        <Centent className="container">
          <List
            grid={{ column: 3 }} //The grid type of list. You can set grid to something like {gutter: 16, column: 4}
            dataSource={data} //DataSource array for list
            renderItem={(val, idx) => <ImageCard url="" />} //Customize list item when using dataSource
          ></List>
        </Centent>
      </div>
    </div>
  );
}
const Title = styled.div`
  margin-top: 60px;
  h3 {
    text-transform: uppercase;
    border-left: 10px solid var(--primary-color);
    margin-bottom: 10px;
    padding-left: 10px;
    font-size: 3rem;
    font-weight: 800;
  }
  .underline {
    border-bottom: 4px solid var(--primary-color);
  }
`;
const Centent = styled.div``;
const ContentCard = styled.div``;

export default News;
