import React, { Component } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { LayoutContainer } from './MainLayoutStyles';
import { getFromStorage } from '../utils/mswLocalStorage';

function MainLayout(Child) {
  return class extends Component {
    constructor() {
      super();

      this.state = {
        loggedIn: false,
        children: [],
      }
    }

    componentDidMount() {
      const token = getFromStorage('token');
      if (token) {
        this.setState({ loggedIn: true });
      }
    }

    render() {
      const pathname = this.props.url.pathname;
      return (
        <LayoutContainer className={pathname.slice(pathname.lastIndexOf('/') + 1)}>
          <Header loggedIn={this.state.loggedIn} />
          <Child {...this.props} {...this.state} />
          <Footer />
        </LayoutContainer>
      );
    }
  }
}

export default MainLayout;
