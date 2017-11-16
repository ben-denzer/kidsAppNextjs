import React, { Component } from 'react';
import OnlineGameWrapper from '../components/OnlineGameWrapper';
import SpeechPage from '../components/Speech/SpeechPage';
import defaultWordList from '../config/defaultSightWords';

class SpeachPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWordIndex: 0,
      error: '',
      helpOpen: false,
      score: 0,
      skippedInARow: 0,
    };

    this.displayError = this.displayError.bind(this);
    this.listen = this.listen.bind(this);
    this.skipWord = this.skipWord.bind(this);
    this.toggleHelp = this.toggleHelp.bind(this);
  }

  componentDidMount() {
    if (this.props.wordList.length) {
      this.setupSpeachRecognition();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.wordList.length && nextProps.wordList.length) {
      this.setupSpeachRecognition(nextProps.wordList);
    }
  }

  componentWillUnmount() {
    if (this.recognition) {
      this.recognition.abort();
    }
  }

  checkResponse(res) {
    const { currentWordIndex } = this.state;
    const { wordList } = this.props;
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
    const { score } = this.state;
    const newScore = score + 1;
    const nextIndex = this.getNextIndex();

    if (newScore % 3 === 0) {
      this.props.addCoin();
    } else {
      this.props.playSuccessSound();
    }

    this.setState({
      currentWordIndex: nextIndex,
      score: newScore,
      skippedInARow: 0
    });
  }

  displayError(
    err = "Sorry, this browser doesn't support speech recognition. Please try again with Google Chrome. (If you are on an IPhone, switching browsers won't help.)"
  ) {
    this.setState({ error: err });
  }

  getNextIndex() {
    const newWordIndex = this.state.currentWordIndex + 1;
    return newWordIndex < this.props.wordList.length ? newWordIndex : 0;
  }

  listen() {
    if (this.recognition) {
      this.recognition.start();
      this.recognition.onresult = res => this.checkResponse(res);
      this.recognition.onend = e => {
        console.log('end event', e);
        this.listen();
      };
      this.recognition.onerror = e => {
        if (!/no-speech/i.test(e.error)) {
          console.log('speech error', e);
          this.recognition = null;
        }
      };
    } else {
      this.displayError();
    }
  }

  setupSpeachRecognition(wordList = this.props.wordList) {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      this.displayError();
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
    const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 15;

    const grammar = `#JSGF V1.0; grammar words; public <words> = ${wordList.join(' | ')} ;`;
    this.speechRecognitionList = new SpeechGrammarList();
    this.speechRecognitionList.addFromString(grammar, 1);

    this.listen();
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

  render() {
    return (
      <div className="whiteBox">
        <SpeechPage
          listen={this.listen}
          skipWord={this.skipWord}
          toggleHelp={this.toggleHelp}
          {...this.state}
          {...this.props}
        />
      </div>
    );
  }
}

export default OnlineGameWrapper(SpeachPageContainer);
