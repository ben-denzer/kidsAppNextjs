import express from 'express';
import bodyParser from 'body-parser';
import userController from '../controllers/userController';
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
    postToSignup
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

  return apiRouter;
}

export default router;
