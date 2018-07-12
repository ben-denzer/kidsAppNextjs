import React, { Component } from 'react';
import defaultWordList from '../config/defaultSightWords';
import { getFromStorage, setInStorage } from '../utils/mswLocalStorage';
import { addTempCoin, getTempCoins } from '../utils/tempUser';
import getCoinsFromServer from '../api/getCoinsFromServer';
import getWordsForChild from '../api/getWordsForChild';
import makeAddCoinRequest from '../api/makeAddCoinRequest';

const OnlineGameWrapper = WrappedComponent => {
  return class extends Component {
    constructor(props) {
      super(props);

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
      };

      this.addCoin = this.addCoin.bind(this);
      this.fillWordArray = this.fillWordArray.bind(this);
      this.playCoinSound = this.playCoinSound.bind(this);
      this.playSuccessSound = this.playSuccessSound.bind(this);
      this.sayLetters = this.sayLetters.bind(this);
      this.sayWord = this.sayWord.bind(this);
      this.toggleHelp = this.toggleHelp.bind(this);
      this.toggleSound = this.toggleSound.bind(this);
      this.updateCoinsForActiveChild = this.updateCoinsForActiveChild.bind(
        this
      );
    }

    componentDidMount() {
      this.init();
    }

    addCoin() {
      const { activeChild, children, coins } = this.state;
      const newCoins = Number(coins) + 1;
      this.addCoinUi(newCoins);

      if (!activeChild) {
        addTempCoin();
        return;
      }

      this.updateCoinsForActiveChild(children, activeChild, newCoins);
      makeAddCoinRequest({ childId: activeChild, coins: newCoins }).catch(() =>
        this.setState({ apiError: 'Connection Error' })
      );
    }

    addCoinUi(newCoins) {
      if (!/fishing/.test(window.location.pathname)) {
        this.playCoinSound();
      }
      this.setState({ showPrize: true, spinnerClassName: 'show' });
      setTimeout(() => this.setState({ spinnerClassName: 'fadeOut' }), 3000);
      setTimeout(
        () =>
          this.setState({
            coins: newCoins,
            showPrize: false,
            spinnerClassName: 'hide'
          }),
        3500
      );
    }

    fillWordArray(words, totalNeeded) {
      if (words.length < totalNeeded) {
        let extraWords = defaultWordList.slice(0);
        while (words.length < totalNeeded) {
          let nextWord = extraWords.pop();
          if (
            words.map(a => a.toLowerCase()).indexOf(nextWord.toLowerCase()) ===
            -1
          ) {
            words = [ ...words, nextWord ];
          }

          if (!extraWords.length) {
            return words;
          }
        }
      }
      return words;
    }

    async getInitialCoins(activeChild, children) {
      if (!activeChild || !children.length) {
        return getTempCoins();
      }
      try {
        const coins = await getCoinsFromServer(activeChild.child_id);
        this.updateCoinsForActiveChild(children, activeChild, coins);
        return coins;
      } catch (e) {
        console.log(e);
        let coins = 0;
        for (let child of children) {
          if (Number(child.child_id) === Number(activeChild)) {
            coins = child.coins;
          }
        }
        this.updateCoinsForActiveChild(children, activeChild, coins);
        return coins;
      }
    }

    sayLetters(word, original = word) {
      if (this.state.mute) {
        return;
      }
      const letter = word[0];
      const restOfWord = word.slice(1);
      this.sayWord(letter);
      setTimeout(() => {
        if (restOfWord.length) {
          this.sayLetters(restOfWord, original);
        } else if (original.length > 1) {
          this.sayWord(original);
        }
      }, 300);
    }

    sayWord(word) {
      if (this.state.mute) {
        return;
      }
      const utterance = new SpeechSynthesisUtterance(word);
      window.speechSynthesis.speak(utterance);
    }

    async setWordList(childId) {
      if (!childId) {
        this.setState({ wordList: defaultWordList });
        return;
      }

      try {
        const words = await getWordsForChild({ childId });
        if (!words || !words.length) {
          this.setState({ wordList: defaultWordList });
          return;
        }
        const wordList = words.map(a => a.word_text);
        this.setState({ wordList: this.fillWordArray(wordList, 10) });
      } catch (e) {
        this.setState({ wordList: defaultWordList });
      }
    }

    init() {
      const activeChild = getFromStorage('activeChild') || null;
      const children = getFromStorage('children') || [];
      const coins = this.getInitialCoins(activeChild, children);
      const mute = getFromStorage('mute');
      this.setWordList(activeChild);
      this.setState({ activeChild, children, coins, mute });
    }

    updateCoinsForActiveChild(children, activeChild, coins) {
      console.log('in update', coins);
      const updatedChildren = children.map(a => {
        if (Number(a.child_id) === Number(activeChild)) {
          return Object.assign({}, a, { coins });
        }
        return a;
      });
      this.setState({ children: updatedChildren });
      setInStorage('children', updatedChildren);
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
          sayLetters={this.sayLetters}
          sayWord={this.sayWord}
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
  };
};

export default OnlineGameWrapper;
