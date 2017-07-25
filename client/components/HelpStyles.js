import styled from 'styled-components';

const closeButtonSize = 30;
export const CloseButton = styled.img`
  position: absolute;
  height: ${closeButtonSize}px;
  width: ${closeButtonSize}px;
  top: -${closeButtonSize / 2}px;
  right: -${closeButtonSize / 2}px;
  z-index: 4;

  &:hover {
    cursor: pointer;
    opacity: .8;
  }
`;

export const FullScreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, .8);
  transition: all .5s ease-in-out;
  z-index: 2;

  &.closed {
    display: none;
  }

  &.transition {
    display: 'block';
    opacity: 0;
  }

  &.open {
    opacity: 1;
  }
`;

export const Modal = styled.div`
  width: 90%;
  height: 60%;
  margin-top: 100px;
  max-width: 700px;
  background-color: white;
  position: relative;
  font-size: 16px;
  z-index: 3;

  h2 {
    text-align: center;
    font-size: 22px;
  }
`;

export const ModalBody = styled.div`
  position: relative;
  max-height: calc(100% - 30px);
  width: calc(100% - 30px);
  overflow: auto;
  padding: 15px;
`;
