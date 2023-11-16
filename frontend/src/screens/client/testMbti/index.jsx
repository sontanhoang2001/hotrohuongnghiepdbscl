import React, { useState, useCallback, useEffect } from 'react';

import styled from 'styled-components';
import { Button, Popconfirm, message } from 'antd';
import { mbtiDetail } from '../../../components/mbtiDetail/mbtiDetail';

const mbtiQuestions = [
  {
    question: 'Tại một buổi tiệc, bạn sẽ',
    options: [
      {
        id: 'I',
        text: 'Chỉ giao tiếp với với một số ít người mà bạn đã quen',
        flag: 0,
      },
      {
        id: 'E',
        text: 'Giao tiếp với nhiều người, kể cả người lạ',
        flag: 1,
      },
    ],
  },
  {
    question: 'Bạn thấy mình là người nghiêng về kiểu nào nhiều hơn?',
    options: [
      {
        id: 'N',
        text: 'Sáng tạo',
        flag: 0,
      },
      {
        id: 'S',
        text: 'Thực tế',
        flag: 1,
      },
    ],
  },
  {
    question: 'Bạn nghĩ tình huống nào tồi tể hơn?',
    options: [
      {
        id: 'N',
        text: 'Cuộc sống của bạn thật nhàm chán và không bao giờ thay đổi',
        flag: 0,
      },
      {
        id: 'S',
        text: 'Đầu óc của bạn cứ “bay bổng trên mây”',
        flag: 1,
      },
    ],
  },
  {
    question: 'Bạn sẽ bị ấn tượng hơn với',
    options: [
      {
        id: 'N',
        text: 'Những cảm xúc',
        flag: 0,
      },
      {
        id: 'S',
        text: 'Các nguyên tắc',
        flag: 1,
      },
    ],
  },
  {
    question: 'Khi quyết định việc gì đó, bạn thường hay dựa vào:',
    options: [
      {
        id: 'F',
        text: 'Sự đồng cảm',
        flag: 0,
      },
      {
        id: 'T',
        text: 'Sự thuyết phục',
        flag: 1,
      },
    ],
  },
  {
    question: 'Bạn thích làm việc theo kiểu nào nhiều hơn?',
    options: [
      {
        id: 'F',
        text: 'Tùy hứng',
        flag: 0,
      },
      {
        id: 'T',
        text: 'Theo đúng thời hạn',
        flag: 1,
      },
    ],
  },
  {
    question: 'Bạn có khuynh hướng đưa ra các lựa chọn',
    options: [
      {
        id: 'F',
        text: 'Phần nào theo cảm nhận',
        flag: 0,
      },
      {
        id: 'T',
        text: 'Rất cẩn thận',
        flag: 1,
      },
    ],
  },
  {
    question: 'Điều nào khiến bạn thấy thích thú hơn?',
    options: [
      {
        id: 'N',
        text: 'Những ý tưởng khả thi',
        flag: 0,
      },
      {
        id: 'S',
        text: 'Những điều thực tế',
        flag: 1,
      },
    ],
  },
  {
    question: 'Khi đánh giá hoặc phán xét người khác, bạn thường hay dựa vào điều gì?',
    options: [
      {
        id: 'N',
        text: 'Hoàn cảnh',
        flag: 0,
      },
      {
        id: 'S',
        text: 'Luật lệ và nguyên tắc',
        flag: 1,
      },
    ],
  },
  {
    question: 'Khi tiếp cận, tiếp xúc người khác, bạn nghiêng về hướng nào hơn?',
    options: [
      {
        id: 'F',
        text: 'Tiếp cận theo hướng sử dụng trải nghiệm cá nhân',
        flag: 0,
      },
      {
        id: 'T',
        text: 'Tiếp cận theo hướng khách quan',
        flag: 1,
      },
    ],
  },
  {
    question: 'Phong cách của bạn nghiêng về hướng nào hơn?',
    options: [
      {
        id: 'F',
        text: 'Nhàn nhã, thoải mái',
        flag: 0,
      },
      {
        id: 'T',
        text: 'Đúng giờ, nghiêm túc',
        flag: 1,
      },
    ],
  },
  {
    question: 'Bạn cảm thấy không thoải mái khi có những việc:',
    options: [
      {
        id: 'P',
        text: 'Đã quá hoàn thiện',
        flag: 0,
      },
      {
        id: 'J',
        text: 'Chưa hoàn thiện',
        flag: 1,
      },
    ],
  },
  {
    question: 'Trong các mối quan hệ xã hội, bạn thường',
    options: [
      {
        id: 'I',
        text: 'Thường biết thông tin sau những người khác',
        flag: 0,
      },
      {
        id: 'E',
        text: 'Luôn nắm bắt kịp thời thông tin về các vấn đề của mọi người',
        flag: 1,
      },
    ],
  },
  {
    question: 'Với các công việc thông thường, bạn nghiêng về cách:',
    options: [
      {
        id: 'I',
        text: 'Làm theo cách của riêng mình',
        flag: 0,
      },
      {
        id: 'E',
        text: 'Làm theo cách thông thường',
        flag: 1,
      },
    ],
  },
  {
    question: 'Các nhà văn nên:',
    options: [
      {
        id: 'N',
        text: 'Diễn đạt sự việc bằng cách so sánh hay liên tưởng',
        flag: 0,
      },
      {
        id: 'S',
        text: 'Viết những gì họ nghĩ và chân thật với những gì mình viết',
        flag: 1,
      },
    ],
  },
  {
    question: 'Điều gì lôi cuốn bạn hơn?',
    options: [
      {
        id: 'N',
        text: 'Sự hòa hợp trong các mối quan hệ của con người',
        flag: 0,
      },
      {
        id: 'S',
        text: 'Tính nhất quán của tư duy, suy nghĩ',
        flag: 1,
      },
    ],
  },
  {
    question: 'Bạn cảm thấy thoải mái hơn khi đưa ra:',
    options: [
      {
        id: 'F',
        text: 'Những đánh giá, nhận xét một cách có ý nghĩa',
        flag: 0,
      },
      {
        id: 'T',
        text: 'Những đánh giá, nhận xét một cách logic',
        flag: 1,
      },
    ],
  },
  {
    question: 'Bạn thích những điều:',
    options: [
      {
        id: 'F',
        text: 'Chưa xác định, chưa được quyết định',
        flag: 0,
      },
      {
        id: 'T',
        text: 'Đã được sắp xếp, quyết định trước',
        flag: 1,
      },
    ],
  },
  {
    question: 'Bạn tự thấy mình:',
    options: [
      {
        id: 'P',
        text: 'Dễ gần, thoải mái',
        flag: 0,
      },
      {
        id: 'J',
        text: 'Nghiêm túc, quyết đoán',
        flag: 1,
      },
    ],
  },
  {
    question: 'Khi nói chuyện điện thoại, bạn:',
    options: [
      {
        id: 'I',
        text: 'Chuẩn bị trước những điều sẽ nói',
        flag: 0,
      },
      {
        id: 'E',
        text: 'Cứ gọi bình thường',
        flag: 1,
      },
    ],
  },
  {
    question: 'Những sự kiện trong thực tế',
    options: [
      {
        id: 'I',
        text: 'Nó là bằng chứng giải thích cho các quy tắc, quy luật',
        flag: 0,
      },
      {
        id: 'E',
        text: 'Bản thân nó giải thích cho chính nó”',
        flag: 1,
      },
    ],
  },
  {
    question: 'Những người có tầm nhìn xa/người lo xa:',
    options: [
      {
        id: 'N',
        text: 'Khá thú vị',
        flag: 0,
      },
      {
        id: 'S',
        text: 'Thường gây khó chịu cho người khác',
        flag: 1,
      },
    ],
  },
  {
    question: 'Bạn thường là người có:',
    options: [
      {
        id: 'N',
        text: 'Trái tim nóng',
        flag: 0,
      },
      {
        id: 'S',
        text: 'Cái đầu lạnh',
        flag: 1,
      },
    ],
  },
  {
    question: 'Điều nào thì tồi tệ hơn?',
    options: [
      {
        id: 'F',
        text: 'Tàn nhẫn',
        flag: 0,
      },
      {
        id: 'T',
        text: 'Không công bằng',
        flag: 1,
      },
    ],
  },
  {
    question: 'Các sự kiện nên xảy ra theo hướng:',
    options: [
      {
        id: 'F',
        text: 'Ngẫu nhiên và tự nhiên',
        flag: 0,
      },
      {
        id: 'T',
        text: 'Được lựa chọn và cân nhắc kỹ lưỡng',
        flag: 1,
      },
    ],
  },
  {
    question: 'Bạn cảm thấy thoải mái hơn khi',
    options: [
      {
        id: 'P',
        text: 'Đang lựa chọn để mua',
        flag: 0,
      },
      {
        id: 'J',
        text: 'Đã mua một thứ gì đó',
        flag: 1,
      },
    ],
  },
  {
    question: 'Trong công ty, bạn là người:',
    options: [
      {
        id: 'I',
        text: 'Đợi người khác bắt chuyện với mình',
        flag: 0,
      },
      {
        id: 'E',
        text: 'Khởi xướng các câu chuyện',
        flag: 1,
      },
    ],
  },
];
// change value of question increase 1 or decrease 1, when click prev or next button
const DIRECTION_PREV = -1;
const DIRECTION_NEXT = 1;
// keep limit of question always between 0 and limit of questions
const limitWithinBoundaries = (val, min, max) => Math.max(min, Math.min(val, max));
//This function holds the user's selection
const replaceAnswerImmutable = (index, answer, answers) => {
  const result = [...answers];
  result[index] = answer;
  return result;
};
function TestMbti() {
  //giá trị nhỏ nhất và giới hạn của gói câu hỏi, nhỏ nhất là 0, lớn nhất là số câu hỏi truyền vào (questions.length)
  const MIN_ACTIVE_QUESTION_INDEX = 0;
  const MAX_ACTIVE_QUESTION_INDEX = mbtiQuestions.length;

  //tăng giảm giá trị của prev và next vởi -1 và 1
  const DIRECTION_PREV = -1;
  const DIRECTION_NEXT = 1;
  //khai báo giá trị mặt định của câu hỏi hiện tại bằng 0
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(MIN_ACTIVE_QUESTION_INDEX);

  // //thứ tự của câu trả lời
  // const [answerIdx, setAnswerIdx] = useState(null);
  //khai báo mảng giá trị của câu trả lời
  const [answers, setAnswers] = useState([]);
  // khai báo biến chứa thông tin kết quả mbti
  const [mbtiResult, setMbtiResult] = useState({});
  //khai báo thuộc tính của questions
  const { question, options } = mbtiQuestions[selectedQuestionIndex];
  // const { type, image, text, description } = mbtiDetail;
  //khai báo biến lưu trữ các lựa chọn
  const selectedAnswer = answers[selectedQuestionIndex];
  const [currentSelectedAnswer, setCurrentSelectedAnswer] = useState();
  //khai báo tiến độ hoàn thành mặt định là fasle
  const [completed, setCompleted] = useState(false);

  //khai báo hàm điều hướng tạo event cho nút prev và mext btn
  const onNavigationButtonClick = (direction) => {
    setSelectedQuestionIndex((currentSelectedQuestionIndex) =>
      limitWithinBoundaries(
        currentSelectedQuestionIndex + direction,
        MIN_ACTIVE_QUESTION_INDEX,
        MAX_ACTIVE_QUESTION_INDEX,
      ),
    );
  };

  //khai báo hàm lưu giá trị câu trả lời của người dùng bởi sự kiện click
  const onAnswerClick = (e) => {
    //hy vọng rằng câu trả lời sẽ được chỉ định dưới dạng thuộc tính câu trả lời dữ liệu HTML
    const answer = e;
    if (!answer) return;

    setAnswers((currentAnswers) =>
      replaceAnswerImmutable(selectedQuestionIndex, answer, currentAnswers),
    );
  };
  const [desiredOptions, setDesiredOptions] = useState([]);

  useEffect(() => {
    // Đoạn mã lọc desiredOptions ở đây
    const filteredOptions = mbtiQuestions.filter((question) => {
      return question.options.some((option) => {
        return option.id === 'E' && option.flag === 1;
      });
    });

    // Cập nhật giá trị của desiredOptions sử dụng setDesiredOptions
    setDesiredOptions(filteredOptions);

    // In giá trị ra console
    console.log(filteredOptions);
  }, [mbtiQuestions]);

  //Extraversion (Hướng ngoại) / Introversion (Hướng nội)
  let countExtraversionType = answers.filter((id) => id === 'E').length;
  let countIntroversionType = answers.filter((id) => id === 'I').length;
  //Sensing (Giác quan) / iNtuition (Trực giác)
  let countSensingType = answers.filter((id) => id === 'S').length;
  let countiNtuitionType = answers.filter((id) => id === 'N').length;
  // Thinking (Lý trí) / Feeling (Cảm xúc)
  let countThinkingType = answers.filter((id) => id === 'T').length;
  let countFeelingType = answers.filter((id) => id === 'F').length;
  //Judging (Nguyên tắc) / Perceiving (Linh hoạt)
  let countJudgingType = answers.filter((id) => id === 'J').length;
  let countPerceivingType = answers.filter((id) => id === 'P').length;
  //function này sẽ đếm các answer tương ứng với mỗi loại tính cách
  //dùn filter array để lọc giá trị tương ứng theo loại, và length để lấy độ dài mãng sau khi lọc tương ứng giá trị đếm được
  //tiếp theo so sách số lựa chọn theo cặp, loại nào lớn sẽ lấy kết quả đó và nối thành một chuỗi 4 ký tự (exp: ENFJ )
  //có tối đa 16 kết quả
  const calculateMBTIType = (answer) => {
    //   //khai báo mảng chứa giá trị
    const type = [];

    //   //so sánh các giá trị theo từng cặp thuộc phương thức MBTI
    //   //Extraversion (Hướng ngoại) / Introversion (Hướng nội)
    if (countExtraversionType > countIntroversionType) {
      type.push('E');
    } else if (countExtraversionType === countIntroversionType) {
      // answers.filter((val) => {
      //   if (val.id === 'E' && val.flag === 1) {
      //     countExtraversionType = countExtraversionType + 1;
      //   }
      //   if (val.id === 'I' && val.flag === 1) {
      //     countIntroversionType = countIntroversionType + 1;
      //   }
      //   console.log(answers, 'answer');
      //   console.log(val.id, 'test');
      //   console.log(countExtraversionType, 'e');
      //   console.log(countIntroversionType, 'i');
      //   return 0;
      // });

      if (countExtraversionType > countIntroversionType) type.push('E');
      else type.push('I');
    } else {
      type.push('I');
    }

    //Sensing (Giác quan) / iNtuition (Trực giác)
    if (countSensingType > countiNtuitionType) {
      type.push('S');
    } else if (countSensingType === countiNtuitionType) {
      answers.filter((val) => {
        if (val.id === 'S' && val.flag === 1) {
          countSensingType = countSensingType++;
        }
        if (val.id === 'N' && val.flag === 1) {
          countiNtuitionType = countiNtuitionType++;
        }

        return 0;
      });
      if (countSensingType > countiNtuitionType) type.push('S');
      else type.push('N');
    } else {
      type.push('N');
    }
    // Thinking (Lý trí) / Feeling (Cảm xúc)
    if (countThinkingType > countFeelingType) {
      type.push('T');
    } else if (countThinkingType === countFeelingType) {
      answers.filter((val) => {
        if (val.id === 'T' && val.flag === 1) {
          countThinkingType = countThinkingType++;
        }
        if (val.id === 'F' && val.flag === 1) {
          countFeelingType = countFeelingType++;
        }

        return 0;
      });
      if (countThinkingType > countFeelingType) type.push('T');
      else type.push('F');
    } else {
      type.push('F');
    }
    //Judging (Nguyên tắc) / Perceiving (Linh hoạt)
    if (countJudgingType > countPerceivingType) {
      type.push('J');
    } else if (countJudgingType === countPerceivingType) {
      answers.filter((val) => {
        if (val.id === 'J' && val.flag === 1) {
          countJudgingType = countJudgingType++;
        }
        if (val.id === 'P' && val.point === 1) {
          countPerceivingType = countPerceivingType++;
        }

        return 0;
      });
      if (countJudgingType > countPerceivingType) {
        type.push('J');
      } else type.push('P');
    } else {
      type.push('P');
    }
    // setResult(type.join(''));

    return type.join('');
  };

  //hàm này dùng để lấy giá trị theo id của mbti detail vd: kiếm INTP id trong mbti detail
  const getTypeDetail = (mbtiType) => {
    // Tìm kiếm trong mảng details để lấy đối tượng có type trùng khớp với mbtiType
    const typeDetail = mbtiDetail.details.find((detail) => detail.id === mbtiType);

    // Kiểm tra xem typeDetail có tồn tại hay không
    // Trả về default nếu không tìm thấy
    return typeDetail || {};
  };

  const handleSubmit = useCallback(() => {
    const mbtiType = calculateMBTIType(answers);
    setMbtiResult(getTypeDetail(mbtiType));
    setCompleted(true);
    // console.log(mbtiType);
  }, [answers, calculateMBTIType]);

  const confirm = (e) => {
    handleSubmit();
    message.success('bạn hoàn thành bài kiểm tra');
  };
  const cancel = (e) => {};

  return (
    <>
      {/* hiển thị thay đổi khi giá trị completed thay đổi */}
      {!completed ? (
        <MbtiBox className="container">
          <CurrentQuestion>
            {/* current question */}

            <span>{selectedQuestionIndex + 1}</span>
            {/* total question */}
            <span>/{MAX_ACTIVE_QUESTION_INDEX}</span>
          </CurrentQuestion>
          <Question>
            <h3>{question}</h3>
            <ul>
              {options.map((answer, idx) => (
                <li
                  key={idx}
                  className={selectedAnswer === answer.id ? 'selected-answer' : null}
                  onClick={() => onAnswerClick(answer.id)}
                >
                  {answer.text}
                </li>
              ))}
            </ul>
          </Question>

          <ControllBtn>
            <div>
              <Button
                disabled={selectedQuestionIndex === 0}
                onClick={() => onNavigationButtonClick(DIRECTION_PREV)}
              >
                quay lại
              </Button>
            </div>

            {selectedQuestionIndex >= mbtiQuestions.length - 1 ? (
              <div>
                {
                  <Popconfirm
                    title="Bạn muốn kết thúc bài kiểm tra?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="primary" danger disabled={selectedAnswer === undefined}>
                      kết thúc
                    </Button>
                  </Popconfirm>
                }
              </div>
            ) : (
              <div>
                <Button
                  disabled={
                    selectedQuestionIndex === mbtiQuestions.length || selectedAnswer === undefined
                  }
                  onClick={() => onNavigationButtonClick(DIRECTION_NEXT)}
                >
                  tiếp tục
                </Button>
              </div>
            )}
          </ControllBtn>
        </MbtiBox>
      ) : (
        // điều kiện else
        <>
          <ShowResult className="container">
            <h3 className="result-title">kết quả của bạn</h3>
            <img src={`./images/mbti/${mbtiResult.image}`} alt="mbtitype" />
            <div className="mbti-description">
              <h3>{mbtiResult.id}</h3>
              <h3 style={{ color: 'var(--primary-color)' }}>{mbtiResult.text}</h3>
              <p>{mbtiResult.description}</p>
            </div>
            <h3>Công việc phù hợp với {mbtiResult.id}</h3>
            <SuggestContent>
              <div>
                <span>Kỹ thuật phần mềm (Software Engineering)</span>
                <span>Kỹ thuật phần mềm (Software Engineering)</span>
                <span>Kỹ thuật phần mềm (Software Engineering)</span>
                <span>Kỹ thuật phần mềm (Software Engineering)</span>
                <span>Kỹ thuật phần mềm (Software Engineering)</span>
                <span>Kỹ thuật phần mềm (Software Engineering)</span>
              </div>
            </SuggestContent>
          </ShowResult>
        </>
      )}
    </>
  );
}

