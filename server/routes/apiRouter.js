const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controllers/userController');
const apiRouter = express.Router();
const jsonParser = bodyParser.json();

function router(connection) {
  apiRouter.use(jsonParser);
  const {
    postToAddCoin,
    postToAddWord,
    postToChangePw,
    postToForgotPw,
    postToGetAllParentData,
    postToGetWordsForChild,
    postToLogin,
    postToRemoveWordFromChild,
    postToResetPw,
    postToSignup,
    postToValidateAccount
  } = userController(connection);

  apiRouter.post('/account/addCoin', postToAddCoin);
  apiRouter.post('/account/addWord', postToAddWord);
  apiRouter.post('/account/changePw', postToChangePw);
  apiRouter.post('/account/forgotPw', postToForgotPw);
  apiRouter.post('/account/getAllParentData', postToGetAllParentData);
  apiRouter.post('/account/getWordsForChild', postToGetWordsForChild);
  apiRouter.post('/account/login', postToLogin);
  apiRouter.post('/account/removeWord', postToRemoveWordFromChild);
  apiRouter.post('/account/resetPw', postToResetPw);
  apiRouter.post('/account/signup', postToSignup);
  apiRouter.post('/account/validateAccount', postToValidateAccount);

  return apiRouter;
}

module.exports = router;
