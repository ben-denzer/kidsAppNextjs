import React, { Component } from 'react';
import MainLayout from './MainLayout';
import defaultWordList from '../config/defaultSightWords';
import shuffle from '../utils/shuffle';
import { getFromStorage, setInStorage } from '../utils/mswLocalStorage';
import fetchAddCoin from '../api/fetchAddCoin';

const OnlineGameWrapper = (WrappedComponent) => {
  return class extends Component {
    constructor() {
      super();

      this.state = {
        apiError: false,
        coins: 0,
        helpOpen: false,
        mute: true,
        showPrize: false,
        spinnerClassName: 'hide',
        wordList: []
      }

      this.addCoin = this.addCoin.bind(this);
      this.playCoinSound = this.playCoinSound.bind(this);
      this.playSuccessSound = this.playSuccessSound.bind(this);
      this.toggleHelp = this.toggleHelp.bind(this);
      this.toggleSound = this.toggleSound.bind(this);
    }

    componentDidMount() {
      this.setInitialCoins();
      const mute = getFromStorage('mute');
      this.setState({ mute, wordList: defaultWordList });
    }

    addCoin() {
      const { coins } = this.state;
      const newCoins = coins + 1;
      this.addCoinUi(newCoins);
      const childId = getFromStorage('activeChild');
      const children = getFromStorage('children');

      const updatedChildren = children.map(a => {
        if (Number(a.child_id) === Number(childId)) {
          return Object.assign({}, a, { coins: newCoins });
        }
        return a;
      });
      console.log('updatedChildren is', updatedChildren);
      setInStorage('children', updatedChildren);
      // fetchAddCoin(newCoins).catch(() => this.setState({ apiError: 'Connection Error' }));
    }

    addCoinUi(newCoins) {
      this.playCoinSound();
      this.setState({ showPrize: true, spinnerClassName: 'show' });
      setTimeout(() => this.setState({ spinnerClassName: 'fadeOut' }), 3000);
      setTimeout(() => this.setState({
        coins: newCoins,
        showPrize: false,
        spinnerClassName: 'hide'
      }), 3500);
    }

    playCoinSound() {
      if (this.state.mute) return;
      this.coinSound.play();
    }

    playSuccessSound() {
      if (this.state.mute) return;
      this.successSound.play();
    }

    setInitialCoins() {
      const childId = getFromStorage('activeChild');
      const children = getFromStorage('children');
      if (!childId || !children || !children.length) {
        return this.setState({ coins: 0 });
      }
      for (let i in children) {
        if (children.hasOwnProperty(i)) {
          if (Number(children[i].child_id) === Number(childId)) {
            return this.setState({ coins: children[i].coins });
          }
        }
      }
      this.setState({ coins: 0 });
    }

    toggleHelp() {
      this.setState({ helpOpen: !this.state.helpOpen });
    }

    toggleSound() {
      this.setState({ mute: !this.state.mute });
      setInStorage('mute', !this.state.mute);
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
          toggleHelp={this.toggleHelp}
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
