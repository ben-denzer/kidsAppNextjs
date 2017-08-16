import React, { Component } from 'react';
import defaultWords from '../config/defaultSightWords';
import shuffle from '../utils/shuffle';
import checkBingoCard from '../utils/checkBingoCard';
import OnlineBingoPage from '../components/OnlineBingo/OnlineBingoPage';
import OnlineBingoStartScreen
  from '../components/OnlineBingo/OnlineBingoStartScreen';

export default class OnlineBingoContainer extends Component {
  constructor() {
    super();

    this.state = {
      activeWords: [],
      allWords: [],
      coins: 0,
      currentIndex: 0,
      delay: 15,
      gameOver: true,
      helpOpen: false,
      mute: false,
      optionsOpen: true,
      paused: false,
      score: 0,
      showPrize: false,
      size: 5,
      spinnerClassName: 'hide',
      wonGame: false
    };

    const boundFunctions = [
      'delayChange',
      'handleCheck',
      'makeBoard',
      'gameOver',
      'noWinner',
      'openOptions',
      'pauseGame',
      'sayWord',
      // 'setupSpeech',
      'sizeChange',
      'startGame',
      'toggleHelp',
      'toggleSound'
    ];
    boundFunctions.forEach(a => this[a] = this[a].bind(this));

    this.gameTimer = null;
    this.synth;
    this.voices;
  }

  componentDidMount() {
    this.setState({ allWords: defaultWords });
    this.makeBoard(defaultWords);
    // this.setupSpeech();
  }

  addCoin(val = this.state.size) {
    const { coins } = this.state;
    this.setState({ showPrize: true, spinnerClassName: 'show' });
    setTimeout(() => this.setState({ spinnerClassName: 'fadeOut' }), 3000);
    setTimeout(
      () =>
        this.setState({
          coins: coins + val,
          showPrize: false,
          spinnerClassName: 'hide'
        }),
      3500
    );
  }

  delayChange(e) {
    const newVal = Number(e.target.dataset.time);
    this.setState({ delay: newVal });
  }

  gameOver() {
    if (!this.state.mute) {
      this.coinSound.play();
    }
    this.addCoin();
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

  makeBoard(allWords = this.state.allWords) {
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

  noWinner() {
    alert('no winner');
  }

  openOptions() {
    this.setState({ gameOver: true, optionsOpen: true });
  }

  pauseGame() {
    clearInterval(this.gameTimer);
    this.setState({ paused: !this.state.paused });
  }

  sayWord(word) {
    if (!this.state.mute) {
      this.newWordSound.play();
    }
    if (!this.synth) return;
  }

  sizeChange(newSize) {
    if (newSize === this.state.size) return;
    this.setState({ size: newSize });
  }

  startGame() {
    this.setState({
      allWords: shuffle(this.state.allWords),
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

  toggleHelp() {
    this.setState({ helpOpen: !this.state.helpOpen });
  }

  toggleSound() {
    this.setState({ mute: !this.state.mute });
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
          makeBoard={this.makeBoard}
          toggleHelp={this.toggleHelp}
          openOptions={this.openOptions}
          toggleSound={this.toggleSound}
          noWinner={this.noWinner}
          pauseGame={this.pauseGame}
          {...this.state}
          {...this.props}
        />
        <audio
          type="audio/mp3"
          src="/static/media/shootingStar.mp3"
          ref={newWordSound => {
            this.newWordSound = newWordSound;
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
