import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Spin } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import RequestOtp from '../../components/requestOtp';
import {
  isOtp,
  requestOtp,
  selectIsOtp,
  selectPending,
  selectSignupData,
  setIsSignup,
} from '../../redux/authSlice';

function OtpLogin() {
  const dispatch = useDispatch();

  const [otpType, setOtpType] = useState('email');
  const [phoneNumber, setPhoneNumer] = useState('');

  const [open, setOpen] = useState(false); //thay đối giá trị đóng mở của của sổ
  const [loadinpage, setloadinpage] = useState(false);

  const getSignupData = useSelector(selectSignupData); //lấy thông tin người dùng đăng ký trong local storage
  console.log(getSignupData);
  // const registerInfo = JSON.parse(getSignupData); //chuyển đổi giá trị về dạng json

  // const getRegisterInfo = window.localStorage?.getItem(`userSignupData`);

  let pending = useSelector(selectPending);
  const sentOtp = useSelector(selectIsOtp);

  const handleOnclick = (type) => {
    setOtpType(type);

    const getUserID = getSignupData?.id;
    const requestData = {
      userId: getUserID,
      type: type,
    };
    console.log(requestData);
    if (type === 'email') {
      dispatch(requestOtp(requestData));
    }
  };

  useEffect(() => {
    setloadinpage(pending && pending != null ? true : false);
    dispatch(setIsSignup(false)); // Chỉ dispatch khi chưa dispatch lần nào
    if (sentOtp) {
      setOpen(true);
      dispatch(isOtp(false));
    }

    // const timeoutId = setTimeout(() => {
    //   dispatch(isOtp(false)); // Thay đổi giá trị của biến thành false sau 5s
    // }, 2000); // 5s

    // // Trả về một hàm để xóa timeout khi component unmount hoặc khi giá trị đã thay đổi
    // return () => {
    //   clearTimeout(timeoutId);
    // };
  }, [pending, loadinpage, open, sentOtp, dispatch]);

  return (
    <Spin spinning={loadinpage}>
      <Container>
        {/* dùng toán tử 3 ngôi thay đổi của sổ khi giá trị open thây đổi */}
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
              <Button
                type="link"
                shape="round"
                className="close-btn"
                onClick={() => setOpen(!open)}
              >
                <CloseOutlined />
              </Button>
            </div>
            <RequestOtp type={otpType} userId={getSignupData.id} sentOtp={sentOtp} />
          </OtpRequestCard>
        )}
      </Container>
    </Spin>
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
