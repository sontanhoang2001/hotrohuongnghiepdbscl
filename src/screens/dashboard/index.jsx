import React from 'react';
import AdminHeader from '../../components/adminHeader';
import SideMenu from '../../components/sideMenu';
import styled from 'styled-components';
import PageContent from './pagecontent';
import { Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <DashboardContainer>
      <AdminHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </DashboardContainer>
  );
}

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  .SideMenuAndPageContent {
    display: flex;
    flex: 1;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: rgba(0, 0, 0, 0.05);
  }
  .content {
    padding-left: 12px;
  }
`;

export default Dashboard;
