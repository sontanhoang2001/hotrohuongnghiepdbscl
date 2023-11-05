import React from 'react';
import { Table } from 'antd';

const TableFormat = ({ data, columns, loading }) => {
  if (!Array.isArray(data)) {
    data = []; // Ensure data is an array
  }

  return (
    <Table
      bordered={true}
      loading={loading}
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  );
};
export default TableFormat;
