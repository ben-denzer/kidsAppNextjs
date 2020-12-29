import React from 'react';
import Link from 'next/link';
import { HeaderContainer, HeaderLogo } from './HeaderStyles';
import Nav from './Nav';

export default function Header(props) {
  return (
    <HeaderContainer>
      <Link href="/"><a><HeaderLogo src="/static/img/logo2.png" /></a></Link>
      <Nav key={props.loggedIn} {...props} />
    </HeaderContainer>
  );
}
