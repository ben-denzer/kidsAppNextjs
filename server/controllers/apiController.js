const express = require('express');
const apiController = express.Router();
const connection = require('../keys/sqlConnection');
const jsonParser = require('body-parser').json();
const userServices = require('../services/userServices');

function apiRouter(req, res) {
  connection.connect();

  apiController.post('/addUser', jsonParser, (req, res) => {
    userServices.addUser(connection, req.body, (err, success) => {
      if (err) return res.status(500).send(JSON.stringify({ error: err }));
      res.status(200).send(JSON.stringify({ success: 'User Added' }));
    });
  });

  return apiController;
}

module.exports = apiRouter();
