import styled from 'styled-components';
import { light } from '../../config/globalStyles';

export const headerHeight = '80';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: ${headerHeight}px;
  background-color: ${light};
  box-shadow: 0px 5px 5px #999;
  position: relative;
  z-index: 2;

  @media (max-width: 700px) {
    height: 65px;
  }

  a {
    &:hover {
      cursor: pointer;
    }
  }
`;

export const HeaderLogo = styled.img`
  height: ${headerHeight - 10}px;
  width: auto;
  margin-left: 10px;

  @media (max-width: 700px) {
    width: 240px;
    height: 57px;
  }
`;
