import { Card, CardRow } from '../components/Memory/MemoryPageStyles';

function makeCard(a, cardBack, flipCard) {
  return (
    <Card
      key={a.cardId}
      className={a.status}
      data-cardId={a.cardId}
      onClick={flipCard}
      style={
        a.status === 'faceDown'
          ? {
              backgroundImage: `url("/static/img/cardBacks/cardBack-${cardBack}.jpg")`
            }
          : {}
      }
    >
      <p>{a.word}</p>
    </Card>
  );
}

function makeMemoryGrid({ cardBack, cardList, flipCard, gameSize }) {
  const [width, height] = gameSize;
  const mutableCards = cardList.slice(0);
  const gridArray = [];

  for (let i = 0; i < height; i++) {
    let tempRow = [];

    for (let j = 0; j < width; j++) {
      tempRow.push(makeCard(mutableCards.shift(), cardBack, flipCard));
    }

    gridArray.push(tempRow);
  }

  return gridArray.map((a, i) => <CardRow key={i}>{a}</CardRow>);
}

export default makeMemoryGrid;
