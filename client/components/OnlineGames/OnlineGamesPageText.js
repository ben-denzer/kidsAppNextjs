import React from 'react';
import Link from 'next/link';

const OnlineGamesPageText = () =>
  <div className="onlineGamesPageText">
    <p>
      Early readers will love these free online sight words games. Keeping a child's interest can be the hardest part of teaching, and playing games is one of the best ways to help them stay focused.
    </p>
    <h3><Link href="/account/signup"><a>Sign up</a></Link> for free</h3><br />
    The first 1,000 members will get free access for life. Membership includes:
    <ul>
      <li>
        <strong>Custom word lists</strong>
        {' '}
        - Enter your child's spelling word list each week, or have them practice any words that are struggling with.
      </li>
      <li>
        <strong>Save your score</strong>
        {' '}
        - Keep the points that they earn accross all of your devices.
      </li>
    </ul>
    <p>
      Depending on your child's skill level, different games will be appropriate.
    </p>
    <strong>
      Beginning Readers
    </strong>
    <br />
    Try the
    {' '}
    <Link href="/online-games/fishing"><a>Fishing</a></Link>
    {' '}
    game. It is not timed, and helps teach children to read each letter and find the same word on another part of the page.
    <br />
    <br />
    <strong>Intermediate Readers</strong><br />
    The
    {' '}
    <Link href="/online-games/memory"><a>Memory Match</a></Link>
    {' '}
    and
    {' '}
    <Link href="/online-games/bingo"><a>Online Bingo</a></Link>
    {' '}
    games are a little more challenging. The Bingo game is a race against time that forces you to read multiple words over and over. Memory Match teaches concentration and focus.
    <br />
    <br />
    <strong>Independent Readers</strong><br />
    <Link href="/online-games/speech"><a>Read Out Loud</a></Link>
    {' '}
    is for children who can read words without much help. This game is built with experimental browser features, so please watch your child while they are playing this game. It is possible that they are doing everything right, but the program just isn't working as well as we'd like.
    <p className="centered">
      If your child is anything like mine, they may start 'just clicking buttons' instead of actually trying to read the words. Please don't use these games as a babysitter. If you stay with your child while they are learning it will make a big difference.
    </p>
  </div>
;

export default OnlineGamesPageText;
