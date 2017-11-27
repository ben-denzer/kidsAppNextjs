const apiController = require('express').Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlParser = bodyParser.urlencoded({ extended: true });
const checkEmail = require('../services/checkEmail');
const checkUsername = require('../services/checkUsername');
const submitFeedback = require('../services/submitFeedback');

function router(connection) {
  apiController.post('/checkForUniqueAccount', jsonParser, (req, res) => {
    Promise.all([ 
      checkUsername(req.body.username, connection),
      checkEmail(req.body.email, connection)
    ])
      .then(() => res.status(200).send())
      .catch(err => {
        if (err && err.status !== 200) logError(err, 'post api/checkUsername');

        res.status(err && err.status ? err.status : 500).send(err && err.error ? err.error : 'Server Error');
      });
  });

  apiController.post('/getAllScores', (req, res) => {
    if (!req.user || !req.user.userId) {
      return res.status(401).send('Please log in to continue');
    }
    Promise.all([
      getTypingScores(req.user.userId, connection),
      getTenKeyScores(req.user.userId, connection)
    ])
      .then(([typing, tenKey]) => res.status(200).send({ typing, tenKey }))
      .catch(err => {
        logError(err, 'get api/getAllScores');
        res.status(err && err.status ? err.status : 500).send(err && err.error ? err.error : 'Server Error');
      });
  });

  apiController.post('/getAccountInfo', (req, res) => {
    if (!req.user || !req.user.userId) {
      return res.status(401).send('Please log in to continue');
    }
    connection.query(
      'SELECT email, date FROM users WHERE user_id = ?',
      [ req.user.userId ],
      (err, rows) => {
        if (err) {
          logError(err, 'db error in  apiController/getAccountInfo');
          return res.status(500).send('Server Error');
        }
        if (!req.user) {
          logError('hitting getAccountInfo with no user');
          return res.status(401).send('Unauthorized');
        }
        const { date, email } = rows[0];
        res.status(200).send({ joined: date, accountEmail: email });
      }
    )
  });

  apiController.post('/saveTenKeyData', jsonParser, (req, res) => {
    const user = req.user && req.user.userId ? req.user.userId : 0;
    saveTenKeyData(req.body, user, connection)
      .then(() => { res.status(200).send() })
      .catch(err => { 
        logError({ err, body: req.body }, 'post api/saveTenKeyData');
        // user has no need to see errors here
        res.status(200).send()
      });
  });

  apiController.post('/saveTypingTestData', jsonParser, (req, res) => {
    const user = req.user && req.user.userId ? req.user.userId : 0;
    saveTypingTestData(req.body, user, connection)
      .then(() => { res.status(200).send() })
      .catch(err => {
        logError(err, 'post api/saveTypingTestData');
        // user has no need to see errors here
        res.status(200).send() 
      });
  });

  apiController.post('/submitFeedback', jsonParser, (req, res) => {
    submitFeedback(req.body, connection)
    .then(() => { res.status(200).send() })
    .catch(err => { 
      logError(err, 'post api/submitFeedback');
      // user has no need to see errors here
      res.status(200).send() 
    });
  });

  return apiController;
}

module.exports = router;
