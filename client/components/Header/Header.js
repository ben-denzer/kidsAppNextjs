import React from 'react';
import Link from 'next/link';
import { HeaderContainer, HeaderLogo } from './HeaderStyles';
import Nav from './Nav';

export default function Header(props) {
  return (
    <HeaderContainer>
      <HeaderLogo src="/static/img/logo.png" />
      <Nav />
    </HeaderContainer>
  );
}
