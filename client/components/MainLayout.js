import React, { Component } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { LayoutContainer } from './MainLayoutStyles';

function MainLayout(Child) {
  return class extends Component {
    constructor() {
      super();

      this.getUser = this.getUser.bind(this);
    }

    componentDidMount() {
      this.getUser();
    }

    getUser() {
      console.log('getting user..');
    }

    render() {
      const pathname = this.props.url.pathname;
      return (
        <LayoutContainer className={pathname.slice(pathname.lastIndexOf('/') + 1)}>
          <Header />
          <Child {...this.props} getUser={this.getUser} />
          <Footer />
        </LayoutContainer>
      );
    }
  }
}

export default MainLayout;
