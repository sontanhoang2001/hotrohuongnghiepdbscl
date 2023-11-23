import React from 'react';
import { HeadingTitle, MarginTopContent, SearchBox, Title } from '../../../globalStyles';
import { Button, Card, Col, ConfigProvider, Input, List, Pagination, Row, Skeleton } from 'antd';
import styled from 'styled-components';
import viVN from 'antd/lib/locale/vi_VN';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllPublicFaqsApi,
  selectFAQSParamsClient,
  selectFAQSPending,
  selectPublicFAQS,
} from '../../../redux/faqsSlice';
import { useEffect } from 'react';

function Companion() {
  //gọi redux
  const dispatch = useDispatch();
  const faqsParams = useSelector(selectFAQSParamsClient);
  const pendingState = useSelector(selectFAQSPending);
  const getFaqs = useSelector(selectPublicFAQS);

  useEffect(() => {
    //gọi api thông qua redux
    dispatch(getAllPublicFaqsApi(faqsParams));
  }, []);

  //hàm bắt sự kiện phân trang và làm mới lại api
  const handlePageChange = (page, pageSize) => {
    dispatch(getAllPublicFaqsApi({ ...faqsParams, page: page, size: pageSize }));
    window.scrollTo(0, 0);
  };
  //tìm kiếm
  const onSearchChange = debounce((e) => {
    if (e.target.value === '') {
      dispatch(getAllPublicFaqsApi({ ...faqsParams, search: e.target.value }));
    }
  }, 500);
  const onSearch = (value) => {
    dispatch(getAllPublicFaqsApi({ ...faqsParams, search: value }));
  };
  return (
    <div className="container">
      <div>
        <Title>
          <HeadingTitle>các câu hỏi thường gặp</HeadingTitle>
          <div className="underline"></div>
        </Title>
        <SearchBar>
          <SearchBarContent>
            <SearchBox>
              <ConfigProvider locale={viVN}>
                <Input.Search
                  placeholder="Tìm kiếm..."
                  onChange={onSearchChange}
                  onSearch={onSearch}
                  enterButton={
                    <Button type="primary" style={{ height: 50 }}>
                      Tìm kiếm
                    </Button>
                  }
                  allowClear
                  style={{ height: 50 }}
                />
              </ConfigProvider>
            </SearchBox>
          </SearchBarContent>
        </SearchBar>
        <MarginTopContent>
          <Row justify="center">
            <Col span={20}>
              <Skeleton
                loading={pendingState}
                active
                title={false}
                paragraph={{
                  rows: 4,
                }}
                style={{ marginTop: `3%` }}
              >
                {/* <List
                  dataSource={data}
                  renderItem={(val, idx) => <div key={idx}>{val.question}</div>}
                /> */}
                <List
                  grid={{ column: 1 }}
                  itemLayout="horizontal"
                  dataSource={getFaqs?.data}
                  pagination={false}
                  //render content
                  renderItem={(val, idx) => (
                    <List.Item>
                      <Card
                        // key={idx}
                        style={{ marginTop: 20, boxShadow: `rgba(0, 0, 0, 0.24) 0px 3px 8px` }}
                      >
                        <h4>Câu hỏi: {val?.question}</h4>
                        <br />
                        <p style={{ textAlign: 'justify' }}>
                          <b>Giải đáp:</b> {val?.answer}
                        </p>
                      </Card>
                    </List.Item>
                  )}
                />
                <Pagination
                  current={faqsParams?.page}
                  pageSize={faqsParams?.size}
                  total={faqsParams?.total}
                  onChange={handlePageChange}
                  showQuickJumper
                  showSizeChanger
                  onShowSizeChange={handlePageChange}
                  style={{ marginTop: 20, marginBottom: 20 }}
                />
              </Skeleton>
            </Col>
          </Row>
        </MarginTopContent>
      </div>
    </div>
  );
}
const SearchBar = styled.div`
  height: 300px;
  width: 100%;
  background: url('../images/arrows-2980845.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
const SearchBarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  height: 300px;
`;

export default Companion;
