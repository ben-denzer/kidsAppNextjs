import React, { Component } from 'react';
import shuffle from '../utils/shuffle';
import defaultWordList from '../config/defaultSightWords';
import MemoryPage from '../components/MemoryPage';
import MemoryStartScreen from '../components/MemoryStartScreen';

export default class MemoryPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardList: [],
      cardBack: 1,
      coins: 0,
      gameSize: [4, 2],
      gameOver: true,
      helpOpen: false,
      mute: false,
      numberOfWords: 4,
      optionsOpen: true,
      score: 0,
      showPrize: false,
      spinnerClassName: 'hide',
      wordList: []
    };

    this.checkForMatch = this.checkForMatch.bind(this);
    this.flipCard = this.flipCard.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.setupCards = this.setupCards.bind(this);
    this.setupGame = this.setupGame.bind(this);
    this.toggleHelp = this.toggleHelp.bind(this);
    this.toggleOptions = this.toggleOptions.bind(this);
    this.toggleSound = this.toggleSound.bind(this);
  }

  componentDidMount() {
    const coins = window.localStorage.getItem('coins');
    this.setState({ wordList: defaultWordList });
    // this.setupCards();
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

  checkForMatch(cards) {
    let finalCards;
    let gameOver = false;
    const flippedCards = cards.filter(a => a.status === 'faceUp' && a);

    if (flippedCards[0].word === flippedCards[1].word) {
      if (!this.state.mute) {
        this.correctSound.play();
      }

      const matchedIds = flippedCards.map(a => a.cardId);
      finalCards = cards.map(a => {
        if (matchedIds.indexOf(a.cardId) !== -1) {
          return Object.assign({}, a, { status: 'hidden' });
        }
        return a;
      });

      // check for winner
      const hiddenCards = finalCards.filter(a => a.status === 'hidden' && a);
      if (hiddenCards.length === cards.length) gameOver = true;
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
      if (gameOver) this.gameOver();
    }, 3000);
  }

  flipCard(e) {
    // early return if there are already 2 cards filpped
    const cards = this.state.cardList.slice(0);
    const flippedCards = cards.filter(a => a.status === 'faceUp' && a);
    if (flippedCards.length > 1) return;

    const cardToFlip = e.target.dataset.cardid;
    cards[cardToFlip].status = 'faceUp';
    flippedCards.push(cards[cardToFlip]);

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

  setupCards() {
    const { numberOfWords, wordList } = this.state;
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

  setupGame(options) {
    const { gameSize, cardBack } = options;
    this.setState({ cardBack, gameSize, gameOver: false });
  }

  toggleHelp() {
    this.setState({ helpOpen: !this.state.helpOpen });
  }

  toggleOptions() {
    this.setState({ optionsOpen: !this.state.optionsOpen });
  }

  toggleSound() {
    this.setState({ mute: !this.state.mute });
  }

  render() {
    const { gameOver, gameSize, optionsOpen } = this.state;
    if (gameOver) {
      return (
        <MemoryStartScreen
          gameSize={gameSize}
          optionsOpen={optionsOpen}
          setupCards={this.setupCards}
          setupGame={this.setupGame}
          toggleOptions={this.toggleOptions}
        />
      );
    }

    return (
      <div>
        <MemoryPage
          flipCard={this.flipCard}
          toggleHelp={this.toggleHelp}
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
