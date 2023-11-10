import { Outlet } from 'react-router-dom';
import Header from './components/header';
import CLientFooter from './components/footer';
import { Button, Drawer, FloatButton, Input, Popover, Select, Space, Switch } from 'antd';
import { CommentOutlined, CustomerServiceOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import styled from 'styled-components';

function App() {
  const [openSelect, setOpenSelect] = useState(true);
  const [open, setOpen] = useState(false);
  const OPTIONS = ['Dh Can tho', 'DH Nam CT', 'DH ', 'Helicopters'];

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const onChange = (checked) => {
    setOpenSelect(checked);
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };
  const onClose = () => {
    setOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };

  return (
    <div className="App">
      <Header />
      <Outlet />

      <FloatButton icon={<CommentOutlined />} type="primary" onClick={showDrawer}>
        Open
      </FloatButton>
      <Drawer
        title="Hỗ trợ trực tuyến"
        placement={'right'}
        width={500}
        onClose={onClose}
        open={open}
      >
        <Select
          showSearch
          placeholder="Chọn trường cần tư vấn"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={filterOption}
          options={OPTIONS.map((item) => ({
            value: item,
            label: item,
          }))}
          style={{ width: '100%' }}
        />
        <ChatBox>
          <InputMessage>
            <Input
              placeholder="Enter your username"
              suffix={
                <InfoCircleOutlined
                  style={{
                    color: 'rgba(0,0,0,.45)',
                  }}
                />
              }
            />
          </InputMessage>
        </ChatBox>
      </Drawer>

      <CLientFooter />
    </div>
  );
}
const ChatBox = styled.div`
  height: 80%;
  width: 100%;
  background-color: red;
  position: relative;
`;
const InputMessage = styled.div`
  width: 90%;
  position: absolute;
  display: flex;
  justify-content: center;
  bottom: 0;
`;
export default App;
