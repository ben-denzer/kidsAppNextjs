import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class Help extends Component {
  constructor(props) {
    super(props);
    this.state = { modalClass: 'closed' };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.helpOpen !== nextProps.helpOpen) {
      if (nextProps.helpOpen) {
        this.setState({ modalClass: 'transition' });
        setTimeout(() => this.setState({ modalClass: 'open' }), 0);
      } else {
        this.setState({ modalClass: 'transition' });
        setTimeout(() => this.setState({ modalClass: 'closed' }), 500);
      }
    }
  }

  render() {
    const { body, helpOpen, title, toggleHelp } = this.props;
    const { modalClass } = this.state;
    return (
      <FullScreen className={modalClass}>
        <Modal>
          <CloseButton
            src="/static/img/close.png"
            alt="close"
            onClick={toggleHelp}
          />
          <ModalBody>
            <h2>{title}</h2>
            {body}
          </ModalBody>
        </Modal>
      </FullScreen>
    );
  }
}

Help.propTypes = {
  body: PropTypes.string.isRequired,
  helpOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  toggleHelp: PropTypes.func.isRequired
};

const FullScreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, .6);
  transition: all .5s ease-in-out;
  z-index: 2;

  &.closed {
    display: none;
  }

  &.transition {
    display: 'block';
    opacity: 0;
  }

  &.open {
    opacity: 1;
  }
`;

const Modal = styled.div`
  width: 90%;
  height: 60%;
  margin-top: 100px;
  max-width: 700px;
  background-color: white;
  position: relative;
  font-size: 16px;
  z-index: 3;

  h2 {
    text-align: center;
    font-size: 22px;
  }
`;

const closeButtonSize = 30;
const CloseButton = styled.img`
  position: absolute;
  height: ${closeButtonSize}px;
  width: ${closeButtonSize}px;
  top: -${closeButtonSize / 2}px;
  right: -${closeButtonSize / 2}px;
  z-index: 4;

  &:hover {
    cursor: pointer;
    opacity: .8;
  }
`;

const ModalBody = styled.div`
  position: relative;
  max-height: calc(100% - 30px);
  width: calc(100% - 30px);
  overflow: auto;
  padding: 15px;
`;

export default Help;
