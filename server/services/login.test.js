import chai from 'chai';
import sinon from 'sinon';
import login from './login';
const expect = chai.expect;

describe('Login', function() {
  let body;
  let connection;

  beforeEach('setting up loginService tests', function() {
    body = { email: 'fakeUser1@gmail.com', password: 'password' };
    global.logError = sinon.stub();
    connection = { query() {} };
  });

  it('should reject if no email given', function() {
    sinon.stub(connection, 'query');
    body = Object.assign({}, body, { email: '' });
    return login(body, connection)
      .then(userData => expect(userData).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(400);
      });
  });

  it('should reject if no password given', function() {
    sinon.stub(connection, 'query');
    body = Object.assign({}, body, { password: '' });
    return login(body, connection)
      .then(userData => expect(userData).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(400);
      });
  });

  it('should reject if no connection passed', function() {
    connection = undefined;
    return login(body, connection)
      .then(userData => expect(userData).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('should reject with 500 on db error', function() {
    sinon.stub(connection, 'query').callsArgWithAsync(2, { error: true });
    return login(body, connection)
      .then(userData => expect(userData).to.be.false)
      .catch(err => {
        expect(logError.called).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('I have a black box test of this, not sure if a "success" test would help much here');
});
