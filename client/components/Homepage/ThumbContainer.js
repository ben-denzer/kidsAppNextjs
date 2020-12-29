import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { textColor } from '../../config/globalStyles';

export default function ThumbContainer(props) {
  const { altText, headline, picture, url } = props;
  const imgStyle = { backgroundImage: `url("/static/img/${picture}")` };
  return (
    <Link prefetch href={url}>
      <ThumbBox style={imgStyle}>
        <Headline>{headline}</Headline>
      </ThumbBox>
    </Link>
  );
}

const ThumbBox = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200px;
  width: 300px;

  &:hover {
    cursor: pointer;
    opacity: .7;
  }
`;

const Headline = styled.h2`
  margin-top: 150px;
  text-align: center;
  color: white;
  text-shadow: 1px 1px ${textColor};
  font-size: 28px;
`;
