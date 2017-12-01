import React, { Component } from 'react';
import Link from 'next/link';
import { Hamburger, NavBar, NavItem, NavItemsContainer } from './NavStyles';

const pages = [
  { name: 'Online Games', href: '/online-games', userState: 'all' },
  { name: 'Printable Games', href: '/printable-games', userState: 'all' },
  { name: 'Sign Up', href: '/account/signup', userState: 'all' }
  // { name: 'My Account', href: '/account', userState: 'loggedIn' }
];

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navOpen: false
    };

    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    this.setState({ navOpen: !this.state.navOpen });
  }

  render() {
    const { navOpen } = this.state;

    const navItems = pages.map(a => (
      <NavItem key={a.name}>
        <Link prefetch href={a.href}><a title={a.name}>{a.name}</a></Link>
      </NavItem>
    ));

    return (
      <NavBar onClick={this.toggleNav}>
        <Hamburger><div /><div /><div /></Hamburger>
        <NavItemsContainer className={navOpen ? 'open' : ''}>
          {navItems}
        </NavItemsContainer>
      </NavBar>
    );
  }
}
