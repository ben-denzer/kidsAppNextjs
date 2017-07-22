import React, { Component } from 'react';
import defaultWordList from '../config/defaultSightWords';

class SpeachPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: 0,
      currentWordIndex: 0,
      score: 0,
      wordList: defaultWordList
    };
    this.listen = this.listen.bind(this);
  }

  componentDidMount() {
    const coins = window.localStorage.getItem('coins');
    this.setupSpeachRecognition();
  }

  componentWillUnmount() {
    this.recognition.stop();
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
    const newCoins = newScore % 5 === 0 ? coins + 1 : coins;
    const nextIndex = this.getNextIndex();
    this.setState({
      coins: newCoins,
      currentWordIndex: nextIndex,
      score: newScore
    });
  }

  getNextWord() {
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
    const { coins, currentWordIndex, score, wordList } = this.state;
    console.log(this.state);
    console.log(`coins - ${coins}, score - ${score}`);
    return (
      <div>
        <h1>{wordList[currentWordIndex]}</h1>
        <h2>{coins} Coins</h2>
        <button onClick={this.listen}>Start</button>
      </div>
    );
  }
}

export default SpeachPageContainer;
