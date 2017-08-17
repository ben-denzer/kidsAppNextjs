import React from 'react';

export default function SpeechHelpText() {
  return (
    <div id="MemoryTextContainer">
      <h2>HELP</h2>
      <strong>Instructions</strong>
      <p>
        Find the 2 cards with the same word printed on them. Try to remember where each card was when they flip back over.
      </p>
      <strong>Nothing is working</strong>
      <p>
        Please make sure that you are using one of the following browsers, if you are using something else please click on the link(s) to download one.
      </p>
      <ul>
        <li>
          <a href="https://www.google.com/chrome/browser/desktop/index.html">
            Google Chrome
          </a>
        </li>
        <li>
          <a href="https://www.mozilla.org/en-US/firefox/">Mozilla Firefox</a>
          {' '}
          <span>
            (This is a link to the United States Mozilla site. If you are in a different country you can just type "download firefox" into any search engine.)
          </span>
        </li>
      </ul>

      <p>
        For any other questions, please email me at
        {' '}
        <a href="mailto:denzer.ben@gmail.com">denzer.ben@gmail.com</a>
      </p>
    </div>
  );
}
