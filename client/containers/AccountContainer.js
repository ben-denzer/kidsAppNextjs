import React, { Component } from 'react';
import Router from 'next/router';
import MainLayout from '../components/MainLayout';
import AccountHome from '../components/AccountHome/AccountHome';
import { getFromStorage } from '../utils/mswLocalStorage';
import getWordsForChild from '../api/getWordsForChild';

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
      wordList: [],
      wordText: ''
    }

    this.handleInput = this.handleInput.bind(this);
    this.removeWord = this.removeWord.bind(this);
    this.saveInput = this.saveInput.bind(this);
    this.selectChild = this.selectChild.bind(this);
    this.toggleChangePwForm = this.toggleChangePwForm.bind(this);
  }

  componentDidMount() {
    const children = getFromStorage('children');
    this.setState({ children });
  }

  handleInput(e) {
    const { dataset, value } = e.target;
    this.setState({ [dataset.inputId]: value });
  }

  removeWord(wordId) {
    console.log(`removing ${wordId} from ${this.state.childOpen}`);
  }

  saveInput(inputId) {
    if (inputId === 'childNameText') {
      console.log(`saving ${this.state.childNameText}`);
    } else {
      console.log(`adding ${this.state.wordText}`);
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
        .then(wordList => this.setState({ wordList, loadingWords: false }))
        .catch(e => {
          this.setState({ error: 'Error Loading Words', loadingWords: false })
        });
    }
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
        toggleChangePwForm={this.toggleChangePwForm}
      />
    );
  }
}

export default MainLayout(AccountContainer);
