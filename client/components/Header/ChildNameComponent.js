import React from 'react';
import { NavItem, SmallTextLink } from './NavStyles';
import Link from 'next/link';

function ChildNameComponent(props) {
  const { activeChildName, childCount } = props;

  if (!activeChildName || /childmenu/.test(window.location.pathname)) {
    return null;
  }

  return (
    <NavItem key={activeChildName}>
      <strong>{activeChildName}</strong>&nbsp;
      {
        childCount > 1 && (
          <Link prefetch href="/account/childmenu">
            <SmallTextLink>change</SmallTextLink>
          </Link>
        )
      }
    </NavItem>
  );
}

export default ChildNameComponent;
