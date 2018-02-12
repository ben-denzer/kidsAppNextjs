import React, { Component } from 'react';
import MainLayout from '../MainLayout';
import defaultWordList from '../../config/defaultSightWords';
import { getFromStorage } from '../../utils/mswLocalStorage';
import getWordsForChild from '../../api/getWordsForChild';
import Link from 'next/link';
import {
  GoButton,
  Headline,
  PageContainer,
  Title,
  WordToggle,
  WordToggleContainer
} from './FlashcardsPageStyles';

class FlashcardsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordList: []
    };

    this.handleCheck = this.handleCheck.bind(this);
    this.useDefaultWords = this.useDefaultWords.bind(this);
  }

  componentDidMount() {
    this.setWordList(getFromStorage('activeChild'));
  }

  componentWillUnmount() {
    const words = JSON.stringify(this.state.wordList);
    window.localStorage.setItem('flashcardWords', words);
  }

  handleCheck(e) {
    const wordList = this.state.wordList.map(a => {
      if (a.word === e.target.dataset.word) {
        return { word: a.word, checked: e.target.checked };
      }
      return a;
    });
    this.setState({ wordList });
  }

  normalizeWord(word) {
    if (word && word.word_text) {
      word = word.word_text;
    }
    return { word, checked: true };
  }

  async setWordList(childId) {
    if (!childId) {
      return this.useDefaultWords();
    }

    try {
      const words = await getWordsForChild({ childId });
      if (!words.length) {
        return this.useDefaultWords();
      }

      const wordList = words.map(this.normalizeWord);
      this.setState({ wordList });
    } catch(e) {
      this.useDefaultWords();
    }
  }

  useDefaultWords() {
    const wordList = defaultWordList.map(this.normalizeWord);
    this.setState({ wordList });
  }

  render() {
    if (!this.state.wordList.length) return null;
    const words = this.state.wordList
      .sort((a, b) => {
        if (a.word === b.word) return 0;
        return a.word.toLowerCase() < b.word.toLowerCase() ? -1 : 1;
      })
      .map(a => (
        <WordToggle key={a.word + Math.random().toString()}>
          <input
            type="checkbox"
            onChange={this.handleCheck}
            data-word={a.word}
            checked={a.checked}
          />
          <label>{a.word}</label>
        </WordToggle>
      ));

    return (
      <PageContainer>
        <Title>Print Your Own Flashcards</Title>
        <Headline>What Words Would You Like To Print?</Headline>
        <WordToggleContainer>
          {words}
        </WordToggleContainer>
        <Link href="/printable-games/printFlashcards">
          <GoButton>GO</GoButton>
        </Link>
      </PageContainer>
    );
  }
}

export default MainLayout(FlashcardsPage);
