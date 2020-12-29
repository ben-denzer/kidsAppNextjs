import styled from 'styled-components';

export const ChildThumbContainer = styled.div`
  min-width: 200px;
  min-height: 150px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  border: 10px solid #999;
  border-radius: 20px;
  margin: 8px;
  font-size: 54px;
  font-family: "Indie Flower", Arial, Helvetica, sans-serif;
  letter-spacing: 8px;
  font-weight: bold;
  box-sizing: border-box;
  padding: 2px 5px;
  position: relative;
  z-index: 1;

  &:hover {
    cursor: pointer;
    background: white;
  }

  @media (max-width: 600px) {
    font-size: 40px;
    letter-spacing: 2px;

    &:hover {
      background: #f2f2f2;
    }
  }
`;

export const ChildIcon = styled.img`
  width: 80px;
  height: 80px;
`;

export const IconContainer = styled.div`
  position: absolute;
  font-size: 40px;
  font-family: Lato, Arial, Helvetica, sans-serif;
  letter-spacing: 0;
  top: -40px;
  left: -30px;
  display: flex;
  align-items: center;

  span {
    position: absolute;
  }
`;
