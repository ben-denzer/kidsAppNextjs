import React, { Component } from 'react';
import defaultWordList from '../config/defaultSightWords';
import MemoryPage from '../components/MemoryPage';

export default class MemoryPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: 0,
      helpOpen: false,
      mute: false,
      score: 0,
      showPrize: false,
      spinnerClassName: 'hide',
      wordList: []
    };

    this.toggleHelp = this.toggleHelp.bind(this);
    this.toggleSound = this.toggleSound.bind(this);
  }

  componentDidMount() {
    const coins = window.localStorage.getItem('coins');
    this.setState({ wordList: defaultWordList });
  }

  addCoin() {
    const { coins } = this.state;
    this.setState({ showPrize: true, spinnerClassName: 'show' });
    setTimeout(() => this.setState({ spinnerClassName: 'fadeOut' }), 3000);
    setTimeout(
      () =>
        this.setState({
          coins: coins + 1,
          showPrize: false,
          spinnerClassName: 'hide'
        }),
      3500
    );
  }

  toggleHelp() {
    this.setState({ helpOpen: !this.state.helpOpen });
  }

  toggleSound() {
    this.setState({ mute: !this.state.mute });
  }

  render() {
    return (
      <MemoryPage
        toggleHelp={this.toggleHelp}
        toggleSound={this.toggleSound}
        {...this.props}
        {...this.state}
      />
    );
  }
}
