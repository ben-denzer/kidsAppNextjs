import styled from 'styled-components';
import { textColor } from '../../config/globalStyles';

export const Children = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 90%;
  margin: 0 auto;
`;

export const ChildMenuHeader = styled.h1`
  font-size: 54px;
  font-family: "Indie Flower", Arial, Helvetica, sans-serif;
  letter-spacing: 8px;
  font-weight: bold;
  padding-bottom: 40px;
`;

export const PageContainer = styled.div`
  min-height: 600px;
  padding: 50px;
  max-width: 100%;
  box-sizing: border-box;

  @media (max-width: 900px) {
    padding: 15px;
  }

  a {
    font-size: 16px;
    color: ${textColor};
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    text-align: center;
  }

  h1 {
    margin-bottom: 0;
  }
`;
