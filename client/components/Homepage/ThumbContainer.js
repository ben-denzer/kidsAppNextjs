import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

export default function ThumbContainer(props) {
  const { altText, headline, picture, url } = props;
  return (
    <ThumbOuter>
      <Link prefetch href={url}>
        <ThumbBox>
          <Pic src={`/static/img/${picture}`} alt={altText} />
          <Headline>{headline}</Headline>
        </ThumbBox>
      </Link>
    </ThumbOuter>
  );
}

const ThumbOuter = styled.div`
  height: 320px;
  width: 250px;
  box-sizing: border-box;

  &:hover {
    cursor: pointer;
    border: 1px solid #999;
  }
`;

const ThumbBox = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 280px;
`;

const Pic = styled.img`
  height: 250px;
  width: 250px;
`;

const Headline = styled.h2`
  text-align: center;
`;
