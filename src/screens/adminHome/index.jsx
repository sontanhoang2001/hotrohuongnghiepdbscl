import { Space, Typography } from 'antd';
import React from 'react';

function AdminHome() {
  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space></Space>
    </Space>
  );
}

export default AdminHome;
