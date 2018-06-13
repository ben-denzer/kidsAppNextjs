import React, { Component } from 'react';
import { getFromStorage, setInStorage } from '../../utils/mswLocalStorage';
import MainLayout from '../MainLayout';
import ChildThumb from './ChildThumb';

import { Children, PageContainer } from './ChildMenuStyles';

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
    if (children.length === 1) { return this.selectChild(null, children[0].child_id); }
    this.setState({ children });
  }

  makeThumbs(children) {
    if (!children.length) return null;
    return children.map(a =>
      <ChildThumb
        key={a.child_id}
        id={a.child_id}
        name={a.username}
        coins={a.coins}
        selectChild={this.selectChild}
      />
    );
  }

  selectChild(e, id) {
    let childId;
    if (id) {
      childId = id;
    } else {
      childId = e.currentTarget.dataset.childId;
      if (!childId) return;
    }
    setInStorage('activeChild', childId);
    window.location = '/online-games';
  }

  render() {
    const { children, error } = this.state;
    const childThumbs = this.makeThumbs(children);
    return (
      <PageContainer className="whiteBox">
        <Children>
          {childThumbs}
        </Children>
      </PageContainer>
    );
  }
}

export default MainLayout(ChildMenu);
