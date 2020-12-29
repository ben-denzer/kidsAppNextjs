import React, { Component } from 'react';
import { DeleteWordButton, WordRow } from './WordContainerStyles';

class WordContainer extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { word, tempRemoveWord } = this.props;
    tempRemoveWord(word.word_id);
  }

  render() {
    const { word, wordsToDelete } = this.props;
    const { word_text: wordText, word_id: wordId } = word;

    const waitingToDelete = wordsToDelete.indexOf(wordId) >= 0;

    return (
      <WordRow className={waitingToDelete ? 'inactive' : ''}>
        <DeleteWordButton onClick={this.handleClick}>
          {waitingToDelete ? 'UNDO' : 'X'}
        </DeleteWordButton>
        {wordText}
      </WordRow>
    );
  }
}

export default WordContainer;
