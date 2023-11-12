import React from 'react';

const matchingOptions = (questions, selectedOption) => {
  questions.filter((question) => {
    return question.options.find((option) => option.id === selectedOption);
  });
};

const calculateMBTIType = (questions, sselectedAnswers) => {
  const result = [];
  //Extraversion (Hướng ngoại) / Introversion (Hướng nội)
  let countExtraversionType = sselectedAnswers.filter((id) => id === 'E').length;
  let countIntroversionType = sselectedAnswers.filter((id) => id === 'I').length;
  //Sensing (Giác quan) / iNtuition (Trực giác)
  let countSensingType = sselectedAnswers.filter((id) => id === 'S').length;
  let countiNtuitionType = sselectedAnswers.filter((id) => id === 'N').length;
  // Thinking (Lý trí) / Feeling (Cảm xúc)
  let countThinkingType = sselectedAnswers.filter((id) => id === 'T').length;
  let countFeelingType = sselectedAnswers.filter((id) => id === 'F').length;
  //Judging (Nguyên tắc) / Perceiving (Linh hoạt)
  let countJudgingType = sselectedAnswers.filter((id) => id === 'J').length;
  let countPerceivingType = sselectedAnswers.filter((id) => id === 'P').length;

  if (countExtraversionType > countIntroversionType) {
    result.push('E');
  } else if (countExtraversionType === countiNtuitionType) {
    sselectedAnswers.forEach((val, idx) => {
      if (
        questions[idx].options === matchingOptions(questions, 'E') &&
        questions[idx].options.flag === 1
      ) {
        countExtraversionType += 1;
      }
      if (
        questions[idx].options === matchingOptions(questions, 'I') &&
        questions[idx].options.flag === 1
      ) {
        countIntroversionType += 1;
      }
    });
  }
};

export default calculateMBTIType;
