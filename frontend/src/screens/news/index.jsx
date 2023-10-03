import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, List, Pagination } from 'antd';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const data = [
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc1',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc2',
    content:
      'Eiusmod laboris laboris culpa duis irure labore exercitation consectetur dolor magna sunt. Cillum magna veniam deserunt sunt aliqua qui sunt ex reprehenderit. Id occaecat laboris irure magna proident sunt. Enim eu anim ad duis non magna. Esse dolore irure aliquip do laboris consectetur eiusmod excepteur. Ullamco mollit velit ad cupidatat ex amet do do.',
  },
  {
    image: 'istockphoto-1402360271-612x612.jpg',
    title: 'abc3',
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
    title: 'abc4',
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
    title: 'abc6',
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
    title: 'abc8',
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
const { Meta } = Card;
function News() {
  const [loading, setLoading] = useState(false);
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    initialSlide: 0,
    dots: false,
    // autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    focusOnSelect: true,
  };

  return (
    <div>
      <div>
        <Title className="container">
          <h2>tin tức</h2>
          <div className="underline"></div>
        </Title>
        <div className="container">
          <List
            // grid={{ column: 2 }} //The grid type of list. You can set grid to something like {gutter: 16, column: 4}
            dataSource={data} //DataSource array for list
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 9,
            }}
            //render content
            renderItem={(val, idx) => (
              <NewsContainer>
                <div className="news-image">
                  <img src={`./images/news/${val.image}`} alt="news-iamge" />
                </div>
                <div className="news-content">
                  <span className="news-title">{val.title}</span>
                  <div>
                    <p className="content">
                      {val.content} <span className="read-more">xem thêm</span>
                    </p>
                  </div>
                </div>
              </NewsContainer>
            )}
          ></List>
        </div>
      </div>
    </div>
  );
}
const Title = styled.div`
  margin-top: 60px;
  h2 {
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
const NewsContainer = styled.div`
  display: flex;
  margin-top: 40px;
  max-height: 400px;
  /* border-bottom: 1px solid #f1f1f1; */
  background-color: #f1f1f1f1;
  .news-image {
    max-width: 300px;
    img {
      width: 300px;
      height: 100%;
      object-fit: cover;
    }
  }
  .news-content {
    padding: 20px 40px;
    text-align: justify;
    .news-title {
      font-size: 2rem;
      font-weight: 700;
      text-transform: capitalize;
    }
    .content {
      font-size: 1.6rem;
      font-weight: 200;
    }
    .read-more {
      text-decoration: underline;
      color: var(--secondary-color);
      text-align: right;
      width: 100%;
      cursor: pointer;
      font-size: 1.2rem;
    }
  }
`;

export default News;
