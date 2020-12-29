import React from 'react';
import WordContainer from './WordContainer';
import { FormErrorBox } from '../accountForms/formStyles';
import { EditChildContainer, ExpandButton, WordBox } from './EditChildStyles';

function EditChild(props) {
  const {
    child,
    childOpen,
    handleInput,
    loadingWords,
    newWordError,
    newWordVal,
    saveInput,
    selectChild,
    submitOnEnter,
    tempRemoveWord,
    wordList,
    wordsToDelete
  } = props;
  const childId = child.child_id;

  const thisChildIsOpen = Number(childOpen) === Number(childId);
  let words = null;
  if (wordList.length) {
    words = wordList.map(a => {
      return (
        <WordContainer
          key={a.word_id}
          word={a}
          tempRemoveWord={tempRemoveWord}
          wordsToDelete={wordsToDelete}
        />
      );
    });
  } else if (thisChildIsOpen && loadingWords) {
    words = <p key="loading">Loading...</p>;
  }

  return (
    <EditChildContainer
      className={thisChildIsOpen ? 'open' : ''}
      count={words && words.length}
    >
      <div
        className="nameContainer"
        data-child-id={childId}
        onClick={selectChild}
      >
        <ExpandButton>
          {thisChildIsOpen ? ' - ' : ' + '}
        </ExpandButton>
        {child.username}
      </div>
      <WordBox>
        {words}
        <h4>Add New Word</h4>
        {newWordError && <FormErrorBox>{newWordError}</FormErrorBox>}
        <input
          data-input-id="newWordVal"
          value={newWordVal}
          onChange={handleInput}
          onKeyUp={submitOnEnter}
        />
        <button onClick={saveInput} data-input-id="newWord">Save</button>
      </WordBox>
    </EditChildContainer>
  );
}

export default EditChild;
