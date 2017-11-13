import React, { Component } from 'react';
import shuffle from '../utils/shuffle';
import defaultWordList from '../config/defaultSightWords';
import FishingPage from '../components/Fishing/FishingPage';

export default class FishingContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coins: 0,
      currentIndex: null,
      fishOnBoard: [],
      mute: false,
      showPrize: false,
      spinnerClassName: 'hide',
      winCount: 0,
      wordList: [],
    };

    this.addCoin = this.addCoin.bind(this);
    this.addFish = this.addFish.bind(this);
    this.handleUserChoice = this.handleUserChoice.bind(this);
    this.setupBoard = this.setupBoard.bind(this);
    this.toggleSound = this.toggleSound.bind(this);
  }

  componentDidMount() {
    const coins = window.localStorage.getItem('coins') || 0;
    this.setState({ coins, wordList: defaultWordList }, () => { this.setupBoard() });
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

  addFish() {
    const { fishOnBoard, wordList } = this.state;
    if (fishOnBoard.length >= 3) return;
    const wordIndex = Math.floor(Math.random() * wordList.length);
    if (fishOnBoard.indexOf(wordList[wordIndex]) === -1) {
      this.setState({ fishOnBoard: [ ...fishOnBoard, wordList[wordIndex] ] }, () => this.addFish());
    } else {
      this.addFish();
    }
  }

  handleUserChoice(e) {
    const { currentIndex, fishOnBoard, winCount } = this.state;
    const target = e.target;    
    if (target.innerText === fishOnBoard[currentIndex]) {
      this.setState({ winCount: winCount + 1 });
      target.classList.add('caught');
      setTimeout(() => target.classList.add('reeling'), 700);
      if ((winCount + 1) % 5 === 0) {
        setTimeout(this.addCoin, 2500);
        setTimeout(this.setupBoard, 5500);
      } else {
        setTimeout(this.setupBoard, 2500);
      }
    } else {
      target.classList.add('incorrect');
      setTimeout(() => target.classList.remove('incorrect'), 500);
    }
  }

  setupBoard() {
    const currentIndex = Math.floor(Math.random() * 3);
    this.setState({ currentIndex, fishOnBoard: [] }, () => {
      this.addFish();
    });
  }

  toggleSound() {
    this.setState({ mute: !this.state.mute });
  }

  render() {
    return (
      <div className="whiteBox">
        <FishingPage
          {...this.props}
          {...this.state}
          handleUserChoice={this.handleUserChoice}
          toggleSound={this.toggleSound}
        />
        <audio
          type="audio/mp3"
          src="/static/media/shootingStar.mp3"
          ref={correctSound => {
            this.correctSound = correctSound;
          }}
        />
        <audio
          type="audio/mp3"
          src="/static/media/cheer.mp3"
          ref={coinSound => {
            this.coinSound = coinSound;
          }}
        />
      </div>
    );
  }
}

