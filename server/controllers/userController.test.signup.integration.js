const chai = require('chai');
const sinon = require('sinon');
const mysql = require('mysql');
const dbInfo = require('../keys/.dbKeys');
const userControllerModule = require('./userController');
const connection = mysql.createConnection(dbInfo);
const expect = chai.expect;
const userController = userControllerModule(connection);

describe('Signup BlackBox', () => {
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
      childCount: 2,
      children: [ 'fake1', 'fake2' ],
      email: 'XXfake@gmail.comXX',
      password: 'fakePassword',
      p2: 'fakePassword'
    };

    global.logError = sinon.stub();
    req = Object.assign({}, req, { body });
  });

  it('should sign up a user', async() => {
    connection.query(
      'DELETE FROM parent WHERE email = "XXfake@gmail.comXX"',
      () => {}
    );

    try {
      await userController.postToSignup(req, res);
    } catch (e) {
      expect(e).to.be.null;
    }

    expect(resSend.calledOnce).to.be.true;
    const { token, children } = JSON.parse(resSend.firstCall.args[0]);
    expect(typeof token).to.equal('string');
    expect(Array.isArray(children)).to.be.true;
    expect(children.length).to.equal(2);
    expect(typeof children[1].child_id).to.equal('number');
    expect(typeof children[0].username).to.equal('string');
    expect(typeof children[0].coins).to.equal('number');
    expect(resStatus.calledOnce).to.be.true;
    expect(resStatus.firstCall.args[0]).to.equal(200);
    expect(logError.called).to.be.false;
    connection.query(
      'DELETE FROM parent WHERE email = "XXfake@gmail.comXX"',
      () => {}
    );
  });

  it('should fail and send 400 for incorrect arguments', async() => {
    req.body = Object.assign({}, req.body, { email: '' });
    try {
      await userController.postToSignup(req, res);
    } catch (e) {
      expect(e).to.be.null;
    }

    expect(resSend.calledOnce).to.be.true;
    expect(resStatus.calledOnce).to.be.true;
    expect(resStatus.firstCall.args[0]).to.equal(400);
  });

  it('should fail and send 500 on unknown error', async() => {
    sinon.stub(connection, 'query').callsArgAsync(2, { error: true });
    try {
      await userController.postToSignup(req, res);
    } catch (e) {
      expect(e).to.be.null;
    }

    expect(resSend.calledOnce).to.be.true;
    expect(resStatus.calledOnce).to.be.true;
    expect(resStatus.firstCall.args[0]).to.equal(500);
  });

  after('cleanup', () => {
    connection.end();
  });
});
