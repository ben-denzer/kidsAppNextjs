import React, { Component } from 'react';
import Link from 'next/link';
import { Hamburger, NavBar, NavItem, NavItemsContainer } from './NavStyles';

const pages = [
  { name: 'Online Games', href: '/online-games', userState: 'all' },
  { name: 'Printable Games', href: '/printable-games', userState: 'all' }
];

const noUserLinks = [
  { name: 'Log In', href: '/account/login' },
  { name: 'Sign Up', href: '/account/signup'}
];

const loggedInLinks = [
  { name: 'My Account', href: '/account/home' },
  { name: 'Log Out', href: '/account/logout' }
];

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allLinks: [],
      navOpen: false
    };

    this.toggleNav = this.toggleNav.bind(this);
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      this.setState({ allLinks: [...pages, ...loggedInLinks] });
    } else {
      this.setState({ allLinks: [...pages, ...noUserLinks] });
    }
  }

  toggleNav() {
    this.setState({ navOpen: !this.state.navOpen });
  }

  render() {
    const { allLinks, navOpen } = this.state;
    let navItems = [];

    if (allLinks.length) {
      navItems = allLinks.map(a => (
        <NavItem key={a.name}>
          <Link prefetch href={a.href}><a title={a.name}>{a.name}</a></Link>
        </NavItem>
      ));
    }

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
