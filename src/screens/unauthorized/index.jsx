import React from 'react';
import { Button, Result } from 'antd';

function Unauthorized() {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Bạn không có quyền truy cập vào trang"
      extra={<Button type="primary">Back Home</Button>}
    />
  );
}

export default Unauthorized;
