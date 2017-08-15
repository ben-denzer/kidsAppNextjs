import React, { Component } from 'react';
import defaultWords from '../config/defaultSightWords';
import shuffle from '../utils/shuffle';
import checkBingoCard from '../utils/checkBingoCard';
import OnlineBingoPage from '../components/OnlineBingo/OnlineBingoPage';

export default class OnlineBingoContainer extends Component {
  constructor() {
    super();

    this.state = {
      activeWords: [],
      allWords: [],
      currentIndex: 0,
      delay: 7,
      paused: false,
      size: 3,
      wonGame: false
    };

    this.handleCheck = this.handleCheck.bind(this);
    this.makeBoard = this.makeBoard.bind(this);
    this.nextWord = this.nextWord.bind(this);
    this.noWinner = this.noWinner.bind(this);
    this.pauseGame = this.pauseGame.bind(this);
    this.startGame = this.startGame.bind(this);

    this.gameTimer = null;
  }

  componentDidMount() {
    this.setState({ allWords: defaultWords });
    this.makeBoard(defaultWords);
    this.startGame();
  }

  handleCheck(e) {
    console.log('clicked');
    const { allWords, activeWords, currentIndex } = this.state;
    const { word, x, y } = e.target.dataset;
    if (!word) return;
    if (allWords.indexOf(word) > currentIndex) return;
    const tempActiveWords = activeWords.map(a => {
      return a.map(b => {
        if (b.word === word) {
          return Object.assign({}, b, { checked: true });
        }
        return b;
      });
    });

    checkBingoCard(x, y, tempActiveWords, this.state.size)
      .then(wonGame => {
        this.setState({ activeWords: tempActiveWords, wonGame });
      })
      .catch(err => console.log('error in checkBingoCard', err));
  }

  makeBoard(allWords) {
    const { size } = this.state;
    const tempWords = shuffle(allWords.slice(0));
    const middle = Math.floor(size / 2);

    const activeWords = [];
    for (let y = 0; y < size; y++) {
      let tempArray = [];
      for (let x = 0; x < size; x++) {
        if (x === middle && y === middle) {
          tempArray.push({ x, y, word: 'free space', checked: true });
          continue;
        }
        tempArray.push({ x, y, word: tempWords.shift(), checked: false });
      }
      activeWords.push(tempArray);
    }
    this.setState({ activeWords });
  }

  nextWord() {
    const nextIndex = this.state.currentIndex + 1;
    if (nextIndex < this.state.allWords.length) {
      this.setState({ currentIndex: nextIndex });
    } else {
      clearInterval(this.gameTimer);
      this.noWinner();
    }
  }

  noWinner() {
    alert('no winner');
  }

  pauseGame() {
    clearInterval(this.gameTimer);
    this.setState({ paused: !this.state.paused });
  }

  startGame() {
    this.gameTimer = setInterval(() => {
      this.setState({ currentIndex: this.state.currentIndex + 1 });
    }, this.state.delay * 1000);
  }

  render() {
    return (
      <div>
        <OnlineBingoPage
          {...this.state}
          {...this.props}
          handleCheck={this.handleCheck}
          makeBoard={this.makeBoard}
          nextWord={this.nextWord}
          noWinner={this.noWinner}
          pauseGame={this.pauseGame}
        />
      </div>
    );
  }
}
