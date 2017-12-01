import styled from 'styled-components';
import {
  color1,
  color2,
  color3,
  color4,
  light,
  textColor
} from '../../config/globalStyles';

export const AccountForm = styled.form`
  display: flex;
  flex-direction: column;
  color: ${textColor};
  padding: 0 10px;
  box-sizing: border-box;
  width: 50%;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 1000px) {
    width: 100%;
  }

  h1 {
    text-align: center;
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

export const FormErrorBox = styled.div`
  background-color: red;
  color: ${light};
  font-size: 18px;
  font-weight: bold;
  padding: 4px;
`;

export const FormLabel = styled.label`
  font-size: 18px;
  margin-bottom: 4px;
`;

export const FormTextInput = styled.input`
  margin-bottom: 15px;
`;
