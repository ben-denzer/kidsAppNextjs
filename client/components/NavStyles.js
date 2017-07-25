import styled from 'styled-components';

export const Hamburger = styled.div`
  display: none;

  @media (max-width: 1000px) {
    height: 25px;
    width: 30px;
    border: 1px solid #222;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 10px;

    &:hover {
      cursor: pointer;
      opacity: .8;
    }

    >div {
      width: 70%;
      margin: 2px;
      height: 3px;
      background: #222;
    }
  }
`;

export const NavBar = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 5;
`;

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-right: 1px solid #999;

  :last-of-type {
    border-right: 0;
  }

  @media (max-width: 1000px) {
    display: block;
    width: 100%;
    text-align: right;
    border: 0;
    padding: 10px 0;
    margin-right: 20px;

    :last-of-type {
      padding-bottom: 25px;
    }
  }
`;

export const NavItemsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 10px;

  @media (max-width: 1000px) {
    display: none;

    &.open {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 35px;
      right: -10px;
      min-width: 200px;
      background: white;
    }
  }

  a {
    text-decoration: none;
    color: #222;

    &:hover {
      text-decoration: underline;
    }
  }
`;
