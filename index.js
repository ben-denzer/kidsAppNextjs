// this is a dummy server to run tests in a 2nd console window
// needed because next.js hides the console output on every code change
// THE APP ENTRY POINT IS ./SERVER/SERVER.JS
const express = require('express');
const app = express();
const TEST_PORT = process.env.TEST_PORT;
app.listen(TEST_PORT || 3001, (err) => console.log(err || '')); // eslint-disable-line no-console
