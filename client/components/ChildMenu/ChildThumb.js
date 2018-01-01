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
  justify-content: space-between;
  border: 3px solid #999;
  margin: 8px;
  font-size: 34px;
  font-weight: bold;
  box-sizing: border-box;
  padding: 2px 5px;

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
