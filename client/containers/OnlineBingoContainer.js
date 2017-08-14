import React, { Component } from 'react';
import defaultWords from '../config/defaultSightWords';
import shuffle from '../utils/shuffle';

export default class OnlineBingoContainer extends Component {
  constructor() {
    super();

    this.state = {
      activeWords: {},
      allWords: [],
      currentIndex: 0,
      delay: 3,
      paused: false,
      size: 5,
      wonGame: false
    };

    this.handleCheck = this.handleCheck.bind(this);
    this.makeBoard = this.makeBoard.bind(this);
    this.nextWord = this.nextWord.bind(this);
    this.noWinner = this.noWinner.bind(this);
    this.pauseGame = this.pauseGame.bind(this);
  }

  componentDidMount() {
    this.setState({ allWords: defaultWords });
    this.makeBoard(defaultWords);
  }

  handleCheck(e) {
    const { activeWords } = this.state;
    const { word, x, y } = e.target.dataset;
    if (!word) return;
    if (activeWords[word].checked) return;
    // if (allWords.indexOf(word) > currentIndex) return;
  }

  makeBoard(allWords) {
    const { size } = this.state;
    const tempWords = shuffle(allWords.slice(0));
    const middle = Math.floor(size / 2);

    const activeWords = {};
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (x === middle && y === middle) {
          activeWords['free space'] = { x, y, checked: true };
          continue;
        }
        activeWords[tempWords.shift()] = { x, y, checked: false };
      }
    }
    this.setState({ activeWords });
  }

  nextWord() {
    const nextIndex = this.state.currentIndex + 1;
    if (nextIndex < this.state.allWords.length) {
      this.setState({ currentIndex: nextIndex });
    } else {
      this.noWinner();
    }
  }

  noWinner() {
    alert('no winner');
  }

  pauseGame() {
    this.setState({ paused: !this.state.paused });
  }

  render() {
    return (
      <div>
        <h1>Bingo</h1>
      </div>
    );
  }
}
