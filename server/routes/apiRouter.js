import express from 'express';
import bodyParser from 'body-parser';
import userController from '../controllers/userController';
const apiRouter = express.Router();
const jsonParser = bodyParser.json();

function router(connection) {
  const { postToSignup } = userController(connection);
  apiRouter.use(jsonParser);
  apiRouter.post('/account/signup', postToSignup);

  return apiRouter;
}

export default router;
