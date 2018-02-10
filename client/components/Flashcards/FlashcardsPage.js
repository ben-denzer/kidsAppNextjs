import React, { Component } from 'react';
import MainLayout from '../MainLayout';
import defaultWordList from '../../config/defaultSightWords';
import { getFromStorage } from '../../utils/mswLocalStorage';
import getWordsForChild from '../../api/getWordsForChild';
import styled from 'styled-components';
import { color1, color2, color3, color4 } from '../../config/globalStyles';
import Link from 'next/link';

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
        <Link href="/printable-games/printFlashcards">
          <GoButton>GO</GoButton>
        </Link>
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

const PageContainer = styled.div`
  padding-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 0;
`;

const GoButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 200px;
  background-color: ${color1};
  color: white;
  font-size: 22px;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    background-color: ${color2};
  }
`;

const Headline = styled.h2`
  text-align: center;
  margin-top: 10px;
`;

const WordToggleContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 80%;
  margin: 20px auto;

  @media (max-width: 1000px) {
    width: 95%;
  }

  @media (max-width: 700px) {
    width: 99%;
  }
`;

const WordToggle = styled.div`
  width: 25%;
  margin: 10px 0 10px;

  input {
    margin-left: 45%;
  }

  @media (max-width: 1000px) {
    width: 33%;
  }

  @media (max-width: 700px) {
    width: 50%;
  }
`;

export default MainLayout(FlashcardsPage);
