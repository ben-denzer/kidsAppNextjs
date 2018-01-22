import React, { Component } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { getFromStorage } from '../utils/mswLocalStorage';
import { LayoutContainer } from './MainLayoutStyles';
import validateAccount from '../api/validateAccount';

function MainLayout(Child) {
  return class extends Component {
    constructor() {
      super();

      this.state = {
        activeChildName: null,
        childCount: null,
        loggedIn: false,
      }
    }

    componentDidMount() {
      const token = getFromStorage('token');
      if (!/login/i.test(window.location.pathname) && !/signup/.test(window.location.pathname)) {
        validateAccount({ token })
          .then(status => this.setUserData(status))
          .catch(e => {
            console.log(e);
          });
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
        this.setState({ activeChildName, childCount, loggedIn: true });
      } else {
        this.setState({ activeChildName: 'Membership Expired', loggedIn: true });
      }
    }

    render() {
      const pathname = this.props.url.pathname;
      return (
        <LayoutContainer className={pathname.slice(pathname.lastIndexOf('/') + 1)}>
          <Header {...this.state} />
          <Child {...this.props} {...this.state} />
          <Footer />
        </LayoutContainer>
      );
    }
  }
}

export default MainLayout;
