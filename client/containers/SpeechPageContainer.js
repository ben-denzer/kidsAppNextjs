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
      score: 0,
      showPrize: false,
      wordList: []
    };
    this.listen = this.listen.bind(this);
  }

  componentDidMount() {
    const coins = window.localStorage.getItem('coins');
    this.setupSpeachRecognition();
    this.setState({ wordList: defaultWordList });
    this.listen();
  }

  componentWillUnmount() {
    this.recognition.stop();
  }

  addCoin() {
    this.setState({ showPrize: true });
    const coins = this.state.coins + 1;
    setTimeout(() => this.setState({ coins, showPrize: false }), 3000);
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
    if (newScore % 5 === 0) this.addCoin();

    const nextIndex = this.getNextIndex();
    this.setState({
      currentWordIndex: nextIndex,
      score: newScore
    });
  }

  getNextIndex() {
    const newWordIndex = this.state.currentWordIndex + 1;
    return newWordIndex < this.state.wordList.length ? newWordIndex : 0;
  }

  listen() {
    this.recognition.start();
    this.recognition.onresult = res => this.checkResponse(res);
    this.recognition.onend = () => this.listen();
    this.recognition.onerror = e => console.log(e.error);
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

  render() {
    return <SpeechPage listen={this.listen} {...this.state} {...this.props} />;
  }
}

export default MainLayout(SpeachPageContainer);
