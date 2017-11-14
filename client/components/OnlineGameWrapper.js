import React, { Component } from 'react';
import MainLayout from './MainLayout';
import defaultWordList from '../config/defaultSightWords';
import shuffle from '../utils/shuffle';


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
      this.playCoinSound = this.playCoinSound.bind(this);
      this.playSuccessSound = this.playSuccessSound.bind(this);
      this.toggleSound = this.toggleSound.bind(this);
    }

    componentDidMount() {
      this.setState({ wordList: defaultWordList });
    }

    addCoin() {
      this.playCoinSound();
      const { coins } = this.state;
      this.setState({ showPrize: true, spinnerClassName: 'show' });
      setTimeout(() => this.setState({ spinnerClassName: 'fadeOut' }), 3000);
      setTimeout(
        () => {
          this.setState({
            coins: coins + 1,
            showPrize: false,
            spinnerClassName: 'hide'
          }), 3500
        }
      );
    }

    playCoinSound() {
      if (this.state.mute) return;
      this.coinSound.play();
    }

    playSuccessSound() {
      if (this.state.mute) return;
      this.successSound.play();
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
          playCoinSound={this.playCoinSound}
          playSuccessSound={this.playSuccessSound}
          toggleSound={this.toggleSound}
        />,
        <audio
          key="audio1"
          type="audio/mp3"
          src="/static/media/shootingStar.mp3"
          ref={successSound => {
            this.successSound = successSound;
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
