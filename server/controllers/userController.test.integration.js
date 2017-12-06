const expect = require('chai').expect;
const sinon = require('sinon');
const mysql = require('mysql');
const dbInfo = require('../keys/.dbKeys');
const connection = mysql.createConnection(dbInfo);
const signup = require('../services/signup').signup;
const userController = require('./userController')(connection);

describe('User Controller', function() {
  let req;
  let res;
  beforeEach('setting up req and res', function() {
    req = {
      login: sinon.stub()
    },
    res = {
      status() { return this },
      send() {}
    }
    resStatus = sinon.spy(res, 'status');
    resSend = sinon.spy(res, 'send');
  });

  describe('Signup BlackBox', function() {
    let body;
    beforeEach('setting up body', function() {
      body = {
        apiUrl: undefined,
        childCount: 1,
        email: 'XXfake@gmail.comXX',
        password: 'fakePassword',
        p2: 'fakePassword'
      };

      global.logError = sinon.stub();
      req = Object.assign({}, req, { body });
    });

    it('should sign up a user', async function() {
      try {
        await userController.postToSignup(req, res);
      }
      catch(e) { expect(e).to.be.null; }

      expect(resSend.calledOnce).to.be.true;
      expect(resStatus.calledOnce).to.be.true;
      expect(resStatus.firstCall.args[0]).to.equal(200);
      expect(logError.called).to.be.false;
      connection.query('DELETE FROM parent WHERE email = "XXfake@gmail.comXX"');
    });

    it('should fail and send 400 for incorrect arguments', async function() {
      req.body = Object.assign({}, req.body, { email: '' });
      try {
        await userController.postToSignup(req, res);
      }
      catch(e) { expect(e).to.be.null; }

      expect(resSend.calledOnce).to.be.true;
      expect(resStatus.calledOnce).to.be.true;
      expect(resStatus.firstCall.args[0]).to.equal(400);
    });

    it('should fail and send 500 on unknown error', async function() {
      sinon.stub(connection, 'query').callsArgAsync(2, { error: true });
      try {
        await userController.postToSignup(req, res);
      }
      catch(e) { expect(e).to.be.null; }

      expect(resSend.calledOnce).to.be.true;
      expect(resStatus.calledOnce).to.be.true;
      expect(resStatus.firstCall.args[0]).to.equal(500);
    });
  });
});
