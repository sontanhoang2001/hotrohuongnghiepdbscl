import React from 'react';
import { MessageContent, YourMessageContent } from '../../../globalStyles';
import styled from 'styled-components';
import { ConfigProvider, Input, List } from 'antd';
import { SearchOutlined, SmileOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllOrgChats,
  getMessageByChatId,
  setCurrentOrgUserChatInfo,
} from '../../../redux/chatSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRef } from 'react';

const data = [
  {
    name: 'Nguyen thi b',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    lastMessage: 'Excepteur est magna est non ex elit.',
  },
  {
    name: 'Nguyen van b',
    image:
      'http://e0.365dm.com/16/08/16-9/20/theirry-henry-sky-sports-pundit_3766131.jpg?20161212144602',
    lastMessage: 'Excepteur est magna est non ex elit.',
  },
  {
    name: 'Nguyen thi c',
    image:
      'https://images.unsplash.com/photo-1497551060073-4c…x8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80',
    lastMessage: 'Excepteur est magna est non ex elit.',
  },
  {
    name: 'Nguyen thi d',
    image:
      'https://images.unsplash.com/photo-1553514029-1318c9127859?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80',
    lastMessage: 'Excepteur est magna est non ex elit.',
  },
];
const smileFace = [
  <svg
    className="feather feather-smile sc-dnqmqq jxshSx"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
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
    aria-hidden="true"
    key={1}
  >
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>,
];

const OrganizationChat = () => {
  const apiHost = process.env.REACT_APP_API_URL;
  const host = apiHost.substring(0, apiHost.indexOf('/api'));
  const dispatch = useDispatch();
  //redux state
  const { chats, orgCurrentChatId,currentOrgChatMessagesCount, orgMessages, orgCurrentUserAvatar, orgCurrentUserName,orgCurrentUserId} =
    useSelector((state) => state.chat);
  const { organization } = useSelector((state) => state.university);

  const [selected, setSelected] = useState(null);

  //Lấy danh sách messages
  const handleActive = ({ chatId, orgCurrentUserName, orgCurrentUserAvatar,orgCurrentUserId }) => {
    dispatch(setCurrentOrgUserChatInfo({ chatId, orgCurrentUserName, orgCurrentUserAvatar,orgCurrentUserId }));
    dispatch(getMessageByChatId({ chatId, beforeId: -1 }));    
  };

  //Lấy danh sách chats
  useEffect(() => {
    dispatch(getAllOrgChats({ organizationId: organization.id, page: 1, size: 20, search: '' }));
  }, [dispatch, organization.id]);

  //Scroll to end on init
  useEffect(() => {
    window.scrollTo({
      top: 1000,
      behavior: 'smooth', // Optionally, you can use 'auto' for instant scrolling
    });
  }, []);

   //Load more messages
   const chatBoxRef = useRef();
   const loadMoreData = () => {
    //  dispatch(loadMoreStudentMessageByChatId()).then(() => {
    //    chatBoxRef.current.scrollTop += 500;
    //  });
   };

  return (
    <ChatContainer>
      {/* ===========Bắt đầu leftcontent========== */}
      <LeftContent>
        <LeftContentHeader>
          <Input placeholder="Tìm Kiếm..." prefix={<SearchOutlined />} style={{ width: '80%' }} />
        </LeftContentHeader>
        <LeftContentList>
          {/* test in bằng mảng dữ liệu*/}
          {chats.map((chat, idx) => (
            <Discussion
              key={idx}
              className={selected != null && selected === idx ? 'discussion-active' : ''}
              onClick={() =>
                handleActive({
                  chatId: chat.chatId,
                  orgCurrentUserName: chat.senderFullName,
                  orgCurrentUserAvatar: chat.senderAvatar,
                  orgCurrentUserId:chat.senderId
                })
              }
            >
              <ChatAvatar
                style={{
                  backgroundImage: `url(${chat.senderAvatar??"https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=626&ext=jpg"})`,
                }}
              >
                <OnlineStatus></OnlineStatus>
              </ChatAvatar>
              <ChatStatus>
                <ChatStatusName>{chat.senderFullName}</ChatStatusName>
                <LastMessage>{chat.content}</LastMessage>
              </ChatStatus>
              <LeftTimer>{getTimeDiff(chat.createdAt)}</LeftTimer>
            </Discussion>
          ))}
        </LeftContentList>
      </LeftContent>
      {/* ===========Kết Thúc leftcontent========== */}
      {/* ===========Bát đầu RightContent========== */}
      <RightContent>
        <RightContentHeader>
          <RightChatAvatar
            style={{
              backgroundImage:
              `url(${orgCurrentUserAvatar??"https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=626&ext=jpg"})`,
            }}
          ></RightChatAvatar>
          <Rightinfo>
            <RightChatName>{orgCurrentUserName}</RightChatName>
            {/* <RightTimer>Hoạt động 1h trước</RightTimer> */}
          </Rightinfo>
        </RightContentHeader>
        <div
              id="scrollableDiv"
              ref={chatBoxRef}
              style={{
                height: 500,
                overflow: 'auto',
                padding: '0 16px',
                display: 'flex',
                flexDirection: 'column-reverse',
              }}
            >
              <InfiniteScroll
                dataLength={orgMessages.length}
                next={loadMoreData}
                hasMore={orgMessages.length < currentOrgChatMessagesCount}
                inverse={true}
                scrollableTarget="scrollableDiv"
              >
              
                  <List
                    dataSource={orgMessages}
                    renderItem={(mess, idx) =>
                      (mess.senderId === orgCurrentUserId && (
                        <MessageContent key={idx}>{mess.content}</MessageContent>
                      )) || <YourMessageContent key={idx}>{mess.content}</YourMessageContent>
                    }
                  />
                
              </InfiniteScroll>
            </div>
        {/* <ChatBox>
        {orgMessages.map((message)=>(
            message.<MessageContent>Hey, man! What's up, Mr Stark?👋</MessageContent>||
          <YourMessageContent>Kid, where'd you come from?</YourMessageContent>
        ))}
         
        </ChatBox> */}
        <FooterChat>
          <span className="smile-face">{smileFace}</span>
          <Input placeholder="Nhập nội dung..." style={{ height: 50 }} />
          <span className="paper-plane"> {paperPlane}</span>
        </FooterChat>
      </RightContent>
      {/* ===========Kết Thúc RightContent========== */}
    </ChatContainer>
  );
};

