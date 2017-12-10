import signup from '../services/signup';

function userRouter(connection) {
  const postToSignup = async function(req, res, next) {
    try {
      const userData = await signup(req.body, connection);
      res.status(200).send(userData);
    } catch(err) {
      if (err.status !== 200) {
        logError(err, 'post user/signup');
      }
      res.status(err.status || 500).send(err.error || 'Server Error #URPTSU');
    };
  };

  return { postToSignup };

}

export default userRouter;
