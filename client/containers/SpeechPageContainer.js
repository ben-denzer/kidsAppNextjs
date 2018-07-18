import React, { Component } from 'react';
import MainLayout from '../components/MainLayout';
import OnlineGameWrapper from '../components/OnlineGameWrapper';
import SpeechPage from '../components/Speech/SpeechPage';
import shuffle from '../utils/shuffle';
import successPhrases from '../config/successPhrases';

class SpeachPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWordIndex: 0,
      error: '',
      score: 0,
      skippedInARow: 0,
      shuffledWords: []
    };

    this.displayError = this.displayError.bind(this);
    this.init = this.init.bind(this);
    this.listen = this.listen.bind(this);
    this.skipWord = this.skipWord.bind(this);
  }

  componentDidMount() {
    if (this.props.wordList.length) {
      this.init(this.props.wordList);
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.wordList.length && this.props.wordList.length) {
      this.init(this.props.wordList);
    }
  }

  componentWillUnmount() {
    if (this.recognition) {
      this.recognition.abort();
    }
  }

  checkResponse(res) {
    const { currentWordIndex, shuffledWords } = this.state;
    if (res && res.results && res.results.length) {
      const responseList = res.results[0];
      if (responseList.length) {
        for (let i = 0; i < responseList.length; i++) {
          const words = responseList[i].transcript.split(' ');
          if (words.length) {
            for (let j = 0; j < words.length; j++) {
              if (shuffledWords[currentWordIndex] === words[j]) {
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
      const index = Math.floor(Math.random() * successPhrases.length);
      const phrase = successPhrases[index];
      this.props.sayWord(phrase);
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
    const { currentWordIndex, shuffledWords } = this.state;
    const newWordIndex = currentWordIndex + 1;
    if (newWordIndex < shuffledWords.length) {
      return newWordIndex;
    }
    const currentWord = shuffledWords[currentWordIndex];
    let newShuffle = [];

    do {
      // don't have the same word twice in a row
      newShuffle = shuffle(shuffledWords);
    } while (newShuffle[0] === currentWord);

    this.setState({ shuffledWords: newShuffle });
    return 0;
  }

  init(wordList) {
    const allowedWords = wordList.filter(word => word.length);
    this.setupSpeachRecognition(allowedWords);
    this.setState({ shuffledWords: shuffle([...allowedWords]) });
  }

  listen() {
    if (this.recognition) {
      this.recognition.start();
      this.recognition.onresult = res => this.checkResponse(res);
      this.recognition.onend = e => {
        this.listen();
      };
      this.recognition.onerror = e => {
        if (!/no-speech/i.test(e.error)) {
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

    const grammar = `#JSGF V1.0; grammar words; public <words> = ${wordList.join(
      ' | '
    )} ;`;
    this.speechRecognitionList = new SpeechGrammarList();
    this.speechRecognitionList.addFromString(grammar, 1);

    this.listen();
  }

  skipWord() {
    const { currentWordIndex, skippedInARow } = this.state;
    this.setState({
      currentWordIndex: this.getNextIndex(),
      skippedInARow: skippedInARow + 1
    });
  }

  render() {
    return (
      <div className="whiteBox">
        <SpeechPage
          listen={this.listen}
          skipWord={this.skipWord}
          {...this.state}
          {...this.props}
        />
      </div>
    );
  }
}

export default MainLayout(OnlineGameWrapper(SpeachPageContainer));
