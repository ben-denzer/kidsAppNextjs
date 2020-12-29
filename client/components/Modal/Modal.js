import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  CloseButton,
  FullScreen,
  ModalContainer,
  ModalBody
} from './ModalStyles';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = { modalClass: 'closed' };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.modalOpen !== nextProps.modalOpen) {
      this.setState({ modalClass: 'transition' });
      if (nextProps.modalOpen) {
        setTimeout(() => this.setState({ modalClass: 'open' }), 0);
      } else {
        setTimeout(() => this.setState({ modalClass: 'closed' }), 500);
      }
    }
  }

  render() {
    const { Body, small, toggleModal } = this.props;
    const { modalClass } = this.state;
    return (
      <FullScreen className={modalClass} onClick={toggleModal}>
        <ModalContainer className={small ? 'small' : ''}>
          <CloseButton src="/static/img/close.png" alt="close" />
          <ModalBody
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <Body />
          </ModalBody>
        </ModalContainer>
      </FullScreen>
    );
  }
}

Modal.defaultProps = {
  small: false
};

Modal.propTypes = {
  Body: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  small: PropTypes.bool,
  toggleModal: PropTypes.func.isRequired
};

export default Modal;
