import React, { useState } from 'react';
import Quiz from './quiz';
import { useEffect } from 'react';
import mbtiApi from '../../../api/mbtiApi';

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

function TestMbti() {
  // const [mbtiQuestions, setMbtiQuestions] = useState([]);

  // useEffect(() => {
  //   const loadNewDoTestMbti = async () => {
  //     const result = await mbtiApi.newDoTestMbti();
  //     console.log('result', result.data.data);
  //     setMbtiQuestions(result?.data?.data);
  //   };

  //   loadNewDoTestMbti();
  // }, []);

  return <div>{mbtiQuestions && <Quiz questions={mbtiQuestions} />}</div>;
}

export default TestMbti;
