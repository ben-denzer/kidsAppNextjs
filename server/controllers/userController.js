import addCoinToDB from '../services/addCoinToDB';
import signup from '../services/signup';
import login from '../services/login';
import resetPasswordService from '../services/resetPasswordService';
import sendError from '../services/sendError';
import sendForgotPwEmail from '../services/sendForgotPwEmail';
import nodemailerMailgun from '../services/createNodemailerMailgun';

function userRouter(connection) {

  const postToAddCoin = async function postToAddCoinAsync(req, res) {
    try {
      await addCoinToDB(req.body, connection);
      return res.status(200).send({ success: true });
    } catch (err) {
      logError(err, 'post Add Coin');
    }
  };

  const postToChangePw = function postToChangePwAsync(req, res) {
    console.log('body is', req.body);
    res.status(200).send('success');
  };

  const postToForgotPw = async function postToForgotPwAsync(req, res) {
    try {
      await sendForgotPwEmail(req.body, nodemailerMailgun, connection);
      return res.status(200).send(JSON.stringify({ success: true }));
    } catch (err) {
      if (err && err.status === 401) {
        return res.status(401).send(JSON.stringify({ error: 'Email Not On File' }));
      }
      logError(err, 'post Forgot PW');
      return sendError(err, res);
    }
  };

  const postToLogin = async function postToLoginAsync(req, res) {
    try {
      const userData = await login(req.body, connection);
      return res.status(200).send(JSON.stringify(userData));
    } catch (err) {
      if (err && err.status === 401) {
        return res.status(401).send(JSON.stringify({ error: 'Invalid Username Or Password ' }));
      }
      logError(err, 'post user/login');
      return sendError(err, res);
    }
  };

  const postToResetPw = async function postToResetPwAsync(req, res) {
    try {
      await resetPasswordService(req.body, connection);
      return res.send(JSON.stringify({ success: true }));
    } catch (err) {
      logError(err, 'post to resetPw');
      return sendError(err, res);
    }
  };

  const postToSignup = async function postToSignupAsync(req, res) {
    try {
      const userData = await signup(req.body, connection);
      return res.status(200).send(JSON.stringify(userData));
    } catch (err) {
      if (err && err.status !== 200) {
        logError(err, 'post user/signup');
      } else if (!err) {
        logError('unknown error in post user/signup');
      }
      return sendError(err, res);
    }
  };

  return {
    postToAddCoin,
    postToChangePw,
    postToForgotPw,
    postToLogin,
    postToResetPw,
    postToSignup
  };
}

export default userRouter;
