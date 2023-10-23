import React from 'react';
import Quiz from './quiz';

const mbtiQuestions = [
  {
    question: 'I prefer to spend time with others rather than being alone.',
    options: [
      { id: 'E', text: 'Extraverted (E)', flag: 1 },
      { id: 'I', text: 'Introverted (I)', flag: 0 },
    ],
  },
  {
    question: 'I pay attention to details and practicalities more than abstract ideas.',
    options: [
      { id: 'S', text: 'Sensing (S)', flag: 1 },
      { id: 'N', text: 'Intuitive (N)', flag: 0 },
    ],
  },
  {
    question: 'I make decisions based on logic and reason rather than feelings.',
    options: [
      { id: 'T', text: 'Thinking (T)', flag: 1 },
      { id: 'F', text: 'Feeling (F)', flag: 0 },
    ],
  },
  {
    question: 'I prefer to plan and be organized rather than spontaneous.',
    options: [
      { id: 'J', text: 'Judging (J)', flag: 1 },
      { id: 'P', text: 'Perceiving (P)', flag: 0 },
    ],
  },
  {
    question: 'I prefer to spend time with others rather than being alone.',
    options: [
      { id: 'E', text: 'Extraverted (E)', flag: 0 },
      { id: 'I', text: 'Introverted (I)', flag: 0 },
    ],
  },
  {
    question: 'I pay attention to details and practicalities more than abstract ideas.',
    options: [
      { id: 'S', text: 'Sensing (S)', flag: 0 },
      { id: 'N', text: 'Intuitive (N)', flag: 0 },
    ],
  },
  {
    question: 'I make decisions based on logic and reason rather than feelings.',
    options: [
      { id: 'T', text: 'Thinking (T)', flag: 0 },
      { id: 'F', text: 'Feeling (F)', flag: 0 },
    ],
  },
  {
    question: 'I prefer to plan and be organized rather than spontaneous.',
    options: [
      { id: 'J', text: 'Judging (J)', flag: 0 },
      { id: 'P', text: 'Perceiving (P)', flag: 0 },
    ],
  },
];

function TestMbti() {
  return (
    <div>
      <Quiz questions={mbtiQuestions} />
    </div>
  );
}

export default TestMbti;
