const apiController = require('express').Router();
const userController = require('./userController');

function router(connection) {
  apiController.use('/account', userController(connection));
  return apiController;
}

module.exports = router;
