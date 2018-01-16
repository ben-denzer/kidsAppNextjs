import React, { Component } from 'react';
import Router from 'next/router';
import MainLayout from '../components/MainLayout';
import AccountHome from '../components/AccountHome/AccountHome';
import { getFromStorage } from '../utils/mswLocalStorage';
import addNewWord from '../api/addNewWord';
import getWordsForChild from '../api/getWordsForChild';

// Words from the DB are sorted alphabetically, when they add a new word it
// is not sorted so they don't loose their place when adding words

class AccountContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      changePwFormOpen: false,
      children: [],
      childNameText: '',
      childOpen: null,
      editingChildName: false,
      error: '',
      newWordError: '',
      newWordVal: '',
      wordList: [],
    }

    this.handleInput = this.handleInput.bind(this);
    this.removeWord = this.removeWord.bind(this);
    this.saveInput = this.saveInput.bind(this);
    this.selectChild = this.selectChild.bind(this);
    this.submitOnEnter = this.submitOnEnter.bind(this);
    this.toggleChangePwForm = this.toggleChangePwForm.bind(this);
  }

  componentDidMount() {
    const children = getFromStorage('children');
    this.setState({ children });
  }

  addWord() {
    const { childOpen, newWordVal, wordList } = this.state;

    if (!newWordVal) return;
    for (let word of wordList) {
      if (word.word_text === newWordVal) {
        this.setState({ newWordError: 'You Already Have This Word' });
        return;
      }
    }
    if (wordList.length >= 100) {
      this.setState({ newWordError: 'You Already Have The Maximum Allowed Words' });
      return;
    }
    this.setState({ wordList: [...wordList, { word_id: Date.now(), word_text: newWordVal }] });
    addNewWord({ childId: childOpen, word: newWordVal })
      .then(() => this.setState({ newWordVal: '' }))
      .catch(e => this.setState({ newWordError: 'Error Saving Word', wordList: wordList.slice(0, -1) }));
  }

  handleInput(e) {
    const { dataset, value } = e.target;
    this.setState({ [dataset.inputId]: value, newWordError: '' });
  }

  removeWord(wordId) {
    console.log(`removing ${wordId} from ${this.state.childOpen}`);
  }

  saveInput(inputId) {
    if (inputId === 'childNameText') {
      console.log(`saving ${this.state.childNameText}`);
    } else {
      this.addWord();
    }
  }

  selectChild(e) {
    const { childOpen } = this.state;
    const id = e.target.dataset.childId;

    if (childOpen === id) {
      this.setState({ childOpen: null });
    } else {
      this.setState({ childOpen: id, loadingWords: true });
      getWordsForChild({ childId: id })
        .then(wordList => {
          wordList = wordList.sort((a, b) => {
            if (a.word_text === b.word_text) return 0;
            return a.word_text < b.word_text ? -1 : 1;
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
