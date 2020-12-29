/* eslint no-console: 0 */

const express = require('express');
const apiRouter = require('./routes/apiRouter');
const dbInfo = require('./keys/.dbKeys');
const logError = require('./services/logError');
const mysql = require('mysql');
const next = require('next');
const url = require('url');

const server = express();
const port = process.env.PORT || 3000;
global.MSW_DEV = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev: MSW_DEV });

const connection = mysql.createConnection(dbInfo);

setInterval(() => {
  connection.query('SELECT COUNT(*) FROM parent');
}, 60 * 60 * 1000);

global.logError = logError;

nextApp
  .prepare()
  .then(() => {
    server.use(express.static('../static'));
    server.use('/api', apiRouter(connection));
    server.get('*', (req, res) => {
      nextApp.render(req, res, url.parse(req.url).pathname);
    });

    server.listen(port, err => {
      if (MSW_DEV && err) return console.error(err);
      if (MSW_DEV) console.log(`listening on ${port}`);
    });
  })
  .catch(err => {
    if (MSW_DEV) console.error(err);
  });
