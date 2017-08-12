import React, { Component } from 'react';
import styled from 'styled-components';

export default class PrintFlashcards extends Component {
  constructor() {
    super();
    this.state = { words: [] };
  }

  componentDidMount() {
    const words = JSON.parse(window.localStorage.getItem('flashcardWords'));
    this.setState({ words });
  }

  render() {
    if (!this.state.words.length) {
      return <div />;
    }

    const cards = this.state.words
      .filter(a => a.checked && a)
      .map(a => <Flashcard key={a.word}>{a.word}</Flashcard>);

    return <div>{cards}</div>;
  }
}

const Flashcard = styled.div`
  height: 300px;
  width: 500px;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  margin: 15px;
  border: 5px solid black;

  &:nth-child(even) {
    page-break-after: always;
  }
`;
