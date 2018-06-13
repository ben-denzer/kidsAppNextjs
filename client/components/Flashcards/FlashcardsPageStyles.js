import styled from 'styled-components';
import { color1, color2 } from '../../config/globalStyles';

export const GoButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 200px;
  background-color: ${color1};
  color: white;
  font-size: 22px;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    background-color: ${color2};
  }
`;

export const Headline = styled.h2`
  text-align: center;
  margin-top: 10px;
`;

export const PageContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  padding-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 0;
`;

export const WordToggle = styled.div`
  width: 15%;
  margin: 10px 0 10px;
  display: flex;
  align-items: baseline;
  justify-content: center;
  font-size: 30px;


  >input {
    height: 20px;
    width: 40px;
  }

  @media (max-width: 1000px) {
    width: 33%;
  }

  @media (max-width: 700px) {
    width: 50%;
  }
`;

export const WordToggleContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 80%;
  margin: 20px auto;

  @media (max-width: 1000px) {
    width: 95%;
  }

  @media (max-width: 700px) {
    width: 99%;
  }
`;
