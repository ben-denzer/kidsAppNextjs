import React from 'react';
import styled from 'styled-components';
import { color1, color3 } from '../config/globalStyles';

export default function GameThumbnail(props) {
  const { img, title } = props;
  const innerStyle = { backgroundImage: `url("${img}")` };

  return (
    <div>
      <Title>{title}</Title>
      <ThumbOuter>
        <ThumbInner style={innerStyle} />
      </ThumbOuter>
    </div>
  );
}

const ThumbOuter = styled.div`
  height: 220px;
  width: 320px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: .8;
  }

  @media (max-width: 340px) {
    width: 300px;
  }
`;

const ThumbInner = styled.div`
  height: 200px;
  width: 300px;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 0;
  text-decoration: none;
`;
