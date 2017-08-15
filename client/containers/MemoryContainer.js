import React, { Component } from 'react';
import shuffle from '../utils/shuffle';
import defaultWordList from '../config/defaultSightWords';
import MemoryPage from '../components/Memory/MemoryPage';
import MemoryStartScreen from '../components/Memory/MemoryStartScreen';

export default class MemoryPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardList: [],
      cardBack: 3,
      coins: 0,
      gameSize: [4, 3],
      gameOver: true,
      helpOpen: false,
      mute: false,
      optionsOpen: true,
      score: 0,
      showPrize: false,
      spinnerClassName: 'hide',
      wordList: []
    };

    const boundFunctions = [
      'cardChange',
      'flipCard',
      'gameOver',
      'getFromLocalStorage',
      'openOptions',
      'setupCards',
      'sizeChange',
      'toggleHelp',
      'toggleSound'
    ];

    boundFunctions.forEach(a => this[a] = this[a].bind(this));
  }

  componentDidMount() {
    const coins = window.localStorage.getItem('coins');
    this.setState({ wordList: defaultWordList });
    this.getFromLocalStorage();
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

  cardChange(e) {
    if (e.target.dataset.cardid) {
      const cardBack = e.target.dataset.cardid.slice(-1);
      this.setState({ cardBack });
      window.localStorage.setItem('memoryCardBack', cardBack);
    }
  }

  checkForMatch(cards) {
    let finalCards;
    let gameOver = false;
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
        if (!this.state.mute) {
          this.correctSound.play();
        }
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
    if (!this.state.mute) {
      this.coinSound.play();
    }
    this.addCoin();
    setTimeout(() => {
      this.setState({ gameOver: true });
    }, 5000);
  }

  getFromLocalStorage() {
    const size = window.localStorage.getItem('memoryGameSize');
    if (size) this.setState({ gameSize: JSON.parse(size) });
    const cardBack = window.localStorage.getItem('memoryCardBack');
    if (cardBack) this.setState({ cardBack });
  }

  setupCards() {
    const { gameSize, wordList } = this.state;
    const numberOfWords = gameSize[0] * gameSize[1] / 2;
    const words = shuffle(wordList).slice(0, numberOfWords);
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
    window.localStorage.setItem('memoryGameSize', JSON.stringify(gameSize));
  }

  toggleHelp() {
    this.setState({ helpOpen: !this.state.helpOpen });
  }

  openOptions() {
    this.setState({ gameOver: true, optionsOpen: true });
  }

  toggleSound() {
    this.setState({ mute: !this.state.mute });
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
            openOptions={this.openOptions}
          />
        </div>
      );
    }

    return (
      <div className="whiteBox">
        <MemoryPage
          flipCard={this.flipCard}
          toggleHelp={this.toggleHelp}
          openOptions={this.openOptions}
          toggleSound={this.toggleSound}
          {...this.props}
          {...this.state}
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
