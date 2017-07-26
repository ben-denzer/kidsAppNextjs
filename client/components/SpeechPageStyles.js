import styled from 'styled-components';

export const SkipWordButton = styled.img`
  width: 50px;
  height: auto;
  position: absolute;
  bottom: 10px;
  right: 10px;

  &:hover {
    cursor: pointer;
    opacity: .8;
  }
`;

export const WordContainer = styled.div`
  font-size: 60px;
  font-weight: bold;
`;
