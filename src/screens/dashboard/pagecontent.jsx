import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

function PageContent() {
  return (
    <Content>
      <Outlet />
    </Content>
  );
}
const Content = styled.div`
  padding-left: 12px;
`;

export default PageContent;
