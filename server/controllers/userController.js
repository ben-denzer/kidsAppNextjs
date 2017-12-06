import signup from '../services/signup';

function userRouter(connection) {
  const postToSignup = async function(req, res, next) {
    try {
      const userId = await signup(req.body, connection);
      const user = { userId, coins: 0 };
      res.status(200).send('success');
    } catch(err) {
      if (err.status !== 200) {
        logError(err, 'post user/signup');
      }
      res.status(err.status || 500).send(err.error || 'Server Error');
    };
  };

  return { postToSignup };

}

export default userRouter;
