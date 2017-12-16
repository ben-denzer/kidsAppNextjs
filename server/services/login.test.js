import chai from 'chai';
import sinon from 'sinon';
import login from './login';
const expect = chai.expect;

describe.skip('Login Service', function() {
  let body;
  let connection = {};
  beforeEach('setting up loginService tests', function() {
    body = { email: 'fakeUser1@gmail.com', password: 'password' };
    global.logError = sinon.stub();
  });

  it('should reject if no email given', function() {
    connection = { query: sinon.stub() };
    body = Object.assign({}, body, { email: '' });
    return login(body, connection)
      .then(userData => expect(userData).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('should reject if no password given', function() {
    connection = { query: sinon.stub() };
    body = Object.assign({}, body, { password: '' });
    return login(body, connection)
      .then(userData => expect(userData).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
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

  it('should resolve if correct');
});
