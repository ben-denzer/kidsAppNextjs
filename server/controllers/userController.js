import signup from '../services/signup';
import login from '../services/login';
import sendError from '../services/sendError';

function userRouter(connection) {

  const postToLogin = async function(req, res) {
    try {
      const userData = await login(req.body, connection);
      console.log('success!!', userData)
      res.status(200).send(JSON.stringify(userData));
    } catch(err) {
      if (err && err.status === 401) {
        return res.status(401).send(JSON.stringify({ error: 'Invalid Username Or Password ' }));
      }
      logError(err, 'post user/login');
      sendError(err, res);
    }
  };

  const postToSignup = async function(req, res) {
    try {
      const userData = await signup(req.body, connection);
      res.status(200).send(JSON.stringify(userData));
    } catch(err) {
      if (err && err.status !== 200) {
        logError(err, 'post user/signup');
      }
      sendError(err, res);
    };
  };

  return {
    postToLogin,
    postToSignup
  };
}

export default userRouter;
