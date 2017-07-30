import React, { Component } from 'react';
import styled from 'styled-components';
import { PageContainer } from './GameStyles';

class MemoryStartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempSize: [4, 3],
      tempCard: 1
    };

    this.cardChange = this.cardChange.bind(this);
    this.sizeChange = this.sizeChange.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  cardChange(tempCard) {
    this.setState({ tempCard });
  }

  makeGrid(arr) {
    const height = arr[1];
    const width = arr[0];
    const gridArray = [];

    for (let i = 0; i < height; i++) {
      let tempArray = [];
      for (let j = 0; j < width; j++) {
        tempArray.push(<Card key={i.toString() + j.toString()} />);
      }
      gridArray.push(tempArray);
    }

    return gridArray.map((a, i) => {
      return <CardRow key={i}>{a}</CardRow>;
    });
  }

  sizeChange(tempSize) {
    this.setState({ tempSize });
  }

  startGame() {
    const { tempSize, tempCard } = this.state;
    this.props.setupGame({ gameSize: tempSize, cardBack: tempCard });
  }

  render() {
    const {
      gameOver,
      gameSize,
      optionsOpen,
      setupCards,
      setupGame,
      toggleOptions
    } = this.props;
    const { tempSize } = this.state;

    if (!optionsOpen) {
      return (
        <PageContainer>
          <RestartContainer onClick={setupCards}>
            <Title>Play Again?</Title>
            <Restart src="/static/img/restart.png" alt="Re-Start" />
          </RestartContainer>
          <ChangeSettings onClick={toggleOptions}>
            Change Settings
          </ChangeSettings>
        </PageContainer>
      );
    }

    const sizeOptions = [
      [4, 2],
      [5, 2],
      [4, 3],
      [3, 4],
      [4, 4],
      [5, 4],
      [4, 5]
    ];

    const options = sizeOptions.map(a => (
      <Option
        key={a[0].toString() + a[1].toString()}
        onClick={() => this.sizeChange(a)}
        className={a[0] === tempSize[0] && a[1] === tempSize[1] ? 'active' : ''}
      >
        <OptionTitle>{`${a[0]} X ${a[1]}`}</OptionTitle>
        <div>{this.makeGrid(a)}</div>
        <OptionHeadline>{`${a[0] * a[1] / 2} Words`}</OptionHeadline>
      </Option>
    ));

    return (
      <PageContainer>
        <Title>Options</Title>
        <OptionsContainer>
          {options}
        </OptionsContainer>
        <StartGame onClick={this.startGame}>START</StartGame>
      </PageContainer>
    );
  }
}

const color2 = '#327d32';

const Card = styled.div`
  height: 10px;
  width: 7px;
  margin: 2px;
  background: blue;
`;

const CardRow = styled.div`
  display: flex;
  justify-content: center;
`;

const ChangeSettings = styled.p`
  font-size: 28px;
  color: ${color2};

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const OptionsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

const Option = styled.div`
  height: 150px;
  width: 100px;
  margin: 0 5px;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;

  &.active {
    border: 7px solid black;
    background: #fff;

    &:hover {
      cursor: default;
      border: 7px solid black;
    }
  }

  &:hover {
    cursor: pointer;
    border: 4px solid black;
  }
`;

const OptionTitle = styled.h3`
  margin: 5px;
  font-size: 18px;
  font-weight: bold;
`;

const OptionHeadline = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin: 5px;
`;

const Restart = styled.img`
  height: 80px;
  width: auto;
  margin-bottom: 20px;
`;

const RestartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    cursor: pointer;

    img {
      opacity: .8;
    }
  }
`;

const StartGame = styled.button`
  height: 50px;
  width: 250px;
  font-size: 32px;
  color: white;
  background: ${color2};
  border: 3px solid black;

  &:hover {
    cursor: pointer;
    background: blue;
  }
`;

const Title = styled.h1`
  margin-bottom: 10px;
`;

export default MemoryStartScreen;
