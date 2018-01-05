import addCoinToDB from '../services/addCoinToDB';
import addWordToDbService from '../services/wordServices/addWordToDbService';
import changePasswordService from '../services/changePasswordService';
import login from '../services/login';
import nodemailerMailgun from '../services/createNodemailerMailgun';
import resetPasswordService from '../services/resetPasswordService';
import sendError from '../services/sendError';
import sendForgotPwEmail from '../services/sendForgotPwEmail';
import signup from '../services/signup';

function userRouter(connection) {

  const postToAddCoin = async function postToAddCoinAsync(req, res) {
    try {
      await addCoinToDB(req.body, connection);
      return res.status(200).send(JSON.stringify({ success: true }));
    } catch (err) {
      logError(err, 'post Add Coin');
      return res.status(200).send(JSON.stringify({ success: true }));
    }
  };

  const postToAddWord = async function postToAddWordAsync(req, res) {
    try {
      await addWordToDbService(req.body, connection);
      return res.status(200).send(JSON.stringify({ success: true }));
    } catch (err) {
      logError(err, 'post to Add Word');
      return sendError(err, res);
    }
  };

  const postToChangePw = async function postToChangePwAsync(req, res) {
    try {
      await changePasswordService(req.body, connection);
      res.status(200).send(JSON.stringify({ success: true }));
    } catch (err) {
      if (err && err.status === 401) {
        return res.status(401).send(JSON.stringify({ error: 'Invalid Password' }));
      }
      logError(err, 'post to changePassword');
      return sendError(err, res);
    }
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
    postToAddWord,
    postToChangePw,
    postToForgotPw,
    postToLogin,
    postToResetPw,
    postToSignup
  };
}

export default userRouter;
