import React from 'react';
import styled from 'styled-components';

const data = [
  {
    ground: 'INTJ ',
    Major: [
      {
        id: '1',
        text: 'Quản lý dự án (Project Management)',
      },
    ],
  },
  {
    ground: 'INTJ ',
    Major: [
      {
        id: '2',
        text: 'Kỹ thuật hệ thống (System Engineering)',
      },
    ],
  },
  {
    ground: 'INTJ ',
    Major: [
      {
        id: '3',
        text: 'Chiến lược tiếp thị (Marketing Strategy)',
      },
    ],
  },
  {
    ground: 'INTJ ',
    Major: [
      {
        id: '4',
        text: 'Phân tích hệ thống (System Analysis)',
      },
    ],
  },
  {
    ground: 'INTJ ',
    Major: [
      {
        id: '5',
        text: 'Kỹ thuật phần mềm (Software Engineering)',
      },
    ],
  },
];
function SuggestMajor({ result }) {
  console.log(data[0].Major[0].text);
  return (
    <div className="container">
      <ul>
        {data.map((val, idx) => (
          <li key={idx}>{val.Major.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default SuggestMajor;
