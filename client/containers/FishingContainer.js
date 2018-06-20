import React, { Component } from 'react';
import MainLayout from '../components/MainLayout';
import OnlineGameWrapper from '../components/OnlineGameWrapper';
import FishingPage from '../components/Fishing/FishingPage';

class FishingContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      correctWordIndex: null,
      fishOnBoard: [],
      previousWord: null,
      winCount: 0
    };

    this.addFish = this.addFish.bind(this);
    this.handleUserChoice = this.handleUserChoice.bind(this);
    this.setupBoard = this.setupBoard.bind(this);
  }

  componentDidMount() {
    this.setupBoard();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.wordList !== this.props.wordList) {
      this.setState({ wordList: nextProps.wordList });
      this.setupBoard();
    }
  }

  addFish() {
    const { fishOnBoard, previousWord } = this.state;
    const { fillWordArray, wordList } = this.props;
    const allWords = wordList.length > 3
      ? wordList
      : fillWordArray(wordList, 3);

    if (fishOnBoard.length >= 3) {
      let correctWordIndex = this.getRandomIndex();
      while (fishOnBoard[correctWordIndex] === previousWord) {
        correctWordIndex = this.getRandomIndex();
      }
      this.setState({ correctWordIndex });
      return;
    }

    const wordIndex = Math.floor(Math.random() * allWords.length);

    if (fishOnBoard.indexOf(allWords[wordIndex]) === -1) {
      this.setState(
        { fishOnBoard: [ ...fishOnBoard, allWords[wordIndex] ] },
        () => this.addFish()
      );
    } else {
      this.addFish();
    }
  }

  getRandomIndex() {
    return Math.floor(Math.random() * 3);
  }

  handleUserChoice(e) {
    const { correctWordIndex, fishOnBoard, winCount } = this.state;
    const currentWord = fishOnBoard[correctWordIndex];
    const target = e.currentTarget;

    if (target.dataset.wordText === currentWord) {
      this.setState({ winCount: winCount + 1 });
      target.classList.add('caught');
      if (currentWord.length > 1) {
        this.props.sayWord(currentWord);
      }
      this.props.sayLetters(currentWord);
      this.setState({ previousWord: currentWord });

      setTimeout(() => target.classList.add('reeling'), 700);
      if ((winCount + 1) % 5 === 0) {
        setTimeout(this.props.addCoin, 2500);
        setTimeout(this.setupBoard, 5500);
      } else {
        setTimeout(this.setupBoard, 2500);
      }
    } else {
      target.classList.add('incorrect');
      this.props.sayWord('Try Again!');
      setTimeout(() => target.classList.remove('incorrect'), 500);
    }
  }

  setupBoard() {
    this.setState({ fishOnBoard: [] }, () => {
      this.addFish();
    });
  }

  render() {
    return (
      <div className="whiteBox fishing">
        <FishingPage
          {...this.props}
          {...this.state}
          handleUserChoice={this.handleUserChoice}
        />
      </div>
    );
  }
}

export default MainLayout(OnlineGameWrapper(FishingContainer));
