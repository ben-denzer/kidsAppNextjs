import React from 'react';
import Header from './Header';
import { LayoutContainer } from './MainLayoutStyles';

function MainLayout(Child) {
  return function MainContainer() {
    return (
      <LayoutContainer>
        <Header />
        <Child />
      </LayoutContainer>
    );
  };
}

export default MainLayout;
