import React, { useState } from 'react';

import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../../firebase/config';

function OtpByPhone() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('INPUT_PHONE_NUMBER');
  const [result, setResult] = useState('');

  const signin = () => {
    try {
      console.log('bắt đầu gửi OTP qua sđt');
      if (phoneNumber === '') return;

      let verify = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });

      signInWithPhoneNumber(auth, phoneNumber, verify)
        .then((result) => {
          console.log('result: ', result);
          setResult(result);
          setStep('VERIFY_OTP');

          // Xác thực thành công thì gọi API server của mình để cập nhật trạng thái active cho account
          // gọi api => authOTP  ở đây

          //   {
          //     "userId" : 14,
          //     "type" : "phone",
          //     "otpCode": ""
          // }
          // gọi api => authOTP thành công thì chuyển hướng, cái này tùy anh code
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log('hết hạn');
    }
  };

  const ValidateOtp = () => {
    try {
      console.log('Xác thực OTP từ ng dùng');

      if (otp === null) return;

      result
        .confirm(otp)
        .then((result) => {
          setStep('VERIFY_SUCCESS');
        })
        .catch((err) => {
          console.log('Incorrect code');
        });
    } catch (error) {
      console.log('hết hạn');
    }
  };

  return (
    <div style={{ marginTop: 100 }}>
      <center>
        {/* {step === 'INPUT_PHONE_NUMBER' && (
          <div>
            <input
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              placeholder="phone number"
            />
            <br />
            <br />
            <div id="recaptcha-container"></div>
            <button onClick={signin}>Send OTP</button>
          </div>
        )} */}

        {step === 'VERIFY_OTP' && (
          <div>
            <input
              type="text"
              placeholder={'Enter your OTP'}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
            />
            <br />
            <br />
            <button onClick={ValidateOtp}>Verify</button>
          </div>
        )}

        {step === 'VERIFY_SUCCESS' && <h3>Verify success</h3>}

        {step === 'VERIFY_FAIL' && <h3>Verify Fail</h3>}
      </center>
    </div>
  );
}

export default OtpByPhone;
