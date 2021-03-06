const addCoinToDB = require('../services/addCoinToDB');
const addWordToDbService = require('../services/wordServices/addWordToDbService');
const changePasswordService = require('../services/changePasswordService');
const getAllParentDataService = require('../services/getAllParentDataService');
const getAllWordsForChild = require('../services/wordServices/getAllWordsForChild');
const getCoinsForActiveUser = require('../services/getCoinsForActiveUser');
const login = require('../services/login');
const nodemailerMailgun = require('../services/createNodemailerMailgun');
const removeWordFromChild = require('../services/wordServices/removeWordFromChild');
const resetPasswordService = require('../services/resetPasswordService');
const sendError = require('../services/sendError');
const sendForgotPwEmail = require('../services/sendForgotPwEmail');
const signup = require('../services/signup');
const validateAccountStatus = require('../services/validateAccountStatus');

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
      const wordId = await addWordToDbService(req.body, connection);
      return res.status(200).send(JSON.stringify({ wordId }));
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
        return res
          .status(401)
          .send(JSON.stringify({ error: 'Invalid Password' }));
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
        return res
          .status(401)
          .send(JSON.stringify({ error: 'Email Not On File' }));
      }
      logError(err, 'post Forgot PW');
      return sendError(err, res);
    }
  };

  const postToGetAllParentData = async function postToGetAllParentDataAsync(
    req,
    res
  ) {
    try {
      const parentData = await getAllParentDataService(req.body, connection);
      return res.status(200).send(JSON.stringify(parentData));
    } catch (err) {
      logError(err, 'in postToGetAllParentData');
      return sendError(err, res);
    }
  };

  const postToGetCoins = async function postToGetCoinsAsync(req, res) {
    try {
      const coins = await getCoinsForActiveUser(req.body.childId, connection);
      const response = JSON.stringify({ coins });
      return res.status(200).send(response);
    } catch (err) {
      logError(err, 'in postToGetCoins');
      return sendError(err, res);
    }
  };

  const postToGetWordsForChild = async function postToGetWordsForChildAsync(
    req,
    res
  ) {
    try {
      const allWords = await getAllWordsForChild(req.body, connection);
      return res.status(200).send(JSON.stringify(allWords));
    } catch (err) {
      logError(err, 'in postToGetWordsForChild');
      return sendError(err, res);
    }
  };

  const postToLogin = async function postToLoginAsync(req, res) {
    try {
      const userData = await login(req.body, connection);
      return res.status(200).send(JSON.stringify(userData));
    } catch (err) {
      if (err && err.status === 401) {
        return res
          .status(401)
          .send(JSON.stringify({ error: 'Invalid Username Or Password ' }));
      }
      logError(err, 'post user/login');
      return sendError(err, res);
    }
  };

  const postToRemoveWordFromChild = async function postToRemoveWordFromChildAsync(
    req,
    res
  ) {
    try {
      await removeWordFromChild(req.body, connection);
      return res.send(JSON.stringify({ success: true }));
    } catch (err) {
      logError(err, 'post to removeWordFromChild');
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

  const postToValidateAccount = async function postToValidateAccountAsync(
    req,
    res
  ) {
    try {
      const status = await validateAccountStatus(req.body, connection);
      return res.status(200).send(JSON.stringify(status));
    } catch (err) {
      logError(err, 'error in postToValidateAccount');
      return sendError(err, res);
    }
  };

  return {
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
  };
}

module.exports = userRouter;
