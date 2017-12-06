const apiRouter = require('express').Router();
const jsonParser = require('body-parser').json();
const userController = require('../controllers/userController');

function router(connection) {
  const { postToSignup } = userController(connection);
  apiRouter.use(jsonParser);
  apiRouter.post('/account/signup', postToSignup);

  return apiRouter;
}

module.exports = router;
