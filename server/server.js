import express from 'express';
import apiRouter from './routes/apiRouter';
import dbInfo from './keys/.dbKeys';
import logError from './services/logError';
import mysql from 'mysql';
import path from 'path';
import next from 'next';
import url from 'url';

const server = express();
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const connection = mysql.createConnection(dbInfo);

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
      if (dev && err) return console.error(err);
      if (dev) console.log(`listening on ${port}`);
    });
  })
  .catch(err => {
    if (dev) console.error(err);
  });
