import { CommentOutlined, SmileOutlined } from '@ant-design/icons';
import {
  ConfigProvider,
  Divider,
  Drawer,
  FloatButton,
  Input,
  List,
  Select,
  Skeleton,
  Spin,
} from 'antd';
import React, { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { MessageContent, YourMessageContent } from './../../globalStyles';
import { useEffect } from 'react';
import {
  getStudentMessageByChatId,
  loadMoreStudentMessageByChatId,
  pushMessage,
  setCurrentOrgId,
} from '../../redux/chatSlice';
import socketIOClient from 'socket.io-client';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getAllPublicUniversityInfo } from '../../redux/universitySlice';
import { debounce } from 'lodash';
import { calculateNewValue } from '@testing-library/user-event/dist/utils';

const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
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
    aria-hidden="true"
    key={1}
  >
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>,
];
const CustomerChatBox = () => {
  const apiHost = process.env.REACT_APP_API_URL;
  const host = apiHost.substring(0, apiHost.indexOf('/api'));
  const dispatch = useDispatch();
  //redux state
  const {
    messages,
    status,
    currentOrgId,
    currentChatMessagesCount,
    currentChatId,
    currentOrgName,
    currentOrgAvt,
  } = useSelector((state) => state.chat);
  const { profile } = useSelector((state) => state.auth);
  const { data: organizations } = useSelector((state) => state.university);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [sendingMessage, setsendingMessage] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  //Lấy danh sách tổ chức
  const [orgSearchValue, setOrgSearchValue] = useState('');

  const handleChangeOrganization = (newValue) => {
    if (newValue) dispatch(setCurrentOrgId(newValue));
  };

  const handleSearchChange = (newValue) => {
    setOrgSearchValue(newValue);
  };
  useEffect(() => {
    dispatch(
      getAllPublicUniversityInfo({
        page: 1,
        size: 100,
        search: orgSearchValue,
        organizationType: 1,
      }),
    );
  }, [dispatch, orgSearchValue]);

  //Lấy danh sách tin nhắn
  useEffect(() => {
    if (currentOrgId !== 0)
      dispatch(getStudentMessageByChatId({ organizationId: currentOrgId, beforeId: -1 }));
  }, [currentOrgId, dispatch]);

  //Handle change chat input
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  //Send message funtion
  const sendMessage = () => {
    if (message) {
      const msg = {
        content: message,
        senderId: profile?.id,
        chatId: currentChatId,
        type: 1,
        // reciverId: currentOrgId || null,
        reciverId: null,
        isStudent:true
      };
      socketRef.current.emit('chatMessage', msg);
      //socketRef.current.emit("sendDataClient", msg);
      setsendingMessage(true);
      setMessage('');
    }
  };

  //Send message when press enter
  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      sendMessage();
    }
  };
  //scroll to last message

  const scrollToBottom = () => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  };

  //Chat
  // const handleChangeOrganization = (checked) => {};
  const socketRef = useRef();
  const messagesRef = useRef();

  //Initialize socket io
  useEffect(() => {
    socketRef.current = socketIOClient.connect(host);
    console.log('host:', host);
    // socketRef.current.on("getId", (data) => {
    //   setId(data);
    // });

    socketRef.current.on('newMessage', (dataGot) => {
      dispatch(pushMessage(dataGot));
      scrollToBottom();
      setsendingMessage(false);
      console.log('Got data:', dataGot);
    });

    socketRef.current.on('joinRoomStatus', (status) => {
      console.log(status);
    });

    socketRef.current.on('error', (er) => {
      console.log('er', er);
    });

    //Join into first chat room
    if (currentChatId !== null) {
      const msg = {
        userId: profile.id,
        chatId: currentChatId,
      };
      console.log(msg);
      socketRef.current.emit('joinRoom', msg);
    }

    return () => {
      socketRef.current.disconnect();
    };
  }, [currentChatId, dispatch, host, profile?.id]);

  //Load more messages
  const chatBoxRef = useRef();
  const loadMoreData = () => {
    dispatch(loadMoreStudentMessageByChatId()).then(() => {
      chatBoxRef.current.scrollTop += 500;
    });
  };

  return (
    <>
      <FloatButton
        icon={<CommentOutlined size="large" />}
        size="large"
        type="primary"
        onClick={showDrawer}
      >
        Open
      </FloatButton>
      <Drawer
        title="Hỗ trợ trực tuyến"
        placement={'right'}
        width={500}
        onClose={onClose}
        open={open}
      >
        <label>Tổ chức: </label>
        <Select
          showSearch
          placeholder="Chọn tổ chức"
          optionFilterProp="children"
          onChange={handleChangeOrganization}
          filterOption={filterOption}
          onSearch={debounce(handleSearchChange, 500)}
          options={organizations?.data?.map((org) => ({
            label: org.name,
            value: org.id,
          }))}
          allowClear
          style={{ width: '100%', height: 50, marginBottom: 20 }}
        />
        {currentOrgId !== 0 && (
          <ChatBox>
            <ContactBar>
              <div className="contact-pic">
                <img src={currentOrgAvt ?? './images/4939493.png'} alt={currentOrgName}></img>
              </div>
              <div className="contact-name">{currentOrgName}</div>
            </ContactBar>
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
                dataLength={messages.length}
                next={loadMoreData}
                hasMore={messages.length < currentChatMessagesCount}
                inverse={true}
                scrollableTarget="scrollableDiv"
              >
                <ConfigProvider
                  renderEmpty={() => (
                    <div style={{ textAlign: 'center' }}>
                      <SmileOutlined style={{ fontSize: 20 }} />
                      <p>Bắt đầu chat với {currentOrgName}</p>
                    </div>
                  )}
                >
                  <List
                    dataSource={messages}
                    renderItem={(mess, idx) =>
                      (mess.senderId === profile.id && (
                        <YourMessageContent key={idx}>{mess.content}</YourMessageContent>
                      )) || <MessageContent key={idx}>{mess.content}</MessageContent>
                    }
                  />
                </ConfigProvider>
              </InfiniteScroll>
            </div>

            <FooterChat>
              {/* <span className="smile-face">{smileFace}</span> */}
              <Input
                placeholder="Nhập nội dung..."
                onKeyDown={onEnterPress}
                onChange={handleChange}
                value={message}
                style={{ height: 50 }}
              />
              <span onClick={sendMessage} className="paper-plane" style={{ cursor: 'pointer' }}>
                {((sendingMessage || status === 'fetchingMesssages') && <Spin />) || paperPlane}
              </span>
            </FooterChat>
          </ChatBox>
        )}
      </Drawer>
    </>
  );
};

const LabelName = styled.label`
  font: 14pt;
  text-transform: capitalize;
  font-weight: 500;
`;
const ChatBox = styled.div`
  display: flex;
  height: 86%;
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
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex: 1;
  overflow-y: scroll;
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

export default CustomerChatBox;
