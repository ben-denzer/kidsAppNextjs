import React from 'react';
import styled from 'styled-components';

function Spinner(props) {
  return (
    <SpinnerImg
      className={props.spinnerClassName}
      src="/static/img/goldCoinSpinner.gif"
      alt="Success!"
    />
  );
}

const SpinnerImg = styled.img`
  height: 150px;
  width: 150px;
  transition: all .5s ease-in-out;
  position: absolute;
  top: calc(50% - 75px);
  right: calc(50% - 75px);
  z-index: 20;

  &.hide {
    display: none;
  }

  &.fadeOut {
    top: 10px;
    right: 10px;
    height: 50px;
    width: 50px;
  }

  &.show {
    display: block;
  }
`;

export default Spinner;
