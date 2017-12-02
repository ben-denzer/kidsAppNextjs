const userController          = require('express').Router();
const passport                = require('passport');
const jsonParser              = require('body-parser').json();
const jwt                     = require('jsonwebtoken');
const jwtInfo                 = require('../keys/.jwtinfo').key;

const changePw                = require('../services/changePw');
const checkEmailVerification  = require('../services/checkEmailVerification');
const checkLoginToken         = require('../services/checkLoginToken');
const createUserToken         = require('../services/createUserToken');
const getUserFromEmail        = require('../services/getUserFromEmail');
const resetPw                 = require('../services/resetPw');
const sendPwReset             = require('../services/sendPwReset');
const sendVerificationEmail   = require('../services/sendVerificationEmail');
const signup                  = require('../services/signup');
const subscribeUserToList     = require('../services/subscribeUserToList');
const verifyUser              = require('../services/verifyUser');

function userRouter(connection) {
  // userController.use(jsonParser);

  // userController.post('/changePw', (req, res) => {
  //   const { oldPw, newPw } = req.body;
  //   if (!req.user) {
  //     logError('trying to changePw when not logged in - user/changePw')
  //     return res.status(401).send();
  //   }
  //   if (!oldPw || !newPw || newPw.length < 8) {
  //     logError({ reqBody: req.body }, 'bad request in user/changePw');
  //     return res.status(400).send('Bad Request');
  //   }

  //   changePw(req.user.userId, oldPw, newPw, connection)
  //     .then(() => res.status(200).send('Changed Password Successfully'))
  //     .catch(err => {
  //       if (err && err.status !== 401) logError(err, 'post changePw');
  //       if (err && err.status && err.status < 500) return res.status(err.status).send(err.error);
  //       res.status(500).send('Something Went Wrong, Please Try Again Later');
  //     })
  // });

  // userController.route('/forgotPw')
  //   .get((req, res) => {
  //     res.status(200).render('account/forgotPw', {
  //       headline: 'Forgot Password',
  //       user: req.user
  //     });
  //   })
  //   .post((req, res) => {
  //     sendPwReset(req.body, connection)
  //       .then(() => { res.status(200).send() })
  //       .catch((err) => {
  //         if (err.status !== 401) logError(err, 'post forgotPw');

  //         res.status(err.status || 500).send(err.error || 'Server Error');
  //       });
  //   });

  userController.get('/', (req, res) => res.send('working'));

  userController.route('/login')
    .get((req, res) => {
      const message = req.flash('error');
      res.status(200).render(
        'account/login',
        {
          headline: 'Log In',
          user: req.user,
          message,
        }
      );
    })
    .post(passport.authenticate('local', {
      failureRedirect: '/user/login',
      failureFlash: 'Invalid Username or Password'
      }), (req, res) => {
        res.redirect('/user/account');
      }
    );

  userController.post('/loginWithToken', jsonParser, (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(200).send('unauthorized');

    checkLoginToken(token, connection)
      .then((user) => { req.login(user, () => res.status(200).send('success')) })
      .catch((err) => {
        // status is just for logging here
        if (err && err.status !== 200) {
          logError(err, 'in checkLoginToken');
        }
        res.status(200).send('unauthorized');
      });
  });

  userController.get('/logout', (req, res) => {
    req.logout();
    res.cookie('ottId', null, { maxAge: 0 }).redirect('/');
  });

  // userController.post('/resendVerificationEmail/', (req, res) => {
  //   sendVerificationEmail(req.body, connection);
  //   res.status(200).send('success');
  // });

  // userController.route('/reset/:token')
  //   .get((req, res) => {
  //     if (!req.params.token) return res.status(200).redirect('/');

  //     jwt.verify(req.params.token, jwtInfo, (err, data) => {
  //       if (err) {
  //         try {
  //           if (JSON.parse(JSON.stringify(err)).name === 'TokenExpiredError') {
  //             return res.status(401).send('unauthorized - your token may have expired');
  //           }
  //         } catch (e) {
  //           logError({ realError: err, caughtError: e }, 'in catch - user/reset/:token');
  //         }
  //         logError(err, 'in get user/reset/token');
  //         return res.status(500).send('Server Error');
  //       }
  //       if (!data) {
  //         // don't log this
  //         return res.status(401).send('unauthorized - your token may have expired');
  //       }

  //       res.status(200).render('account/resetForm', {
  //         headline: 'Reset Password',
  //         user: req.user,
  //         message: req.flash('error')
  //       });
  //     });
  //   })
  //   .post((req, res) => {
  //     if (!req.params.token) {
  //       logError('trying to post to user/reset/token without a token');
  //       return res.status(401).send('unauthorized - your token may have expired');
  //     }
  //     jwt.verify(req.params.token, jwtInfo, (err, data) => {
  //       if (err) {
  //         if (JSON.parse(JSON.stringify(err)).name !== 'TokenExpiredError') {
  //           logError(err, 'jwt verify in user/reset/token');
  //         }
  //         return res.status(401).send('unauthorized - your token may have expired');
  //       }
  //       if (!data) {
  //         // don't log this
  //         return res.status(401).send('unauthorized - your token may have expired');
  //       }

  //       resetPw(req.body.password, data.email, connection)
  //         .then(() => { res.status(200).send() })
  //         .catch((err) => {
  //           logError(err, 'resetPw in post user/reset/token');
  //           res.status(err.status || 500).send(err.error || 'Server Error');
  //         });
  //     });
  //   });

  userController.post('/signup', jsonParser, (req, res) => {
    console.log(req.body, 'reqBody');
    signup(req.body, connection)
      .then(userId => {
        const user = { userId, coins: 0 };
        res.status(200).send('success');
        return;
        // req.login(user, () => res.status(200).send({ success }));
      })
      .catch(err => {
        console.log('error', err);
        if (err.status !== 200) {
          logError(err, 'post user/signup');
        }
        res.status(err.status || 500).send(err.error || 'Server Error');
      });
  });

    // userController.get('/verifyAccount/:token', (req, res) => {
    //   if (!req.params.token) return res.status(200).redirect('/');

    //   jwt.verify(req.params.token, jwtInfo, (err, data) => {
    //     if (err) {
    //       logError(err, 'jwt verify in user/reset/token');
    //       return res.status(500).send('Server Error');
    //     }
    //     verifyUser(data, connection)
    //       .then(() => getUserFromEmail(data.email, connection))
    //       .then(({ user, emailList }) => {
    //         if (emailList) subscribeUserToList(data.email, connection);

    //         req.login(user, () => {
    //           res.status(200).render('account/verifiedSuccess', {
    //             headline: 'Success',
    //             user: req.user,
    //             message: 'Your Account Has Been Verified'
    //           });
    //         });
    //       })
    //       .catch(err => {
    //         logError(err, 'Error Verifying User in user/verifyAccount');
    //         res.status(200).render('account/verifiedSuccess', {
    //           headline: 'Error',
    //           user: req.user,
    //           message: 'There was an error verifying your account, your token may have expired'
    //         });
    //       });
    //   });
    // });

    return userController;
}

module.exports = userRouter;
