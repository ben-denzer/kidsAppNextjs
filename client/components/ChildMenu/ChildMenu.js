import React, { Component } from 'react';
import Link from 'next/link';
import { getFromStorage, setInStorage } from '../../utils/mswLocalStorage';
import MainLayout from '../MainLayout';
import ChildThumb from './ChildThumb';

import styled from 'styled-components';
import { textColor } from '../../config/globalStyles';

class ChildMenu extends Component {
  constructor() {
    super();
    this.state = { children: [], error: false };

    this.makeThumbs = this.makeThumbs.bind(this);
    this.selectChild = this.selectChild.bind(this);
  }

  componentDidMount() {
    this.getChildren();
  }

  getChildren() {
    const token = getFromStorage('token');
    const children = getFromStorage('children');
    if (!token) return window.location = '/account/login';
    this.setState({ children });
  }

  makeThumbs(children) {
    if (!children.length) return null;
    return children.map(a => (
      <ChildThumb
        key={a.id}
        id={a.id}
        name={a.username}
        coins={a.coins}
        selectChild={this.selectChild}
      />
    ));
  }

  selectChild(e) {
    const childId = e.currentTarget.dataset.childId;
    if (!childId) return;
    setInStorage('activeChild', childId);
    window.location = '/online-games';
  };

  render() {
    const { children, error } = this.state;
    const childThumbs = this.makeThumbs(children);
    return (
      <PageContainer className="whiteBox">
        <h1>Menu</h1>
        <Children>
          {childThumbs}
        </Children>
      </PageContainer>
    );
  }
}

const Children = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 90%;
  margin: 0 auto;
`;

const PageContainer = styled.div`
  min-height: 600px;
  padding: 50px;
  max-width: 100%;
  box-sizing: border-box;

  @media (max-width: 900px) {
    padding: 15px;
  }

  a {
    font-size: 16px;
    color: ${textColor};
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    text-align: center;
  }

  h1 {
    margin-bottom: 0;
  }
`;

export default MainLayout(ChildMenu);
