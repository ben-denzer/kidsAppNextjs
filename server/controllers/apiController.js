const express = require('express');
const apiController = express.Router();
const connection = require('../keys/sqlConnection');
const jsonParser = require('body-parser').json();
const userServices = require('../services/userServices');

function apiRouter(req, res) {
  connection.connect();

  apiController.post('/addUser', jsonParser, (req, res) => {
    userServices.addUser(connection, req.body, (err, success) => {
      if (err)
        return res
          .status(err.status)
          .send(JSON.stringify({ error: err.error }));
      res.status(200).send(JSON.stringify({ success: 'User Added' }));
    });
  });

  apiController.post('/login', jsonParser, (req, res) => {
    userServices.login(connection, req.body, (err, success) => {
      if (err)
        return res
          .status(err.status)
          .send(JSON.stringify({ error: err.error }));
      res
        .status(200)
        .send(JSON.stringify({ success: 'Successfully Logged In' }));
    });
  });

  return apiController;
}

module.exports = apiRouter();
