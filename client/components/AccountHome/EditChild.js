import React from 'react';
import styled from 'styled-components';
import WordContainer from './WordContainer';
import { FormErrorBox } from '../accountForms/formStyles';

function EditChild(props) {
  const {
    child,
    childOpen,
    handleInput,
    newWordError,
    newWordVal,
    removeWord,
    saveInput,
    selectChild,
    submitOnEnter,
    wordList
  } = props;
  const childId = child.child_id;

  let words;
  if (wordList.length) {
    words = wordList.map(a => {
      return(
        <WordContainer
          key={a.word_id}
          word={a}
          removeWord={removeWord}
        />
      );
    });
  } else {
    words = <p key="loading">Loading...</p>
  }

  return (
    <EditChildContainer
      className={Number(childOpen) === Number(childId) ? 'open' : ''}
    >
      <div
        className="nameContainer"
        data-child-id={childId}
        onClick={selectChild}
      >
        {child.username}
      </div>
      <h4>Words</h4>
      {words}
      <h4>Add Word</h4>
      { newWordError && <FormErrorBox>{newWordError}</FormErrorBox> }
      <input
        data-input-id="newWordVal"
        value={newWordVal}
        onChange={handleInput}
        onKeyUp={submitOnEnter}
      />
      <button onClick={saveInput} data-input-id="newWord">Save</button>
    </EditChildContainer>
  );
}

const EditChildContainer = styled.div`
  max-height: 30px;
  background-color: #ccc;
  border: 1px solid black;
  transition: .9s ease-in-out;
  overflow: hidden;

  &.open {
    max-height: none;
  }

  .nameContainer {
    font-size: 22px;
    width: 100%;

    &:hover {
      background: #eee;
      cursor: pointer;
    }
  }
`;

export default EditChild;
