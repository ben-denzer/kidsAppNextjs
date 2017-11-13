import React, { Component } from 'react';
import MainLayout from './MainLayout';
import defaultWordList from '../config/defaultSightWords';

const OnlineGameWrapper = (WrappedComponent) => {
  return class extends Component {
    constructor() {
      super();

      this.state = {
        coins: 12,
        mute: false,
        showPrize: false,
        spinnerClassName: 'hide',
        wordList: []
      }

      this.addCoin = this.addCoin.bind(this);
      this.toggleSound = this.toggleSound.bind(this);
    }

    componentDidMount() {
      this.setState({ wordList: defaultWordList });
    }

    addCoin() {
      if (!this.state.mute) {
        this.coinSound.play();
      }
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

    toggleSound() {
      this.setState({ mute: !this.state.mute });
    }

    render() {
      return [
        <WrappedComponent
          key="game"
          {...this.props}
          {...this.state}
          addCoin={this.addCoin}
          coinSound={this.coinSound}
          correctSound={this.correctSound}
          toggleSound={this.toggleSound}
        />,
        <audio
          key="audio1"
          type="audio/mp3"
          src="/static/media/shootingStar.mp3"
          ref={correctSound => {
            this.correctSound = correctSound;
          }}
        />,
        <audio
          key="audio2"
          type="audio/mp3"
          src="/static/media/cheer.mp3"
          ref={coinSound => {
            this.coinSound = coinSound;
          }}
        />
      ];
    }
  }
}

export default OnlineGameWrapper;
