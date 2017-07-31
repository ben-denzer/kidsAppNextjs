import React from 'react';
import styled from 'styled-components';

export default function HomepageContainer(props) {
  return (
    <HpContainer>
      <TopSection>
        <PageTitle>My Sight Words.com</PageTitle>
        <PageHeading>
          Help your child learn to read - Play For Free
        </PageHeading>
      </TopSection>
    </HpContainer>
  );
}

const HpContainer = styled.div`
  margin-top: 0;
  width: 100%;
  height: 600px;
`;

const TopSection = styled.div`
  width: 100%;
  background-image: url("/static/img/kidsWithPictures.jpg");
  background-size: cover;
  background-position: center;
  position: relative;
  height: 600px;
  margin-top: -25px;
`;

const PageTitle = styled.h1`
  text-align: center;
`;

const PageHeading = styled.h2`
  text-align: center;
`;
