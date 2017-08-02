import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { LayoutContainer } from './MainLayoutStyles';

function MainLayout(Child, props) {
  const pathname = props.url.pathname;
  return (
    <LayoutContainer className={pathname.slice(pathname.lastIndexOf('/') + 1)}>
      <Header />
      <Child {...props} />
      <Footer />
    </LayoutContainer>
  );
}

export default MainLayout;
