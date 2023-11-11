import { Outlet } from 'react-router-dom';
import Header from './components/header';
import CLientFooter from './components/footer';
import { Button, Drawer, FloatButton, Input, List, Select } from 'antd';
import { CommentOutlined, MessageOutlined } from '@ant-design/icons';
import { useState } from 'react';
import styled from 'styled-components';
import { MessageContent, YourMessageContent } from './globalStyles';

const smileFace = [
  <svg
    class="feather feather-smile sc-dnqmqq jxshSx"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    ariaHidden="true"
    key={0}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
    <line x1="9" y1="9" x2="9.01" y2="9"></line>
    <line x1="15" y1="9" x2="15.01" y2="9"></line>
  </svg>,
];
const paperPlane = [
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    ariaHidden="true"
    dataReactid="1036"
    key={1}
  >
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>,
];
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
          <ContactBar>
            <div className="contact-pic">
              <img src="./images/4939493.png" alt="Nguyen Thi B"></img>
            </div>
            <div className="contact-name">Nguyen Thi B</div>
          </ContactBar>
          <Messages>
            <MessageContent>Hey, man! What's up, Mr Stark?👋</MessageContent>
            <YourMessageContent>Kid, where'd you come from?</YourMessageContent>
            <MessageContent>Hey, man! What's up, Mr Stark?👋</MessageContent>
            <YourMessageContent>Kid, where'd you come from?</YourMessageContent>
            <MessageContent>Hey, man! What's up, Mr Stark?👋</MessageContent>
            <YourMessageContent>Kid, where'd you come from?</YourMessageContent>
            <MessageContent>Hey, man! What's up, Mr Stark?👋</MessageContent>
            <YourMessageContent>Kid, where'd you come from?</YourMessageContent>
            <YourMessageContent>Kid, where'd you come from?</YourMessageContent>
            <MessageContent>Hey, man! What's up, Mr Stark?👋</MessageContent>
            <YourMessageContent>Kid, where'd you come from?</YourMessageContent>
            <YourMessageContent>Kid, where'd you come from?</YourMessageContent>
            <MessageContent>Hey, man! What's up, Mr Stark?👋</MessageContent>
            <YourMessageContent>Kid, where'd you come from?</YourMessageContent>
            <YourMessageContent>Kid, where'd you come from?</YourMessageContent>
            <MessageContent>Hey, man! What's up, Mr Stark?👋</MessageContent>
            <YourMessageContent>Kid, where'd you come from?</YourMessageContent>
            <YourMessageContent>Kid, where'd you come from?</YourMessageContent>
            <MessageContent>Hey, man! What's up, Mr Stark?👋</MessageContent>
            <YourMessageContent>Kid, where'd you come from?</YourMessageContent>
          </Messages>

          <FooterChat>
            <span className="smile-face">{smileFace}</span>
            <Input
              placeholder="Nhập nội dung..."
              suffix={<MessageOutlined style={{ fontSize: 25, color: `#d9d9d9` }} />}
              style={{ height: 50 }}
            />
            <span className="paper-plane"> {paperPlane}</span>
          </FooterChat>
        </ChatBox>
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
  border-radius: 20px;

  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background: #f7f7f7;
`;

const ContactBar = styled.div`
  flex-basis: 3.5rem rem;
  flex-shrink: 0;
  box-sizing: border-box;
  position: relative;
  padding-left: 5rem;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  .contact-pic {
    position: absolute;
    left: 10px;
    width: 4rem;
    height: 4rem;
    background-size: cover;
    background-position: center;
    border-radius: 50%;
  }
  .contact-name {
    font-family: Red hat Display, sans-serif;
    font-weight: 400;
    line-height: 1.25em;
    letter-spacing: 0.025em;
    color: #333;
  }
`;
const Messages = styled.div`
  flex-shrink: 2;
  overflow-y: auto;
`;
const FooterChat = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  border-top: 2px solid #eee;
  justify-content: space-between;
  background: white;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  span {
    height: 40px;
    padding: 0 15px;
    font-weight: 600;
    font-size: 12px;
    line-height: 40px;
    display: flex;
    align-items: center;
  }
  .smile-face {
    &:hover {
      color: orange;
    }
  }
  .paper-plane {
    &:hover {
      color: var(--primary-color);
    }
  }
`;
export default App;
