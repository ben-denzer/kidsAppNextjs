import React from 'react';

export default function SpeechHelpText() {
  return (
    <div id="helpTextContainer">
      <strong>If The Page Seems Broken</strong>
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
      <strong>Do I need to allow access to my computer's microphone?</strong>
      <p>
        Yes. If you clicked on the "don't allow" button, please visit
        {' '}
        <a
          target="_blank"
          href="https://masterclasshelp.zendesk.com/hc/en-us/articles/213714697-How-do-I-allow-access-to-my-computer-s-microphone-"
          rel="noopener noreferrer"
        >
          this site
        </a>
        {' '}
        for instructions on turning the microphone on for this website.
      </p>
      <strong>My child is saying the correct word but it isn't working</strong>
      <p>
        There are some sounds that just don't work very well in speech recognition. Usually problems occur with short, one syllable words. If you can get your child to use the word in a sentence it will be much easier for the program to understand him/her. Your other options are to skip the word using the green arrow button, or you can remove that word from the word list for this game
        {' '}
        <strong>(premium members only).</strong>
      </p>
      <p>
        For any other questions, please email me at
        {' '}
        <a href="mailto:denzer.ben@gmail.com">denzer.ben@gmail.com</a>
      </p>
    </div>
  );
}
