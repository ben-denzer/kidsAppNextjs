import React from 'react';
import Header from './Header';

export default function MainLayout(Child) {
  return function MainContainer() {
    return (
      <div id="mainContainer">
        <Header />
        <Child />
      </div>
    );
  };
}
