const chai = require('chai');
const sinon = require('sinon');
const createTokenForEmail = require('./createTokenForEmail');
const expect = chai.expect;

describe('Create token for email', () => {
  let jwt;
  let email;
  beforeEach('setup mocks', () => {
    email = 'fake@gmail.com';
    jwt = { sign() {} };
    global.logError = sinon.stub();
  });

  it('should reject if no email given', () => {
    const jwtSign = sinon.spy(jwt, 'sign');
    return createTokenForEmail(undefined, jwt)
      .then(token => expect(token).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
        expect(jwtSign.called).to.be.false;
      });
  });

  it('should reject if jwt is undefined', () => {
    return createTokenForEmail(email)
      .then(token => expect(token).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('should reject if jwt throws', () => {
    const jwtSign = sinon
      .stub(jwt, 'sign')
      .callsArgWithAsync(3, { error: true });
    return createTokenForEmail(email, jwt)
      .then(token => expect(token).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('should resolve with token', () => {
    const token = 'wojfei23923823rnewoj';
    const jwtSign = sinon.stub(jwt, 'sign').callsArgWithAsync(3, null, token);
    return createTokenForEmail(email, jwt).then(response =>
      expect(response).to.equal(token)
    );
  });
});
