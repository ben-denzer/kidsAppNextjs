import React, { Component } from 'react';
import MainLayout from '../components/MainLayout';
import OnlineGameWrapper from '../components/OnlineGameWrapper';
import shuffle from '../utils/shuffle';
import FishingPage from '../components/Fishing/FishingPage';

class FishingContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: null,
      fishOnBoard: [],
      winCount: 0,
    };

    this.addFish = this.addFish.bind(this);
    this.handleUserChoice = this.handleUserChoice.bind(this);
    this.setupBoard = this.setupBoard.bind(this);
  }

  componentDidMount() {
    this.setupBoard();
  }

  addFish() {
    const { fishOnBoard } = this.state;
    const { wordList } = this.props;
    if (fishOnBoard.length >= 3) return;
    const wordIndex = Math.floor(Math.random() * wordList.length);
    if (fishOnBoard.indexOf(wordList[wordIndex]) === -1) {
      this.setState({ fishOnBoard: [ ...fishOnBoard, wordList[wordIndex] ] }, () => this.addFish());
    } else {
      this.addFish();
    }
  }

  handleUserChoice(e) {
    const { currentIndex, fishOnBoard, winCount } = this.state;
    const target = e.target;
    if (target.innerText === fishOnBoard[currentIndex]) {
      this.setState({ winCount: winCount + 1 });
      target.classList.add('caught');
      this.props.playSuccessSound();
      setTimeout(() => target.classList.add('reeling'), 700);
      if ((winCount + 1) % 5 === 0) {
        setTimeout(this.props.addCoin, 2500);
        setTimeout(this.setupBoard, 5500);
      } else {
        setTimeout(this.setupBoard, 2500);
      }
    } else {
      target.classList.add('incorrect');
      setTimeout(() => target.classList.remove('incorrect'), 500);
    }
  }

  setupBoard() {
    const currentIndex = Math.floor(Math.random() * 3);
    this.setState({ currentIndex, fishOnBoard: [] }, () => {
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
