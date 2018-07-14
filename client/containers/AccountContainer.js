import React, { Component } from 'react';
import MainLayout from '../components/MainLayout';
import AccountHome from '../components/AccountHome/AccountHome';
import { getFromStorage } from '../utils/mswLocalStorage';
import addNewWord from '../api/addNewWord';
import getAllParentData from '../api/getAllParentData';
import getWordsForChild from '../api/getWordsForChild';
import removeWordFromDB from '../api/removeWordFromDB';

class AccountContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountExpired: false,
      changePwFormOpen: false,
      children: [],
      childOpen: null,
      error: '',
      newWordError: '',
      newWordVal: '',
      parentData: {},
      wordList: [],
      wordsToDelete: []
    };

    this.cleanupDeletedWords = this.cleanupDeletedWords.bind(this);
    this.clearWordList = this.clearWordList.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.removeWord = this.removeWord.bind(this);
    this.saveInput = this.saveInput.bind(this);
    this.selectChild = this.selectChild.bind(this);
    this.submitOnEnter = this.submitOnEnter.bind(this);
    this.tempRemoveWord = this.tempRemoveWord.bind(this);
    this.toggleChangePwForm = this.toggleChangePwForm.bind(this);
  }

  componentDidMount() {
    this.fetchParentData();
  }

  componentWillUnmount() {
    this.cleanupDeletedWords(false);
  }

  addWord() {
    const { childOpen, newWordVal, wordList } = this.state;

    if (!newWordVal) return;
    for (let word of wordList) {
      if (word.word_text.toLowerCase() === newWordVal.toLowerCase()) {
        this.setState({ newWordError: 'You Already Have This Word' });
        return;
      }
    }
    if (wordList.length >= 100) {
      this.setState({
        newWordError: 'You Already Have The Maximum Allowed Words'
      });
      return;
    }

    // optimistic update with temporary word_id
    const tempWordList = [
      ...wordList,
      { word_id: Date.now(), word_text: newWordVal }
    ];
    this.setState({ wordList: tempWordList });

    addNewWord({ childId: childOpen, word: newWordVal.trim() })
      .then(newWordId => {
        const updatedWordList = tempWordList.map(word => {
          if (word.word_text !== newWordVal) return word;
          return { word_id: newWordId, word_text: word.word_text };
        });
        this.setState({ newWordVal: '', wordList: updatedWordList });
      })
      .catch(e =>
        this.setState({
          newWordError: 'Error Saving Word',
          wordList: wordList.slice(0, -1)
        })
      );
  }

  cleanupDeletedWords(shouldSetState = true) {
    if (!this.state.childOpen) {
      return;
    }

    // should set state if not called from componentWillUnmount()
    this.state.wordsToDelete.forEach(word =>
      this.removeWord(word, shouldSetState)
    );
  }

  clearWordList() {
    this.cleanupDeletedWords();
    this.setState({ wordList: [] });
  }

  fetchParentData() {
    getAllParentData()
      .then(parentData => {
        const expirationDate = parentData[0].expiration_utc;
        const currentDate = new Date();

        // const accountExpired = expirationDate < currentDate;
        const children = /* accountExpired ? [] : */ getFromStorage('children');
        this.setState({ children, parentData: parentData[0] });
      })
      .catch(error => {
        if (typeof error === 'string') {
          this.setState({ error });
        } else {
          this.setState({
            error: 'There Was An Error Getting Your Data, Please Try Again'
          });
        }
      });
  }

  handleInput(e) {
    const { dataset, value } = e.target;
    this.setState({ [dataset.inputId]: value, newWordError: '' });
  }

  removeWord(wordId, shouldSetState = true) {
    const { childOpen: childId } = this.state;
    removeWordFromDB({ childId, wordId })
      .then(() => {
        const wordList = this.state.wordList.filter(a => {
          return Number(a.word_id) !== Number(wordId) && a;
        });
        if (shouldSetState) {
          this.setState({ wordList });
        }
      })
      .catch(e => {
        if (shouldSetState) {
          this.setState({ newWordError: 'Error Deleting Word' });
        }
      });
  }

  saveInput(inputId) {
    this.addWord();
  }

  selectChild(e) {
    const { childOpen } = this.state;
    const id = e.target.dataset.childId;
    if (childOpen) {
      this.cleanupDeletedWords();
    }

    if (childOpen === id) {
      this.setState({ childOpen: null });
      setTimeout(this.clearWordList, 1000);
    } else {
      this.clearWordList();
      this.setState({ childOpen: id, loadingWords: true });
      getWordsForChild({ childId: id })
        .then(wordList => {
          wordList = wordList.sort((a, b) => {
            const wordOne = a.word_text.toLowerCase();
            const wordTwo = b.word_text.toLowerCase();
            if (wordOne === wordTwo) return 0;
            return wordOne < wordTwo ? -1 : 1;
          });
          this.setState({ wordList, loadingWords: false, newWordVal: '' });
        })
        .catch(e => {
          this.setState({
            error: 'Error Loading Words',
            loadingWords: false,
            newWordVal: ''
          });
        });
    }
  }

  tempRemoveWord(wordId) {
    const { wordsToDelete } = this.state;
    if (wordsToDelete.indexOf(wordId) > -1) {
      const updated = wordsToDelete.filter(id => id !== wordId);
      this.setState({ wordsToDelete: updated });
    } else {
      const updated = [ ...wordsToDelete, wordId ];
      this.setState({ wordsToDelete: updated });
    }
  }

  submitOnEnter(e) {
    if (e.which === 13 || e.keycode === 13) this.saveInput();
  }

  toggleChangePwForm() {
    this.setState({ changePwFormOpen: !this.state.changePwFormOpen });
  }

  render() {
    return (
      <AccountHome
        {...this.props}
        {...this.state}
        handleInput={this.handleInput}
        saveInput={this.saveInput}
        selectChild={this.selectChild}
        submitOnEnter={this.submitOnEnter}
        tempRemoveWord={this.tempRemoveWord}
        toggleChangePwForm={this.toggleChangePwForm}
      />
    );
  }
}

export default MainLayout(AccountContainer);
