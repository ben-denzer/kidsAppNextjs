import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { color1 } from '../../config/globalStyles';

export default function Footer(props) {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <FooterContainer>
      <FooterLeft>
        <div>
          <div>© {year} - Ben Denzer</div>
          <div>
            Questions, Comments, or Problems with the site? Email me at
            {' '}
            <Link href="mailto:denzer.ben@gmail.com">
              <a>denzer.ben@gmail.com</a>
            </Link>
          </div>
        </div>
      </FooterLeft>
      <FooterRight>
        <Links>
          <Link href="/online-games"><a>Online Games</a></Link>
          {' | '}
          <Link href="/printable-games"><a>Printable Games</a></Link>
          {' | '}
          <Link href="/articles"><a>Tips For Teaching Your Child</a></Link>
        </Links>
      </FooterRight>
    </FooterContainer>
  );
}

const FooterContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  background-color: ${color1};
  color: white;

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
  padding-left: 20px;
`;

const FooterRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;
`;

const Links = styled.div`
  
`;
