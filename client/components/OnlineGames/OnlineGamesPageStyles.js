import styled from 'styled-components';
import { textColor } from '../../config/globalStyles';

export const Headline = styled.div`
  box-sizing: border-box;
  max-width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
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

  h1, h2 {
    text-align: center;
  }

  h1 {
    margin-bottom: 0;
  }

  h2 {
    margin-top: 5px;
    margin-bottom: 10px;
  }
`;

export const ThumbBox = styled.div`
  width: 100%;
  margin: 15px;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const ThumbContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;
