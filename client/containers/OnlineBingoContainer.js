import React, { Component } from 'react';
import defaultWords from '../config/defaultSightWords';
import shuffle from '../utils/shuffle';
import OnlineBingoPage from '../components/OnlineBingo/OnlineBingoPage';

export default class OnlineBingoContainer extends Component {
  constructor() {
    super();

    this.state = {
      activeWords: [],
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
    console.log('clicked');
    const { activeWords, currentIndex } = this.state;
    const tempActiveWords = activeWords.slice(0);
    const { word, x, y } = e.target.dataset;
    if (!word) return;
    // if (allWords.indexOf(word) > currentIndex) return;
    for (let i of activeWords) {
      for (let j of i) {
        if (j.word === word) {
          j.checked = true;
          break;
        }
      }
    }
    this.setState({ activeWords: tempActiveWords });
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
