import styled from 'styled-components';

export const MarginTopContent = styled.div`
  margin-top: 3%;
`;

export const Title = styled.div`
  margin-top: 60px;
  .underline {
    border-bottom: 4px solid var(--primary-color);
  }
`;

export const HeadingTitle = styled.h2`
  text-transform: uppercase;
  border-left: 10px solid var(--primary-color);
  margin-bottom: 10px;
  padding-left: 10px;
  font-size: 1.6rem;
  font-weight: 800;
`;

export const MessageContent = styled.div`
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  margin: 1rem;
  border-radius: 1.125rem 1.125rem 1.125rem 0;
  min-height: 2.25rem;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  max-width: 66%;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.075), 0rem 1rem 1rem -1rem rgba(0, 0, 0, 0.1);
`;
export const YourMessageContent = styled.div`
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  margin: 1rem 1rem 1rem auto;
  border-radius: 1.125rem 1.125rem 0 1.125rem;
  background: #333;
  color: white;
  width: fit-content;
  max-width: 66%;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.075), 0rem 1rem 1rem -1rem rgba(0, 0, 0, 0.1);
`;
