import express from 'express';
import bodyParser from 'body-parser';
import userController from '../controllers/userController';
const apiRouter = express.Router();
const jsonParser = bodyParser.json();

function router(connection) {
  apiRouter.use(jsonParser);
  const {
    postToLogin,
    postToSignup
  } = userController(connection);

  apiRouter.post('/account/signup', postToSignup);
  apiRouter.post('/account/login', postToLogin);

  return apiRouter;
}

export default router;
