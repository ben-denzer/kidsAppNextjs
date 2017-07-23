import styled from 'styled-components';

export const headerHeight = '80';

export const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  height: ${headerHeight}px;
  background-color: white;
  box-shadow: 0px 5px 5px #999;
`;

export const HeaderLogo = styled.img`
  height: ${headerHeight - 10}px;
  width: auto;
`;
