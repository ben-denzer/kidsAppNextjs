import React, { Component } from 'react';
import styled from 'styled-components';

class WordContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      waitingToDelete: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.undoTimer;
  }

  handleClick(e) {
    const { waitingToDelete } = this.state;
    const { removeWord } = this.props;
    const { wordId } = e.target.dataset;

    if (!waitingToDelete) {
      this.setState({ waitingToDelete: true });
      this.undoTimer = setTimeout(() => removeWord(wordId), 3000);
    } else {
      clearTimeout(this.undoTimer);
      this.setState({ waitingToDelete: false });
    }
  }

  render() {
    const { word, removeWord } = this.props;
    const { waitingToDelete } = this.state;
    const { word_text: wordText, word_id: wordId } = word;

    return (
      <WordRow className={waitingToDelete ? 'inactive' : ''}>
        <DeleteWordButton
          data-word-id={wordId}
          onClick={this.handleClick}
        >
          {waitingToDelete ? 'UNDO' : 'X'}
        </DeleteWordButton>
        {wordText}
      </WordRow>
    );
  }
}

const WordRow = styled.div`
  display: flex;
`;

const DeleteWordButton = styled.button`
  margin-right: 15px;
`;

export default WordContainer;
