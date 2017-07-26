import React from 'react';
import Header from './Header';
import { LayoutContainer } from './MainLayoutStyles';

function MainLayout(Child, props) {
  return (
    <LayoutContainer>
      <Header />
      <Child {...props} />
    </LayoutContainer>
  );
}

export default MainLayout;
