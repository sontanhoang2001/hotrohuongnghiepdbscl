import { Button, Popconfirm, message } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { question, options } = questions[currentQuestion];
  const [answerIdx, setAnswerIdx] = useState(null);
  const [responses, setResponses] = useState({});
  const [completed, setCompleted] = useState(false);

  const confirm = (e) => {
    console.log(e);
    message.success('hoàng thành bài kiểm tra');
  };
  const cancel = (e) => {
    console.log(e);
    // message.error('Click on No');
  };

  const personalityTypes = {
    ESTJ: ' Người giám hộ',
    ESTP: 'Người thực thi',
    ESFP: 'Người trình diễn',
    ESFJ: 'Người quan tâm',
    ISTJ: 'Người trách nhiệm',
    ISTP: 'Nhà kỹ thuật',
    ISFP: 'Người nghệ sĩ',
    ISFJ: 'Người nuôi dưỡng',
    INTJ: 'Nhà khoa học',
    INTP: ' Nhà tư duy',
    INFP: 'Người lý tưởng hóa',
    INFJ: ' Người che chở',
    ENTJ: 'Nhà điều hành',
    ENTP: 'Người nhìn xa',
    ENFP: 'Người truyền cảm hứng',
    ENFJ: 'Người cho đi',
  };
  const handleAnswerSelect = (questionId, optionId) => {
    setAnswerIdx(optionId);
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: optionId,
    }));
  };

  const calculateMBTIType = () => {
    const type = [];

    // Calculate each dichotomy based on user responses
    type.push(responses[1] || responses[2]); // E/I
    type.push(responses[3] || responses[4]); // S/N
    type.push(responses[5] || responses[6]); // T/F
    type.push(responses[7] || responses[8]); // J/P

    return type.join('');
  };

  const handleSubmit = () => {
    const mbtiType = calculateMBTIType();
    setCompleted(true);
    // You can store or display the user's MBTI type as needed.
    console.log('MBTI Type:', mbtiType);
  };

  return (
    <QuestionBox className="container">
      <CurrentQuestion>
        {/* current question */}

        <span>{currentQuestion + 1}</span>
        {/* total question */}
        <span>/{questions.length}</span>
      </CurrentQuestion>
      <Question>
        <h3>{question}</h3>
        <ul>
          {options.map((answer, idx) => (
            <li
              key={idx}
              onClick={() => handleAnswerSelect(answer.id, idx)}
              className={answerIdx === idx ? 'selected-answer' : null}
            >
              {answer.text}
            </li>
          ))}
        </ul>
      </Question>
      <ControllBtn>
        {currentQuestion <= 0 ? (
          <div>
            <Button disabled>quay lại</Button>
          </div>
        ) : (
          <div>
            <Button onClick={() => setCurrentQuestion(currentQuestion - 1)}>quay lại</Button>
          </div>
        )}

        {currentQuestion >= questions.length - 1 ? (
          <div>
            {/* <Button disabled>tiếp tục</Button> */}
            {
              <Popconfirm
                title="Bạn muốn kết thúc bài kiểm tra?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger onClick={() => handleSubmit()}>
                  kết thúc
                </Button>
              </Popconfirm>
            }
          </div>
        ) : (
          <div>
            <Button onClick={() => setCurrentQuestion(currentQuestion + 1)}>tiếp tục</Button>
          </div>
        )}
      </ControllBtn>
    </QuestionBox>
  );
};

const QuestionBox = styled.div`
  border: 2px solid #c4c4cc;
  border-radius: 20px;
  padding: 2% 4%;
  margin-top: 3%;
  /* width: fit-content; */
`;
const CurrentQuestion = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const Question = styled.div`
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  ul {
    list-style-type: none;
    padding-left: 20px;
    .selected-answer {
      background-color: var(--primary-color);
      color: var(--text-hover-color);
      border-color: var(--primary-color);
    }
    li {
      padding: 10px 20px;
      margin-top: 14px;
      border: 2px solid #c4c4cc;
      border-radius: 20px;
      width: fit-content;
      cursor: pointer;
    }
  }
`;
const ControllBtn = styled.div`
  margin-top: 4%;
  display: flex;
  width: 100%;
  div {
    width: 50%;
    &:nth-child(2) {
      text-align: right;
    }
    button {
      text-transform: capitalize;
      font-weight: 600;
    }
  }
`;

export default Quiz;
