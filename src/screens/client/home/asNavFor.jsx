import { Button } from 'antd';
import React, { Component } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

const data = [{ iamge: './images/', title: '' }];

export default class AsNavFor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null,
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }

  render() {
    return (
      <NewsContainer className="container">
        <NewsTitle>tin tức</NewsTitle>
        <Slider asNavFor={this.state.nav2} ref={(slider) => (this.slider1 = slider)}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
        <Slider
          asNavFor={this.state.nav1}
          ref={(slider) => (this.slider2 = slider)}
          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}
          vertical={true}
        >
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
        <div className="row">
          <Button type="primary" size="large">
            <ReadmoreBtn>xem thêm</ReadmoreBtn>
          </Button>
        </div>
      </NewsContainer>
    );
  }
}
const NewsContainer = styled.div`
  margin-top: 5%;
`;

const NewsTitle = styled.div`
  width: 100%;
  text-align: center;
  text-transform: capitalize;
  font-weight: 600;
  font-size: 2rem;
`;
const ReadmoreBtn = styled.span`
  margin-left: auto;
  margin-right: auto;
  text-transform: capitalize;
  font-weight: 300;
  font-size: 1.2rem;
`;
