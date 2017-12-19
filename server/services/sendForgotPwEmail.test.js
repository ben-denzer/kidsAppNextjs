import chai from 'chai';
import sinon from 'sinon';
import sendForgotPwEmail from './sendForgotPwEmail';
const expect = chai.expect;

describe('Send Forgot Pw Email', function() {
  let reqBody;
  let nodemailerMailgun;
  let connection;

  beforeEach('mocking', function() {
    reqBody = { email: 'XXfake@gmail.comXX' };
    nodemailerMailgun = { sendMail() {} };
    connection = { query() {} };
    global.logError = sinon.stub();
  });

  it('should reject with 400 for no email', function() {
    return sendForgotPwEmail({ apiUrl: 'https://google.com' }, nodemailerMailgun, connection)
      .then(ok => expect(ok).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(400);
      });
  });

  it('should reject with 500 for no nodemailerMailgun', function() {
    return sendForgotPwEmail(reqBody, undefined, connection)
      .then(ok => expect(ok).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('should reject with 500 for no connection', function() {
    return sendForgotPwEmail(reqBody, nodemailerMailgun)
      .then(ok => expect(ok).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('should reject on db error', function() {
    sinon.stub(connection, 'query').callsArgWithAsync(2, { error: true });
    return sendForgotPwEmail(reqBody, nodemailerMailgun, connection)
      .then(ok => expect(ok).to.be.false)
      .catch(err => {
        expect(logError.called).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('should reject 401 for no user', function() {
    sinon.stub(connection, 'query').callsArgWithAsync(2, null, { parent_id: null });
    return sendForgotPwEmail(reqBody, nodemailerMailgun, connection)
      .then(ok => expect(ok).to.be.false)
      .catch(err => {
        expect(logError.called).to.be.true;
        expect(err.status).to.equal(401);
      });
  });

  it('should reject on sendMail error', function() {
    sinon.stub(connection, 'query').callsArgWithAsync(2, null, [{ parent_id: 12 }] );
    sinon.stub(nodemailerMailgun, 'sendMail').callsArgWithAsync(1, { error: true });
    return sendForgotPwEmail(reqBody, nodemailerMailgun, connection)
      .then(ok => expect(ok).to.be.false)
      .catch(err => {
        expect(logError.called).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('should resolve if sendMail is ok', function() {
    sinon.stub(connection, 'query').callsArgWithAsync(2, null, [{ parent_id: 12 }] );
    sinon.stub(nodemailerMailgun, 'sendMail').callsArgWithAsync(1, null, { info: true });
    return sendForgotPwEmail(reqBody, nodemailerMailgun, connection)
      .then(ok => expect(Boolean(ok)).to.be.true)
  });
});
