import React from 'react';
import Link from 'next/link';
import { HeaderContainer, HeaderLogo } from './HeaderStyles';

export default function Header(props) {
  return (
    <HeaderContainer>
      <HeaderLogo src="/static/img/logo.png" />
    </HeaderContainer>
  );
}
