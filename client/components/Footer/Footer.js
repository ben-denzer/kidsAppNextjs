import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { color3 } from '../../config/globalStyles';

export default function Footer(props) {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <FooterContainer>
      <FooterLeft>
        <div>
          <div>© {year} - Ben Denzer</div>
          <div>
            Questions, Comments, or Problems with the site? Email me at{' '}
            <Link href="mailto:support@mysightwords.com">
              <a>support@mysightwords.com</a>
            </Link>
          </div>
        </div>
      </FooterLeft>
      <FooterRight>
        <Links>
          <Link href="/online-games">
            <a>Online Games</a>
          </Link>
          {' | '}
          <Link href="/printable-games">
            <a>Printable Games</a>
          </Link>
          {/*
          {' | '}
          <Link href="/articles"><a>Tips For Teaching Your Child</a></Link>
          */}
        </Links>
      </FooterRight>
    </FooterContainer>
  );
}

const FooterContainer = styled.div`
  width: 100%;
  min-height: 100px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  background-color: ${color3};
  color: white;
  padding: 20px 10px 30px;
  box-sizing: border-box;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }

  a {
    color: white;
    text-decoration: none;

    &:hover {
      cursor: pointer;
      color: #eee;
      text-decoration: underline;
    }
  }
`;

const FooterLeft = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const FooterRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 900px) {
    margin-top: 20px;
    flex-direction: column;
  }
`;

const Links = styled.div``;
