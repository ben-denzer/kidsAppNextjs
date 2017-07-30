const express = require('express');
const server = express();
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const url = require('url');
const next = require('next');
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const path = require('path');

nextApp
  .prepare()
  .then(() => {
    server.use(express.static(path.join(__dirname, '../static')));

    server.get('*', (req, res) => {
      nextApp.render(req, res, url.parse(req.url).pathname);
    });

    server.listen(port, err => {
      if (err) return console.error(err);
      if (dev) console.log(`listening on ${port}`);
    });
  })
  .catch(err => console.error(err));
