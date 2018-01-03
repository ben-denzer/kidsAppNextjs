import React, { Component } from 'react';
import Link from 'next/link';
import Modal from '../Modal/Modal';
import {
  Hamburger,
  LogoutButtonRow,
  LogoutModalBody,
  NavBar,
  NavItem,
  NavItemsContainer,
  SmallTextLink
} from './NavStyles';

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allLinks: [],
      showLogoutModal: false,
      navOpen: false
    };

    this.showLogoutModal = this.showLogoutModal.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      this.setState({ allLinks: [...this.pages(), ...this.loggedInLinks()] });
    } else {
      this.setState({ allLinks: [...this.pages(), ...this.noUserLinks()] });
    }
  }

  pages() {
    return [
      { name: 'Online Games', href: '/online-games', userState: 'all' },
      { name: 'Printable Games', href: '/printable-games', userState: 'all' }
    ];
  }

  noUserLinks() {
    return [
      { name: 'Log In', href: '/account/login' },
      { name: 'Sign Up', href: '/account/signup'}
    ];
  }

  loggedInLinks() {
    return [
      { name: 'My Account', href: '/account/home' },
      { name: 'Log Out', href: '#' }
    ];
  }

  showLogoutModal() {
    this.setState({ showLogoutModal: true });
  }

  toggleNav() {
    this.setState({ navOpen: !this.state.navOpen });
  }

  render() {
    const { allLinks, navOpen, showLogoutModal } = this.state;
    const { activeChildName, childCount, loggedIn } = this.props;
    let navItems = [];

    if (allLinks.length) {
      navItems = allLinks.map(a => (
        <NavItem key={a.name} onClick={a.name === 'Log Out' ? this.showLogoutModal : null}>
          <Link prefetch href={a.href}><a onClick={a.callback} title={a.name}>{a.name}</a></Link>
        </NavItem>
      ));
    }

    if (activeChildName && !/childmenu/.test(window.location.pathname)) {
      const helloChild = (
        <NavItem key="helloChild">
          <strong>{activeChildName}</strong>&nbsp;
          {
            childCount > 1 && (
              <Link prefetch href="/account/childmenu">
                <SmallTextLink>change</SmallTextLink>
              </Link>
            )
          }
        </NavItem>
      );
      navItems = [helloChild, ...navItems];
    }

    return [
      <NavBar key="a" onClick={this.toggleNav}>
        <Hamburger><div /><div /><div /></Hamburger>
        <NavItemsContainer className={navOpen ? 'open' : ''}>
          {navItems}
        </NavItemsContainer>
      </NavBar>,
      <Modal
        key="b"
        Body={() => (
          <LogoutModalBody>
            <p>Are You Sure You Want To Sign Out?</p>
            <LogoutButtonRow>
              <button
                id="exit"
                onClick={() => window.location = '/account/logout'}
              >
                Yes
              </button>
              <button
                onClick={() => this.setState({ showLogoutModal: false })}
              >
                Cancel
              </button>
            </LogoutButtonRow>
          </LogoutModalBody>
        )}
        modalOpen={showLogoutModal}
        small={false}
        toggleModal={() => this.setState({ showLogoutModal: false })}
      />
    ];
  }
}
