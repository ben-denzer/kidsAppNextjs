import styled from 'styled-components';

export const ErrorBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  top: 0;
  height: 200px;
  width: 100%;
  background-color: rgba(255, 0, 0, .9);
  color: white;
  font-size: 22px;
`;

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
