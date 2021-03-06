const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controllers/userController');
const apiRouter = express.Router();
const jsonParser = bodyParser.json();

const validateJwt = require('../services/validateJwt');

function authenticate(req, res, next) {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ error: 'unauthorized' });
  }
  validateJwt(authHeader.slice(7))
    .then(token => {
      req.body.userId = token.userId;
      req.body.email = token.email;
      next();
    })
    .catch(err => {
      logError(err, 'error in apiRouter validateJwt');
      return res.status(500).send({ error: 'Server Error' });
    });
}

function router(connection) {
  apiRouter.use(jsonParser);
  const {
    postToAddCoin,
    postToAddWord,
    postToChangePw,
    postToForgotPw,
    postToGetAllParentData,
    postToGetCoins,
    postToGetWordsForChild,
    postToLogin,
    postToRemoveWordFromChild,
    postToResetPw,
    postToSignup,
    postToValidateAccount
  } = userController(connection);

  // unprotected routes
  apiRouter.post('/account/login', postToLogin);
  apiRouter.post('/account/signup', postToSignup);

  apiRouter.use(authenticate);

  // protected routes
  apiRouter.post('/account/addCoin', postToAddCoin);
  apiRouter.post('/account/addWord', postToAddWord);
  apiRouter.post('/account/changePw', postToChangePw);
  apiRouter.post('/account/forgotPw', postToForgotPw);
  apiRouter.post('/account/getAllParentData', postToGetAllParentData);
  apiRouter.post('/account/getCoins', postToGetCoins);
  apiRouter.post('/account/getWordsForChild', postToGetWordsForChild);
  apiRouter.post('/account/removeWord', postToRemoveWordFromChild);
  apiRouter.post('/account/resetPw', postToResetPw);
  apiRouter.post('/account/validateAccount', postToValidateAccount);

  return apiRouter;
}

module.exports = router;
