import React from 'react';
import Header from './Header/Header';
import { LayoutContainer } from './MainLayoutStyles';

function MainLayout(Child, props) {
  return (
    <LayoutContainer className={props.url.pathname.slice(1)}>
      <Header />
      <Child {...props} />
    </LayoutContainer>
  );
}

export default MainLayout;
