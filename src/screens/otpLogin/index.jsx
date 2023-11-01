import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import RequestOtp from '../../components/requestOtp';

function OtpLogin() {
  const dispatch = useDispatch();

  const [otpType, setOtpType] = useState('email');
  const [phoneNumber, setPhoneNumer] = useState('');
  const [userId, setUserId] = useState('1');
  const [open, setOpen] = useState(false);

  const handleOnclick = (type) => {
    setOtpType(type);
    setOpen(!open);
  };

  return (
    <Container>
      {open === false ? (
        <div className="box">
          <h3 className="">Lấy mã xác nhận</h3>
          <div className="group-btn-send-otp">
            <Button type="primary" onClick={() => handleOnclick('email')}>
              Gửi qua mail
            </Button>
            <Button type="primary" danger onClick={() => handleOnclick('phone')}>
              Gửi qua SĐT
            </Button>
          </div>
        </div>
      ) : (
        <OtpRequestCard className="box">
          <div className="box-header">
            <Button type="link" shape="round" className="close-btn" onClick={() => setOpen(!open)}>
              <CloseOutlined />
            </Button>
          </div>
          <RequestOtp type={otpType} userId={userId} />
        </OtpRequestCard>
      )}
    </Container>
  );
}
const Container = styled.div`
  background-color: #f2f9ff;
  min-height: 100vh;
  display: flex;
  gap: 2rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .box {
    text-transform: uppercase;
    /* text-align: center; */
    width: 384px;
    position: relative;
    transition: all 10s ease-out;
    h3 {
      text-align: center;
    }
    .box-header {
      width: 100%;
      text-align: right;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, 0);
      .close-btn {
        font-size: 1.6rem;
      }
    }

    .group-btn-send-otp {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      .ant-btn {
        margin-top: 10px;
        margin-left: 5px;
        margin-right: 5px;
      }
    }
  }
`;

const OtpRequestCard = styled.div``;

export default OtpLogin;
