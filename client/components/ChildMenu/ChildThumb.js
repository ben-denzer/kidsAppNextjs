import React from 'react';
import styled from 'styled-components';

function ChildThumb(props) {
  const { id, name, coins, selectChild } = props;

  return (
    <ChildThumbContainer data-child-id={id} onClick={selectChild}>
      <ChildIcon />
      <ChildName>{name}</ChildName>
    </ChildThumbContainer>
  )
}

const ChildThumbContainer = styled.div`
  width: 200px;
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border: 6px solid #999;
  margin: 0 2px;
`;

const ChildIcon = styled.div`
  width: 150px;
  height: 150px;
  background-color: red;
`;

const ChildName = styled.p`
  font-size: 18px;
`;

export default ChildThumb;
