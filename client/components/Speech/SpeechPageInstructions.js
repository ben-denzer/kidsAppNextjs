import React from 'react';

const SpeechPageInstructions = () => (
  <React.Fragment>
    <h1>Read Out Loud</h1>
    <h2>Online Flash Cards With Speech Recognition</h2>
    <p>Practice sight words with our speech recognition game. Learn to read online by saying the words out loud.</p>
    <p>
      <b>*IMPORTANT*</b>
      <br />
      This app is using an experimental feature of the browser. We have removed words that are only one letter, because
      the speech recognition doesn't work well with them.
    </p>
    <p>In general, if your child is reading the word correctly, but the game doesn't seem to be working:</p>
    <ul>
      <li>Did you accept the 'Allow Access To Microphone' message?</li>
      <li>Check your microphone settings</li>
      <li>
        If the game works for some words but not for others, I am interested in knowing what words your child are having
        trouble with. Email me at <a href="mailto: support@mysightwords.com">support@mysightwords.com</a>. In general, I
        will not be able to do anything about it because the game depends entirely on Google Chrome's speech
        recognition. But I can dis-allow problematic words from appearing on this game.
      </li>
    </ul>
  </React.Fragment>
);

export default SpeechPageInstructions;
