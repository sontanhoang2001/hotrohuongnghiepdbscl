import React from 'react';
import Quiz from './quiz';

const mbtiQuestions = [
  {
    question: 'I prefer to spend time with others rather than being alone.',
    options: [
      { id: 'E', text: 'Extraverted (E)' },
      { id: 'I', text: 'Introverted (I)' },
    ],
  },
  {
    question: 'I pay attention to details and practicalities more than abstract ideas.',
    options: [
      { id: 'S', text: 'Sensing (S)' },
      { id: 'N', text: 'Intuitive (N)' },
    ],
  },
  {
    question: 'I make decisions based on logic and reason rather than feelings.',
    options: [
      { id: 'T', text: 'Thinking (T)' },
      { id: 'F', text: 'Feeling (F)' },
    ],
  },
  {
    question: 'I prefer to plan and be organized rather than spontaneous.',
    options: [
      { id: 'J', text: 'Judging (J)' },
      { id: 'P', text: 'Perceiving (P)' },
    ],
  },
];

console.log(mbtiQuestions.options);

function TestMbti() {
  return (
    <div>
      <Quiz questions={mbtiQuestions} />
    </div>
  );
}

export default TestMbti;
