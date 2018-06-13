import styled from 'styled-components';
import { color1, color2, light, textColor } from '../../config/globalStyles';

const formStatusBox = bg => {
  return `
    background-color: ${bg};
    color: ${light};
    font-size: 18px;
    font-weight: bold;
    padding: 4px;
    text-align: center;
  `;
};

export const AccountForm = styled.form`
  display: flex;
  flex-direction: column;
  color: ${textColor};
  padding: 0 10px;

  &.smallForm {
    max-width: 300px;
  }

  &.centered {
    margin: 0 auto;
  }

  @media (max-width: 1000px) {
    width: 100%;
    padding: 0;
  }

  h1 {
    text-align: center;
  }
`;

export const FakeLink = styled.a`
  color: blue;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const Form2Cols = styled.div`
  display: flex;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

export const FormButton = styled.button`
  background-color: ${color1};
  color: ${light};
  font-size: 18px;
  font-weight: bold;
  padding: 4px;

  &:hover {
    cursor: pointer;
    background-color: ${color2};
  }
`;

export const FormCheckbox = styled.input``;

export const FormErrorBox = styled.div`
  ${formStatusBox('red')}
`;

export const FormExtraOptions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 5px;
`;

export const FormLabel = styled.label`
  font-size: 18px;
  margin-bottom: 4px;
`;

export const FormHalf = styled.div`
  box-sizing: border-box;
  width: 50%;
  display: flex;
  flex-direction: column;
  padding: 0 10px;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const FormRadioButton = styled.input``;

export const FormSuccessBox = styled.div`
  ${formStatusBox('green')}
`;

export const FormTextInput = styled.input`
  margin-bottom: 15px;
`;

export const RememberMeContainer = styled.div`
  display: flex;
  align-items: center;
`;
