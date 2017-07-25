import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const pages = [
  { name: 'Online Games', href: '/online-games' },
  { name: 'Printable Games', href: '/printable-games' },
  { name: 'My Account', href: '/account' }
];

export default function Nav(props) {
  const navItems = pages.map(a => (
    <NavItem key={a.name}>
      <Link prefetch href={a.href}><a title={a.name}>{a.name}</a></Link>
    </NavItem>
  ));

  return <NavBar>{navItems}</NavBar>;
}

const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 10px;

  a {
    text-decoration: none;
    color: #222;
  
    &:hover {
      text-decoration: underline;
    }
  }
`;
const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-left: 1px solid #999;

  :nth-child(1) {
    border-left: 0;
  }
`;
