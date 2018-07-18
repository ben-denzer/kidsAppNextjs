import React, { Component } from 'react';
import MainLayout from '../components/MainLayout';
import OnlineGameWrapper from '../components/OnlineGameWrapper';
import shuffle from '../utils/shuffle';
import { getFromStorage, setInStorage } from '../utils/mswLocalStorage';
import MemoryPage from '../components/Memory/MemoryPage';
import MemoryPageText from '../components/Memory/MemoryPageText';
import MemoryStartScreen from '../components/Memory/MemoryStartScreen';

class MemoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardList: [],
      cardBack: 1,
      gameSize: [4, 3],
      gameOver: true,
      optionsOpen: true,
      score: 0
    };

    const boundFunctions = [
      'cardChange',
      'flipCard',
      'gameOver',
      'openOptions',
      'setupCards',
      'sizeChange'
    ];

    boundFunctions.forEach(a => (this[a] = this[a].bind(this)));
  }

  componentDidMount() {
    const gameSize = getFromStorage('memoryGameSize') || [4, 3];
    const cardBack = getFromStorage('memoryCardBack') || 1;
    this.setState({ cardBack, gameSize });
  }

  cardChange(e) {
    if (e.target.dataset.cardid) {
      const cardBack = e.target.dataset.cardid.slice(-1);
      this.setState({ cardBack });
      setInStorage('memoryCardBack', cardBack);
    }
  }

  checkForMatch(cards) {
    let finalCards;
    const flippedCards = cards.filter(a => a.status === 'faceUp' && a);

    if (flippedCards[0].word === flippedCards[1].word) {
      const matchedIds = flippedCards.map(a => a.cardId);
      finalCards = cards.map(a => {
        if (matchedIds.indexOf(a.cardId) !== -1) {
          return Object.assign({}, a, { status: 'hidden' });
        }
        return a;
      });

      // check for winner
      const hiddenCards = finalCards.filter(a => a.status === 'hidden' && a);
      if (hiddenCards.length === cards.length) {
        setTimeout(this.gameOver, 300);
      } else {
        this.props.sayLetters(flippedCards[0].word);
      }
    } else {
      finalCards = cards.map(a => {
        if (a.status === 'faceUp') {
          return Object.assign({}, a, { status: 'faceDown' });
        }
        return a;
      });
    }
    this.setState({ cardList: cards });
    setTimeout(() => {
      this.setState({ cardList: finalCards });
    }, 2500);
  }

  flipCard(e) {
    // early return if there are already 2 cards filpped
    const cards = this.state.cardList.slice(0);
    const flippedCards = cards.filter(a => a.status === 'faceUp' && a);
    if (flippedCards.length > 1) return;

    const cardToFlip = cards[e.target.dataset.cardid];

    // early return if already hidden
    if (!cardToFlip || cardToFlip.status === 'hidden') return;

    cardToFlip.status = 'faceUp';
    flippedCards.push(cardToFlip);

    if (flippedCards.length === 2) {
      this.checkForMatch(cards);
    } else {
      this.setState({ cardList: cards });
    }
  }

  gameOver() {
    this.props.addCoin();
    setTimeout(() => {
      this.setState({ gameOver: true });
    }, 5000);
  }

  setupCards() {
    const { gameSize } = this.state;
    const { fillWordArray, wordList } = this.props;
    const numberOfWords = (gameSize[0] * gameSize[1]) / 2;
    const allWords = fillWordArray(wordList, numberOfWords);
    const words = shuffle(allWords).slice(0, numberOfWords);
    const cardList = shuffle([...words, ...words]).map((a, i) => ({
      cardId: i,
      word: a,
      status: 'faceDown'
    }));
    this.setState({
      cardList,
      numberOfWords,
      gameOver: false,
      optionsOpen: false
    });
  }

  sizeChange(gameSize) {
    this.setState({ gameSize });
    setInStorage('memoryGameSize', gameSize);
  }

  openOptions() {
    this.setState({ gameOver: true, optionsOpen: true });
  }

  render() {
    const { cardBack, gameOver, gameSize, optionsOpen } = this.state;
    if (gameOver) {
      return (
        <div className="whiteBox">
          <MemoryStartScreen
            cardBack={cardBack}
            cardChange={this.cardChange}
            gameSize={gameSize}
            openOptions={this.openOptions}
            optionsOpen={optionsOpen}
            setupCards={this.setupCards}
            sizeChange={this.sizeChange}
          />
        </div>
      );
    }

    return (
      <div className="whiteBox">
        <MemoryPage
          flipCard={this.flipCard}
          openOptions={this.openOptions}
          {...this.props}
          {...this.state}
        />
      </div>
    );
  }
}

export default MainLayout(OnlineGameWrapper(MemoryContainer), MemoryPageText);
