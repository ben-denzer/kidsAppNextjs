import React from 'react';
import styled from 'styled-components';

function ChildThumb(props) {
  const { id, name, coins, selectChild } = props;

  return (
    <ChildThumbContainer data-child-id={id} onClick={selectChild}>
      {name}
      <IconContainer>
        <ChildIcon src="/static/img/goldCoin.png" />{coins}
      </IconContainer>
    </ChildThumbContainer>
  )
}

const ChildThumbContainer = styled.div`
  min-width: 200px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-around;
  border: 3px solid #999;
  margin: 0 4px;
  font-size: 24px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    background: white;
  }
`;

const ChildIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default ChildThumb;
