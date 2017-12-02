const express = require('express');
const server = express();
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const url = require('url');
const next = require('next');
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const path = require('path');

const mysql = require('mysql');
const dbInfo = require('./keys/.dbKeys');
const connection = mysql.createConnection(dbInfo);

global.logError = require('./services/logError');

nextApp
  .prepare()
  .then(() => {
    server.use(express.static(path.join(__dirname, '../static')));

    const apiController = require('./controllers/apiController')(connection);
    server.use('/api', apiController);

    server.get('*', (req, res) => {
      nextApp.render(req, res, url.parse(req.url).pathname);
    });

    server.listen(port, err => {
      if (dev && err) return console.error(err);
      if (dev) console.log(`listening on ${port}`);
    });
  })
  .catch(err => {
    if (dev) console.error(err);
  });
