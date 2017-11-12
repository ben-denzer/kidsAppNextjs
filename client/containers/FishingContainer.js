import React, { Component } from 'react';
import shuffle from '../utils/shuffle';
import defaultWordList from '../config/defaultSightWords';
import FishingPage from '../components/Fishing/FishingPage';

export default class FishingContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wordList: [],
      currentIndex: null,
      fishOnBoard: []
    };

    this.addFish = this.addFish.bind(this);
    this.handleUserChoice = this.handleUserChoice.bind(this);
    this.setupBoard = this.setupBoard.bind(this);
  }

  componentDidMount() {
    this.setState({ wordList: defaultWordList }, () => { this.setupBoard() });
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
    const { currentIndex, fishOnBoard } = this.state;
    const target = e.target;    
    if (target.innerText === fishOnBoard[currentIndex]) {
      target.classList.add('caught');
      setTimeout(() => target.classList.add('reeling'), 700);
      setTimeout(this.setupBoard, 2500);
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

  success(target) {

  }

  render() {
    return (
      <div className="whiteBox">
        <FishingPage
          {...this.props}
          {...this.state}
          handleUserChoice={this.handleUserChoice}
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

