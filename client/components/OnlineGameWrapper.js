import React, { Component } from 'react';
import MainLayout from './MainLayout';
import defaultWordList from '../config/defaultSightWords';
import shuffle from '../utils/shuffle';
import { getFromStorage, setInStorage } from '../utils/mswLocalStorage';
import getWordsForChild from '../api/getWordsForChild';
import makeAddCoinRequest from '../api/makeAddCoinRequest';

const OnlineGameWrapper = (WrappedComponent) => {
  return class extends Component {
    constructor() {
      super();

      this.state = {
        activeChild: null,
        apiError: false,
        children: [],
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
      this.fillWordArray = this.fillWordArray.bind(this);
      this.toggleHelp = this.toggleHelp.bind(this);
      this.toggleSound = this.toggleSound.bind(this);
    }

    componentDidMount() {
      this.init();
    }

    addCoin() {
      const { activeChild, children, coins } = this.state;
      const newCoins = coins + 1;
      this.addCoinUi(newCoins);

      const updatedChildren = children.map(a => {
        if (Number(a.child_id) === Number(activeChild)) {
          return Object.assign({}, a, { coins: newCoins });
        }
        return a;
      });
      this.setState({ children: updatedChildren });
      setInStorage('children', updatedChildren);
      makeAddCoinRequest({ childId: activeChild, coins: newCoins })
        .catch(() => this.setState({ apiError: 'Connection Error' }));
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

    fillWordArray(words, totalNeeded) {
      if (words.length < totalNeeded) {
        let extraWords = defaultWordList.slice(0);
        while(words.length < totalNeeded) {
          let nextWord = extraWords.pop();
          if (words.indexOf(nextWord) === -1) {
            words = [...words, nextWord];
          }
        }
      }
      return words;
    }

    getInitialCoins(activeChild, children) {
      if (!activeChild || !children || !children.length) {
        return 0;
      }
      for (let i in children) {
        if (children.hasOwnProperty(i)) {
          if (Number(children[i].child_id) === Number(activeChild)) {
            return children[i].coins;
          }
        }
      }
      return 0;
    }

    async setWordList(childId) {
      try {
        const words = await getWordsForChild({ childId });
        const wordList = words.map(a => a.word_text);
        this.setState({ wordList });
      } catch(e) {
        console.log(e);
      }
    }

    init() {
      const activeChild = getFromStorage('activeChild');
      const children = getFromStorage('children');
      const coins = activeChild ? this.getInitialCoins(activeChild, children) : 0;
      const mute = getFromStorage('mute');
      if (activeChild) {
        this.setWordList(activeChild);
      }
      this.setState({ activeChild, children, coins, mute, wordList: defaultWordList });
    }

    playCoinSound() {
      if (this.state.mute) return;
      this.coinSound.play();
    }

    playSuccessSound() {
      if (this.state.mute) return;
      this.successSound.play();
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
          fillWordArray={this.fillWordArray}
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
