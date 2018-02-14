import React, { Component } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { getFromStorage } from '../utils/mswLocalStorage';
import { ErrorBox, LayoutContainer } from './MainLayoutStyles';
import validateAccount from '../api/validateAccount';

function MainLayout(Child) {
  return class extends Component {
    constructor() {
      super();

      this.state = {
        activeChildName: null,
        childCount: null,
        error: '',
        loggedIn: false,
        accountExpired: null
      }
    }

    componentDidMount() {
      const token = getFromStorage('token');
      if (token && !/login/i.test(window.location.pathname) && !/signup/.test(window.location.pathname)) {
        validateAccount({ token })
          .then(status => this.setUserData(status))
          .catch(e => {
            console.log(e);
          });
      }
      if (!window.fetch) {
        this.setState({ error: this.unsupportedBrowserMessage() });
      }
    }

    setUserData({ membershipValid }) {
      if (membershipValid) {
        const activeChild = getFromStorage('activeChild');
        const children = getFromStorage('children');
        const childCount = children.length;
        const filteredChildren = children.filter(a => {
          return Number(a.child_id) === Number(activeChild)
        });
        const activeChildName = filteredChildren.length ? filteredChildren[0].username : null;
        this.setState({ activeChildName, childCount, loggedIn: true, accountExpired: false });
      } else {
        this.setState({ activeChildName: 'Membership Expired', loggedIn: true, accountExpired: true });
      }
    }

    unsupportedBrowserMessage() {
      return 'Your Browser is not supported, try again using Google Chrome or Mozilla Firefox.';
    }

    render() {
      const pathname = this.props.url.pathname;
      return (
        <LayoutContainer className={pathname.slice(pathname.lastIndexOf('/') + 1)}>
          {this.state.error && <ErrorBox>{this.state.error}</ErrorBox>}
          <Header {...this.state} pathname={pathname} />
          <Child {...this.props} {...this.state} />
          <Footer />
        </LayoutContainer>
      );
    }
  }
}

export default MainLayout;
