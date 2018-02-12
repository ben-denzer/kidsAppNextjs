import React, { Component } from 'react';
import Router from 'next/router';
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
      accountExpired: true,
      changePwFormOpen: false,
      children: [],
      childNameText: '',
      childOpen: null,
      editingChildName: false,
      error: '',
      newWordError: '',
      newWordVal: '',
      parentData: {},
      wordList: [],
    };

    this.clearWordList = this.clearWordList.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.removeWord = this.removeWord.bind(this);
    this.saveInput = this.saveInput.bind(this);
    this.selectChild = this.selectChild.bind(this);
    this.submitOnEnter = this.submitOnEnter.bind(this);
    this.toggleChangePwForm = this.toggleChangePwForm.bind(this);
  }

  componentDidMount() {
    this.fetchParentData();
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
      this.setState({ newWordError: 'You Already Have The Maximum Allowed Words' });
      return;
    }

    // optimistic update with temporary word_id
    const tempWordList = [...wordList, { word_id: Date.now(), word_text: newWordVal }];
    this.setState({ wordList: tempWordList });

    addNewWord({ childId: childOpen, word: newWordVal.trim() })
      .then(newWordId => {
        const updatedWordList = tempWordList.map(word => {
          if (word.word_text !== newWordVal) return word;
          return { word_id: newWordId, word_text: word.word_text };
        });
        this.setState({ newWordVal: '', wordList: updatedWordList });
      })
      .catch(e => this.setState({ newWordError: 'Error Saving Word', wordList: wordList.slice(0, -1) }));
  }

  clearWordList() {
    this.setState({ wordList: [] });
  }

  fetchParentData() {
    getAllParentData()
    .then(parentData => {
      const expirationDate = parentData[0].expiration_utc;
      const currentDate = new Date();
      const accountExpired = expirationDate < currentDate;
      const children = accountExpired ? [] : getFromStorage('children');
      this.setState({ accountExpired, children, parentData: parentData[0] })
    })
    .catch(error => {
      if (typeof error === 'string') {
        this.setState({ error });
      } else {
        this.setState({ error: 'There Was An Error Getting Your Data, Please Try Again' });
      }
    });
  }

  handleInput(e) {
    const { dataset, value } = e.target;
    this.setState({ [dataset.inputId]: value, newWordError: '' });
  }

  removeWord(wordId) {
    const { childOpen: childId } = this.state;
    removeWordFromDB({ childId, wordId })
      .then(() => {
        const wordList = this.state.wordList.filter(a => {
          return Number(a.word_id) !== Number(wordId) && a;
        });
        this.setState({ wordList });
      })
      .catch((e) => this.setState({ newWordError: 'Error Deleting Word' }));
  }

  saveInput(inputId) {
    this.addWord();
  }

  selectChild(e) {
    const { childOpen } = this.state;
    const id = e.target.dataset.childId;

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
          this.setState({ wordList, loadingWords: false, newWordVal: '' })
        })
        .catch(e => {
          this.setState({error: 'Error Loading Words', loadingWords: false, newWordVal: '' });
        });
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
        removeWord={this.removeWord}
        saveInput={this.saveInput}
        selectChild={this.selectChild}
        submitOnEnter={this.submitOnEnter}
        toggleChangePwForm={this.toggleChangePwForm}
      />
    );
  }
}

export default MainLayout(AccountContainer);
