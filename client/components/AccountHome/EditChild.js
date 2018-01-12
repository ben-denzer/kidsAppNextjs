import React from 'react';
import styled from 'styled-components';
import WordContainer from './WordContainer';

function EditChild(props) {
  const {
    child,
    childOpen,
    handleInput,
    removeWord,
    saveInput,
    selectChild,
    wordList
  } = props;
  const childId = child.child_id;

  let words;
  if (wordList.length) {
    words = wordList.map(a => (
      <WordContainer
        key={a.id}
        word={a}
        removeWord={removeWord}
      />
    ));
  } else {
    words = <p>Loading...</p>
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
        <h4>Words</h4>
        {words}
      </div>
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
    }
  }
`;

export default EditChild;
