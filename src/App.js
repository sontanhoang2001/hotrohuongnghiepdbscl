import { Outlet } from 'react-router-dom';
import Header from './components/header';
import CLientFooter from './components/footer';
import { Button, Drawer, FloatButton, Input, List, Select } from 'antd';
import { CommentOutlined, MessageOutlined } from '@ant-design/icons';
import { useState } from 'react';
import styled from 'styled-components';
import { MessageContent, YourMessageContent } from './globalStyles';

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
          allowClear
          style={{ width: '100%', marginBottom: 20 }}
        />

        <ChatBox>
          <Messages>
            <MessageContent>Hey, man! What's up, Mr Stark?👋</MessageContent>
            <YourMessageContent>Kid, where'd you come from?</YourMessageContent>
            <MessageContent>Hey, man! What's up, Mr Stark?👋</MessageContent>
            <YourMessageContent>Kid, where'd you come from?</YourMessageContent>
            <MessageContent>Hey, man! What's up, Mr Stark?👋</MessageContent>
            <YourMessageContent>Kid, where'd you come from?</YourMessageContent>
            <MessageContent>Hey, man! What's up, Mr Stark?👋</MessageContent>
            <YourMessageContent>Kid, where'd you come from?</YourMessageContent>
            <ChatInput></ChatInput>
          </Messages>
        </ChatBox>
        <Input
          placeholder="Nhập nội dung..."
          suffix={<MessageOutlined style={{ fontSize: 25, color: `#d9d9d9` }} />}
          style={{ height: 50 }}
        />
      </Drawer>

      <CLientFooter />
    </div>
  );
}
const ChatBox = styled.div`
  display: flex;
  height: 90%;
  flex-direction: column;
  justify-content: space-between;
  z-index: 2;
  box-sizing: border-box;
  border-radius: 1rem;
  /* background: white; */
  box-shadow: 0 0 8rem 0 rgba(0, 0, 0, 0.1), 0rem 2rem 4rem -3rem rgba(0, 0, 0, 0.5);
`;
const Messages = styled.div`
  /* background: #f7f7f7; */
  flex-shrink: 2;
  overflow-y: auto;
`;
const ChatInput = styled.div`
  box-sizing: border-box;
  flex-basis: 4rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 0 0.5rem 0 1.5rem;
`;
export default App;
