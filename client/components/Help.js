import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CloseButton, FullScreen, Modal, ModalBody } from './HelpStyles';
import SpeechHelpText from './helpText/SpeechHelpText';

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
    const { Body, helpOpen, toggleHelp } = this.props;
    const { modalClass } = this.state;
    return (
      <FullScreen className={modalClass} onClick={toggleHelp}>
        <Modal>
          <CloseButton src="/static/img/close.png" alt="close" />
          <ModalBody
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <h2>Help</h2>
            <Body />
          </ModalBody>
        </Modal>
      </FullScreen>
    );
  }
}

Help.propTypes = {
  Body: PropTypes.func.isRequired,
  helpOpen: PropTypes.bool.isRequired,
  toggleHelp: PropTypes.func.isRequired
};

export default Help;
