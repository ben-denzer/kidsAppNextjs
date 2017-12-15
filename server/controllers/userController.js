import signup from '../services/signup';
import login from '../services/login';
import sendError from '../services/sendError';
import sendForgotPwEmail from '../services/sendForgotPwEmail';

function userRouter(connection) {

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

  const postToForgotPw = async function postToForgotPwAsync(req, res) {
    try {
      await sendForgotPwEmail(req.body, connection);
      return res.status(200).send(JSON.stringify({ success: true }));
    } catch (err) {
      if (err && err.status === 401) {
        return res.status(401).send(JSON.stringify({ error: 'Email Not On File' }));
      }
      return sendError(err, res);
    }
  };

  return {
    postToForgotPw,
    postToLogin,
    postToSignup
  };
}

export default userRouter;
