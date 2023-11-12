import { Button, Popconfirm, message } from 'antd';
import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { mbtiDetail } from '../../../components/mbtiDetail/mbtiDetail';
import { useEffect } from 'react';

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

const Quiz = ({ questions, questions1 }) => {
  //giá trị nhỏ nhất và giới hạn của gói câu hỏi, nhỏ nhất là 0, lớn nhất là số câu hỏi truyền vào (questions.length)
  const MIN_ACTIVE_QUESTION_INDEX = 0;
  const MAX_ACTIVE_QUESTION_INDEX = questions.length;

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
  const { question, options } = questions[selectedQuestionIndex];
  // const { type, image, text, description } = mbtiDetail;
  //khai báo biến lưu trữ các lựa chọn
  const selectedAnswer = answers[selectedQuestionIndex];
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
    const filteredOptions = questions.filter((question) => {
      return question.options.some((option) => {
        return option.id === 'E' && option.flag === 1;
      });
    });

    // Cập nhật giá trị của desiredOptions sử dụng setDesiredOptions
    setDesiredOptions(filteredOptions);

    // In giá trị ra console
    console.log(filteredOptions);
  }, [questions]);

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

            {selectedQuestionIndex >= questions.length - 1 ? (
              <div>
                {
                  <Popconfirm
                    title="Bạn muốn kết thúc bài kiểm tra?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="primary" danger>
                      kết thúc
                    </Button>
                  </Popconfirm>
                }
              </div>
            ) : (
              <div>
                <Button
                  disabled={selectedQuestionIndex === questions.length}
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
        <ShowResult className="container">
          <h3 className="result-title">kết quả của bạn</h3>
          <img src={`./images/mbti/${mbtiResult.image}`} alt="mbtitype" />
          <div className="mbti-description">
            <h3>{mbtiResult.id}</h3>
            <h3 style={{ color: 'var(--primary-color)' }}>{mbtiResult.text}</h3>
            <p>{mbtiResult.description}</p>
          </div>
        </ShowResult>
      )}
    </>
  );
};
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
export default Quiz;
