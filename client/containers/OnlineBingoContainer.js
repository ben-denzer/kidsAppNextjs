import React, { Component } from 'react';
import OnlineGameWrapper from '../components/OnlineGameWrapper';
import shuffle from '../utils/shuffle';
import { getFromStorage, setInStorage } from '../utils/mswLocalStorage';
import checkBingoCard from '../utils/checkBingoCard';
import OnlineBingoPage from '../components/OnlineBingo/OnlineBingoPage';
import OnlineBingoStartScreen from '../components/OnlineBingo/OnlineBingoStartScreen';

class OnlineBingoContainer extends Component {
  constructor() {
    super();

    this.state = {
      activeWords: [],
      allWords: [],
      currentIndex: 0,
      delay: 15,
      gameOver: true,
      modalOpen: false,
      optionsOpen: true,
      paused: false,
      score: 0,
      size: 5,
      wonGame: false
    };

    const boundFunctions = [
      'delayChange',
      'handleCheck',
      'gameOver',
      'noWinner',
      'openOptions',
      'pauseGame',
      'sayWord',
      // 'setupSpeech',
      'sizeChange',
      'startGame',
    ];
    boundFunctions.forEach(a => this[a] = this[a].bind(this));

    this.gameTimer = null;
    this.synth;
    this.voices;
  }

  componentDidMount() {
    if (this.props.wordList.length) {
      this.makeBoard();
    }
    const size = getFromStorage('bingoSize') || 5;
    const delay = getFromStorage('bingoDelay') || 15;
    this.setState({ delay, size });
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.wordList.length && nextProps.wordList.length) {
      this.makeBoard(nextProps.wordList);
    }
  }

  componentWillUnmount() {
    if (this.gameTimer) {
      clearTimeout(this.gameTimer);
      this.gameTimer = null;
    }
  }

  delayChange(newVal) {
    this.setState({ delay: newVal });
    setInStorage('bingoDelay', newVal);
  }

  gameOver() {
    this.props.addCoin();
    setTimeout(() => {
      this.setState({ gameOver: true });
    }, 5000);
  }

  handleCheck(e) {
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
        if (wonGame) {
          clearInterval(this.gameTimer);
          this.gameOver();
        }
        this.setState({ activeWords: tempActiveWords });
      })
      .catch(err => console.log('error in checkBingoCard', err));
  }

  makeBoard(allWords = this.props.wordList) {
    const { size } = this.state;
    const shuffledWords = shuffle([...allWords]);
    const wordCount = (size * size) + size; // size + 1 words won't match the board (free space is the +1)
    console.log(wordCount);
    const gameWords = shuffledWords.slice(0, wordCount);
    const tempWords = shuffle([...gameWords]);
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
    this.setState({ activeWords, allWords: gameWords });
  }

  noWinner() {
    alert('no winner');
  }

  openOptions() {
    this.setState({ gameOver: true, optionsOpen: true });
  }

  pauseGame() {
    if (this.state.paused) {
      this.gameTimer = setInterval(() => {
        this.setState({ currentIndex: this.state.currentIndex + 1 });
        this.sayWord(this.state.allWords[this.state.currentIndex + 1]);
      }, this.state.delay * 1000);
    } else {
      clearInterval(this.gameTimer);
    }
    this.setState({ paused: !this.state.paused });
  }

  sayWord(word) {
    this.props.playSuccessSound();
    if (!this.synth) return;
  }

  sizeChange(newSize) {
    if (newSize === this.state.size) return;
    this.setState({ size: newSize });
    setInStorage('bingoSize', newSize);
  }

  startGame() {
    this.props.playSuccessSound();
    this.setState({
      currentIndex: 0,
      gameOver: false,
      optionsOpen: false
    });

    this.makeBoard();
    if (this.gameTimer) {
      clearInterval(this.gameTimer);
    }
    this.gameTimer = setInterval(() => {
      this.setState({ currentIndex: this.state.currentIndex + 1 });
      this.sayWord(this.state.allWords[this.state.currentIndex + 1]);
    }, this.state.delay * 1000);
  }

  // setupSpeech() {
  //   console.log('setupSpeech called');
  //   const synth = window.speechSynthesis;
  //   if (typeof window.speechSynthesis === 'undefined') {
  //     console.log('it is undefined');
  //     return;
  //   }

  //   const voices = synth.getVoices();
  //   console.log('voices', voices);

  //   for (let i = 0; i < voices.length; i++) {
  //     console.log(voices[i].name + ' (' + voices[i].lang + ')');

  //     if (voices[i].default) {
  //       console.log(' -- DEFAULT');
  //     }
  //   }
  // }

  render() {
    if (this.state.gameOver) {
      const { delay, optionsOpen, size } = this.state;
      return (
        <div className="whiteBox">
          <OnlineBingoStartScreen
            delay={delay}
            delayChange={this.delayChange}
            openOptions={this.openOptions}
            optionsOpen={optionsOpen}
            size={size}
            sizeChange={this.sizeChange}
            startGame={this.startGame}
          />
        </div>
      );
    }

    return (
      <div className="whiteBox">
        <OnlineBingoPage
          handleCheck={this.handleCheck}
          openOptions={this.openOptions}
          toggleSound={this.toggleSound}
          noWinner={this.noWinner}
          pauseGame={this.pauseGame}
          {...this.state}
          {...this.props}
        />
      </div>
    );
  }
}

export default OnlineGameWrapper(OnlineBingoContainer);