function getTimeDiff(dateString) {
  // Chuyển đổi chuỗi ngày thành đối tượng Date
  const ngayTruoc = new Date(dateString);

  // Lấy thời điểm hiện tại
  const thoiDiemHienTai = new Date();

  // Tính toán khoảng cách thời gian (đơn vị: phút)
  const khoangCachPhut = Math.floor((thoiDiemHienTai - ngayTruoc) / (1000 * 60));

  // Kiểm tra và trả về kết quả
  if (khoangCachPhut < 60) {
    return `${khoangCachPhut} phút`;
  } else if (khoangCachPhut < 1440) {
    // 1440 phút = 1 ngày
    const soGio = Math.floor(khoangCachPhut / 60);
    return `${soGio} giờ`;
  } else {
    const soNgay = Math.floor(khoangCachPhut / 1440);
    return `${soNgay} ngày`;
  }
}

const heightOfHeader = '90';
const heightOfFooter = '80';

const ChatContainer = styled.div`
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 15px;
`;

const Avatar = styled.div`
  display: block;
  background: #e6e7ed;
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
//===========Bắt đầu leftcontent==========
const LeftContent = styled.div`
  width: 35%;
  height: 700px;
  overflow: hidden;
  display: inline-block;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.2);
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
  border-top-left-radius: 15px;
`;
const LeftContentList = styled.div`
  height: calc(100% - ${heightOfHeader}px);
  overflow-y: auto;
  border-bottom-left-radius: 15px;
  .discussion-active {
    background-color: #e5efff;
  }
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
//hình ảnh người dùng
const ChatAvatar = styled(Avatar)`
  margin-left: 20px;
  width: 45px;
  height: 45px;
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
  width: 60px;
  text-align: center;
  color: #bbb;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 15px;
`;
//=========Kết Thúc leftcontent===========

//=========Bắt Đầu RightContent===========
const RightContent = styled.div`
  width: 65%;
  height: 700px;
`;
const RightContentHeader = styled.div`
  background-color: #fff;
  height: ${heightOfHeader}px;
  box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  border-top-right-radius: 15px;
`;

const RightChatAvatar = styled(Avatar)`
  margin-left: 20px;
  width: 60px;
  height: 60px;
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
  height: calc(100% - ${heightOfHeader}px - ${heightOfFooter}px);
  padding: 25px 35px;
  overflow-y: auto;
`;

const FooterChat = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-top: 2px solid #eee;
  border-left: 1px solid #e0e0e0;
  border-bottom-right-radius: 15px;
  height: ${heightOfFooter}px;
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
//=========Kết Thúc RightContent===========

export default OrganizationChat;
