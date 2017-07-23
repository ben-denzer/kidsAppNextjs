import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

function Header(props) {
  return (
    <HeaderContainer>
      <HeaderLogo src="/static/img/logo.png" />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  width: 100%;
  height: 120px;
  background-color: black;
`;

const HeaderLogo = styled.img`
  height: 110px;
  width: auto;
`;

export default Header;
