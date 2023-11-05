import React from 'react';
import { Space, Table, Tag } from 'antd';

const TableTest = ({ data, columns, loading }) => {
  if (!Array.isArray(data)) {
    data = []; // Ensure data is an array
    console.log(data); // Log the data to the console
  }

  return <Table loading={loading} columns={columns} dataSource={data} pagination={false} />;
};

export default TableTest;
