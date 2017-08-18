const express = require('express');
const apiController = express.Router();
const connection = require('../keys/sqlConnection');

function apiRouter(req, res) {
  try {
    connection.connect();
  } catch (e) {
    console.log(`error in catch ${e}`);
  }
  apiController.get('/', (req, res) => {
    connection.query('SELECT * FROM children', (err, results) => {
      if (err) return res.status(500).send(err.toString());
      res.status(200).send(results[0].username);
    });
  });

  return apiController;
}

module.exports = apiRouter();
