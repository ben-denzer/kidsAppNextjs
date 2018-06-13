const chai = require('chai');
const sinon = require('sinon');
const mysql = require('mysql');
const dbInfo = require('../keys/.dbKeys');
const userControllerModule = require('./userController');
const connection = mysql.createConnection(dbInfo);
const expect = chai.expect;
const userController = userControllerModule(connection);

describe('Login BlackBox', () => {
  let req;
  let res;
  let resStatus;
  let resSend;
  let body;

  beforeEach('setting up req and res', () => {
    req = {}, res = {
      status() {
        return this;
      },
      send() {}
    };
    resStatus = sinon.spy(res, 'status');
    resSend = sinon.spy(res, 'send');

    body = {
      apiUrl: undefined,
      childCount: 1,
      children: [ 'fake1' ],
      email: 'XXfake@gmail.comXX',
      password: 'fakePassword',
      p2: 'fakePassword'
    };

    global.logError = sinon.stub();
    req = Object.assign({}, req, { body });
  });

  describe('Login Blackbox', () => {
    it('should fail and send 400 for incorrect arguments', async() => {
      req.body = Object.assign({}, req.body, { email: '' });
      try {
        await userController.postToLogin(req, res);
      } catch (e) {
        expect(e).to.be.null;
      }

      expect(resSend.calledOnce).to.be.true;
      expect(resStatus.calledOnce).to.be.true;
      expect(resStatus.firstCall.args[0]).to.equal(400);
    });

    it('should fail and send 401 for invalid credentials', async() => {
      req.body = Object.assign({}, req.body, {
        email: 'sdfkj@sldk.com',
        password: 'swoief'
      });
      try {
        await userController.postToLogin(req, res);
      } catch (e) {
        expect(e).to.be.null;
      }

      expect(resSend.calledOnce).to.be.true;
      expect(resStatus.calledOnce).to.be.true;
      expect(resStatus.firstCall.args[0]).to.equal(401);
    });

    it('should log a user in', async function() {
      this.timeout(3000);
      let body = {
        apiUrl: undefined,
        childCount: 1,
        children: [ 'fake1' ],
        email: 'XXfake@gmail.comXX',
        password: 'fakePassword',
        p2: 'fakePassword'
      };

      req = Object.assign({}, req, { body });

      connection.query(
        'DELETE FROM parent WHERE email = "XXfake@gmail.comXX"',
        () => {}
      );

      try {
        await userController.postToSignup(req, res);
        await userController.postToLogin(req, res);
      } catch (e) {
        expect(e).to.be.null;
      }

      expect(resSend.calledTwice).to.be.true;
      const { token, children } = JSON.parse(resSend.secondCall.args[0]);
      expect(typeof token).to.equal('string');
      expect(Array.isArray(children)).to.be.true;
      expect(resStatus.calledTwice).to.be.true;
      expect(resStatus.secondCall.args[0]).to.equal(200);
      expect(logError.called).to.be.false;
      connection.query(
        'DELETE FROM parent WHERE email = "XXfake@gmail.comXX"',
        () => {}
      );
    });
  });

  after('cleanup', () => {
    connection.end();
  });
});
