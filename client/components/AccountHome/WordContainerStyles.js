import styled from 'styled-components';
import { light } from '../../config/globalStyles';

export const DeleteWordButton = styled.button`
  margin-right: 10px;
  background: ${light};
  color: darkred;
  font-weight: bold;
  height: 30px;
  min-width: 30px;

  &:hover {
    cursor: pointer;
    background: #fff;
  }
`;

export const WordRow = styled.div`
  margin-bottom: 10px;
  font-size: 17px;
  display: flex;
  align-items: center;

  &.inactive {
    background-color: #ccc;
    color: #606060;
  }
`;