//css type
const MbtiBox = styled.div`
  border: 2px solid #c4c4cc;
  border-radius: 20px;
  padding: 2% 4%;
  margin-top: 3%;
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
      &:hover {
        background-color: var(--primary-color);
        color: var(--text-hover-color);
        border-color: var(--primary-color);
      }
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
const ShowResult = styled.div`
  display: flex;
  flex-direction: column;
  transition: 2s ease-in;
  width: 400px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;

  .result-title {
    border-bottom: 5px solid var(--primary-color);
    text-transform: uppercase;
    padding-bottom: 10px;
  }
  h3 {
    text-transform: capitalize;
    text-align: center;
    margin-top: 5px;
  }
  img {
    /* width: 300px; */
    object-fit: cover;
    margin-left: auto;
    margin-right: auto;
  }
  .mbti-description {
    p {
      text-align: justify;
    }
  }
`;

const SuggestContent = styled.div`
  margin-top: 10px;
  div {
    filter: drop-shadow(2px 2px 2px);
    display: flex;
    flex-direction: column;
  }

  /* styling : size and colors */

  span {
    clip-path: polygon(0% 0%, calc(100% - 0.4em) 0%, 100% 50%, calc(100% - 0.4em) 100%, 0% 100%);
    font-size: 14px;
    font-weight: 500;
    padding: 10px 10px;

    margin: 5px;
  }
  span:nth-child(odd) {
    background: var(--primary-color);
    margin-right: 20px;
  }

  span:nth-child(even) {
    background: var(--secondary-color);
    margin-left: 20px;
    color: white;
  }
`;

export default TestMbti;
