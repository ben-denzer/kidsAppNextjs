import { Card, CardRow } from '../components/Memory/MemoryStartScreenStyles';

function makeThumbnailGrid(sizeArray, cardBack) {
  const [width, height] = sizeArray;
  const gridArray = [];

  for (let i = 0; i < height; i++) {
    let tempArray = [];
    for (let j = 0; j < width; j++) {
      tempArray.push(
        <Card
          key={i.toString() + j.toString()}
          style={{
            backgroundImage: `url("/static/img/cardBacks/cardBack-${cardBack}.jpg")`
          }}
        />
      );
    }
    gridArray.push(tempArray);
  }

  return gridArray.map((a, i) => {
    return <CardRow key={i}>{a}</CardRow>;
  });
}

export default makeThumbnailGrid;
