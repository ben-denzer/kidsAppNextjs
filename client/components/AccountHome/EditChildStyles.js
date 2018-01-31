import styled from 'styled-components';
import { color2 } from '../../config/globalStyles';

const maxHeight = 500;
const nameBoxHeight = 40;

export const EditChildContainer = styled.div`
  max-height: ${nameBoxHeight}px;
  background-color: #eee;
  border: 2px solid black;
  border-top-right-radius: 10px;
  padding: 0 10px;
  transition: all .9s ease-in-out;
  overflow: hidden;
  margin-bottom: 10px;
  position: relative;

  &.open {
    max-height: ${maxHeight}px;
  }

  .nameContainer {
    font-size: 24px;
    font-weight: bold;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;

    &:hover {
      background: #eee;
      cursor: pointer;
    }
  }
`;

export const ExpandButton = styled.span`
  display: inline-block;
  min-width: 20px;
`;

export const WordBox = styled.div`
  height: ${maxHeight - nameBoxHeight}px;
  overflow-y: auto;

  h4 {
    font-size: 17px;
    margin-bottom: 0;
  }

  input {
    font-size: 17px;
    border: 3px solid ${color2};
    margin-bottom: 10px;
  }
`;
