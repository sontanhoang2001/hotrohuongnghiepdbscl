import { MessageOutlined, SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { MessageContent, YourMessageContent } from '../../../globalStyles';
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
function Chat() {
  return (
    <div style={{ display: 'flex' }}>
      {/* ===========Bắt đầu leftcontent========== */}
      <LeftContent>
        <LeftContentHeader>
          <Input
            className="header-search"
            placeholder="Tìm Kiếm..."
            prefix={<SearchOutlined />}
            style={{ width: '80%' }}
          />
        </LeftContentHeader>
        <LeftContentList>
          {/* người dùng đang được chọn */}
          <DiscussionActive>
            <ChatAvatar
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)',
              }}
            >
              <OnlineStatus></OnlineStatus>
            </ChatAvatar>
            <ChatStatus>
              <ChatStatusName>Tôn Không Ngộ</ChatStatusName>
              <LastMessage>Excepteur est magna est non ex elit.</LastMessage>
            </ChatStatus>
            <LeftTimer>12s</LeftTimer>
          </DiscussionActive>
          {/* Người dùng chưa được chọn */}
          <Discussion>
            <ChatAvatar
              style={{
                backgroundImage:
                  'url(http://e0.365dm.com/16/08/16-9/20/theirry-henry-sky-sports-pundit_3766131.jpg?20161212144602)',
              }}
            >
              <OnlineStatus></OnlineStatus>
            </ChatAvatar>
            <ChatStatus>
              <ChatStatusName>Tôn Ngộ Không</ChatStatusName>
              <LastMessage>Excepteur est magna est non ex elit.</LastMessage>
            </ChatStatus>
            <LeftTimer>1 tiếng</LeftTimer>
          </Discussion>
          {/* Người dùng chưa được chọn */}
          <Discussion>
            <ChatAvatar
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1497551060073-4c…x8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80)',
              }}
            ></ChatAvatar>
            <ChatStatus>
              <ChatStatusName>Tôn Ngộ Không</ChatStatusName>
              <LastMessage>Excepteur est magna est non ex elit.</LastMessage>
            </ChatStatus>
          </Discussion>
          {/* Người dùng chưa được chọn */}
          <Discussion>
            <ChatAvatar
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1553514029-1318c9127859?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80)',
              }}
            >
              <OnlineStatus></OnlineStatus>
            </ChatAvatar>
            <ChatStatus>
              <ChatStatusName>Tôn Ngộ Không</ChatStatusName>
              <LastMessage>Excepteur est magna est non ex elit.</LastMessage>
            </ChatStatus>
            <LeftTimer>1 tiếng</LeftTimer>
          </Discussion>
        </LeftContentList>
      </LeftContent>
      {/* ===========Kết Thúc leftcontent========== */}
      {/* ===========Bát đầu RightContent========== */}
      <RightContent>
        <RightContentHeader>
          <RightChatAvatar
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)',
            }}
          ></RightChatAvatar>
          <Rightinfo>
            <RightChatName>Tôn Ngộ Không</RightChatName>
            <RightTimer>Hoạt động 1h trước</RightTimer>
          </Rightinfo>
        </RightContentHeader>
        <ChatBox>
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
        </ChatBox>
      </RightContent>
      {/* ===========Kết Thúc RightContent========== */}
    </div>
  );
}
const heightOfHeader = '90';
//===========Bắt đầu leftcontent==========
const LeftContent = styled.div`
  width: 35%;
  height: 700px;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: inline-block;
`;

const LeftContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e0e0e0;
  width: 100%;
  height: ${heightOfHeader}px;
  background-color: #fafafa;
  border-bottom: solid 1px #e0e0e0;
`;
const LeftContentList = styled.div`
  height: calc(100% - ${heightOfHeader}px);
  overflow-y: auto;
`;
//người dùng chưa active
const Discussion = styled.div`
  width: 100%;
  height: 90px;
  background-color: #fafafa;
  border-bottom: solid 1px #e0e0e0;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #e5efff;
  }
`;

//dùng cho người dùng đang được chọn khi nhắn tin
const DiscussionActive = styled(Discussion)`
  /* width: 98.5%; */
  height: 90px;
  background-color: #e5efff;
`;
//hình ảnh người dùng
const ChatAvatar = styled.div`
  margin-left: 20px;
  display: block;
  width: 45px;
  height: 45px;
  background: #e6e7ed;
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
//trạng thái hoạt động của người dùng hiển thị ở góc dưới phải avatar
const OnlineStatus = styled.div`
  position: relative;
  top: 30px;
  left: 35px;
  width: 13px;
  height: 13px;
  background-color: #8bc34a;
  border-radius: 13px;
  border: 3px solid #fafafa;
`;

const ChatStatus = styled.div`
  height: 43px px;
  width: 50%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const ChatStatusName = styled.p`
  margin: 0 0 0 20px;

  font-size: 11pt;
  font-weight: 600;
  color: #515151;
`;

const LastMessage = styled.p`
  margin: 6px 0 0 20px;

  font-size: 9pt;
  color: #515151;
`;

const LeftTimer = styled.div`
  margin-left: 15%;
  font-family: 'Open Sans', sans-serif;
  font-size: 11px;
  padding: 3px 8px;
  color: #bbb;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 15px;
`;
//=========Kết Thúc leftcontent===========

//=========Bắt Đầu RightContent===========
const RightContent = styled.div`
  width: calc(65% - 80px);
  height: 700px;
`;
const RightContentHeader = styled.div`
  background-color: #fff;
  height: ${heightOfHeader}px;
  box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
`;

const RightChatAvatar = styled.div`
  margin-left: 20px;
  display: block;
  width: 60px;
  height: 60px;
  background: #e6e7ed;
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
const Rightinfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const RightChatName = styled.p`
  margin: 0 0 0 20px;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 600;

  color: #515151;
`;

const RightTimer = styled.p`
  margin: 0 0 0 20px;
  margin: 0 0 0 20px;
  color: #7589a3;
`;

const ChatBox = styled.div`
  height: calc(100% - ${heightOfHeader}px);
  padding: 25px 35px;
  overflow-y: auto;
`;

const FooterChat = styled.div``;
//=========Kết Thúc RightContent===========
export default Chat;
