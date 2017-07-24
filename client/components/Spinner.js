import React, { Component } from 'react';
import styled from 'styled-components';

class Spinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinnerClassName: ''
    };
  }
  componentWillUnmount() {
    this.setState({ spinnerClassName: 'fadeOut' });
    setTimeout(() => this.setState({ spinnerClassName: 'hidden' }), 1000);
  }
  render() {
    return (
      <SpinnerImg
        className={this.state.spinnerClassName}
        src="/static/img/spinningQuarter.gif-c200"
      />
    );
  }
}

const SpinnerImg = styled.img`
  height: 150px;
  width: 150px;
  transition: all 1s ease-in-out;
  position: absolute;

  &.fadeOut {
    top: 10px;
    left: 10px;
  }
`;

export default Spinner;
