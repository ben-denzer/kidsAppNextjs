import signup from '../services/signup';
import login from '../services/login';

function userRouter(connection) {

  const postToLogin = async function(req, res) {
    try {
      const userData = await login(req.body, connection);
      res.status(200).send(JSON.stringify(userData));
    } catch(err) {
      if (err && err.status === 401) {
        return res.status(401).send(JSON.stringify({ error: 'Invalid Username Or Password ' }));
      }
      logError(err, 'post user/login');
      res.status(500).send(JSON.stringify({ error: 'Server Error #URPTLI' }));
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
      res.status(500).send(JSON.stringify({ error: 'Server Error #URPTSU' }));
    };
  };

  return {
    postToLogin,
    postToSignup
  };
}

export default userRouter;
