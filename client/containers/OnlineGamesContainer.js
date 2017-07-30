import React from 'react';
import Link from 'next/link';

export default function OnlineGamesContainer(props) {
  return (
    <div>
      <h1>Online Games</h1>
      <Link prefetch href="/online-games/speech">Speech Game</Link>
      <Link prefetch href="/online-games/memory">Memory Game</Link>
    </div>
  );
}
