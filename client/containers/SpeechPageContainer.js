import React, { Component } from 'react';
import MainLayout from '../components/MainLayout';
import SpeechPage from '../components/SpeechPage';
import defaultWordList from '../config/defaultSightWords';

class SpeachPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: 0,
      currentWordIndex: 0,
      helpOpen: false,
      mute: false,
      score: 0,
      showPrize: false,
      skippedInARow: 0,
      spinnerClassName: 'hide',
      wordList: []
    };
    this.listen = this.listen.bind(this);
    this.skipWord = this.skipWord.bind(this);
    this.toggleHelp = this.toggleHelp.bind(this);
    this.toggleSound = this.toggleSound.bind(this);
  }

  componentDidMount() {
    const coins = window.localStorage.getItem('coins');
    this.setupSpeachRecognition();
    this.setState({ wordList: defaultWordList });
    this.listen();
  }

  componentWillUnmount() {
    if (this.recognition) {
      this.recognition.stop();
    }
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

  checkResponse(res) {
    const { currentWordIndex, wordList } = this.state;
    if (res && res.results && res.results.length) {
      const responseList = res.results[0];
      if (responseList.length) {
        for (let i = 0; i < responseList.length; i++) {
          const words = responseList[i].transcript.split(' ');
          if (words.length) {
            for (let j = 0; j < words.length; j++) {
              if (wordList[currentWordIndex] === words[j]) {
                this.correctAnswer();
                return;
              }
            }
          }
        }
      }
    }
  }

  correctAnswer() {
    const { coins, score } = this.state;
    const newScore = score + 1;
    const nextIndex = this.getNextIndex();

    let sound = this.correctSound;
    if (newScore % 5 === 0) {
      this.addCoin();
      sound = this.coinSound;
    }

    if (!this.state.mute) {
      sound.play();
    }

    this.setState({
      currentWordIndex: nextIndex,
      score: newScore,
      skippedInARow: 0
    });
  }

  getNextIndex() {
    const newWordIndex = this.state.currentWordIndex + 1;
    return newWordIndex < this.state.wordList.length ? newWordIndex : 0;
  }

  listen() {
    if (this.recognition) {
      this.recognition.start();
      this.recognition.onresult = res => this.checkResponse(res);
      this.recognition.onend = () => this.listen();
      this.recognition.onerror = e => {
        console.log(e.error);
      };
    } else {
      console.log('need to show warning'); // TODO
    }
  }

  setupSpeachRecognition() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList =
      window.SpeechGrammarList || window.webkitSpeechGrammarList;
    const SpeechRecognitionEvent =
      window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 15;

    const words = this.state.wordList;
    const grammar = `#JSGF V1.0; grammar words; public <words> = ${words.join(' | ')} ;`;
    this.speechRecognitionList = new SpeechGrammarList();
    this.speechRecognitionList.addFromString(grammar, 1);
  }

  skipWord() {
    const { currentWordIndex, skippedInARow } = this.state;
    this.setState({
      currentWordIndex: currentWordIndex + 1,
      skippedInARow: skippedInARow + 1
    });
  }

  toggleHelp() {
    this.setState({ helpOpen: !this.state.helpOpen });
  }

  toggleSound() {
    this.setState({ mute: !this.state.mute });
  }

  render() {
    return (
      <div>
        <SpeechPage
          listen={this.listen}
          skipWord={this.skipWord}
          toggleHelp={this.toggleHelp}
          toggleSound={this.toggleSound}
          {...this.state}
          {...this.props}
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

export default SpeachPageContainer;
