import React from 'react';
import {
  ChildThumbContainer,
  ChildIcon,
  IconContainer
} from './ChildThumbStyles';

function ChildThumb(props) {
  const { id, name, selectChild } = props;

  return (
    <ChildThumbContainer data-child-id={id} onClick={selectChild}>
      {name}
      <IconContainer>
        <ChildIcon src="/static/img/goldCoin.png" />
      </IconContainer>
    </ChildThumbContainer>
  )
}

export default ChildThumb;
