import React from 'react';
import { NavItem, SmallTextLink } from './NavStyles';
import Link from 'next/link';

function ChildNameComponent(props) {
  const { activeChildName, childCount, loggedIn, pathname } = props;
  console.log('pathname', pathname)

  if (!loggedIn || /childmenu/i.test(pathname)) {
    return null;
  }

  if (!activeChildName) {
    return (
      <Link prefetch href="/account/childmenu">
        <SmallTextLink>Select Child</SmallTextLink>
      </Link>
    );
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
