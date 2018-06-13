const chai = require('chai');
const sinon = require('sinon');
const validateJwt = require('./validateJwt');
const expect = chai.expect;

describe('Validate Jwt', () => {
  let jwt;
  let token = 'sdklfoifpoaiweewoir98';
  beforeEach('mocking', () => {
    global.logError = sinon.stub();
    jwt = { verify() {} };
  });

  it('should reject if !token || !jwt', () => {
    return validateJwt(undefined)
      .then(tokenBody => expect(tokenBody).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('should reject 401 without logging on tokenExpired', () => {
    sinon
      .stub(jwt, 'verify')
      .callsArgWithAsync(3, { name: 'TokenExpiredError' });
    return validateJwt(token, jwt)
      .then(tokenBody => expect(tokenBody).to.be.false)
      .catch(err => {
        expect(logError.called).to.be.false;
        expect(err.status).to.equal(401);
      });
  });

  it('should reject 500 on other jwt errors', () => {
    sinon.stub(jwt, 'verify').callsArgWithAsync(3, { name: 'otherError' });
    return validateJwt(token, jwt)
      .then(tokenBody => expect(tokenBody).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('should resolve with token body', () => {
    const tBody = { email: 'fake@gmail.com' };
    sinon.stub(jwt, 'verify').callsArgWithAsync(3, null, tBody);
    return validateJwt(token, jwt).then(tokenBody =>
      expect(tokenBody).to.deep.equal(tBody)
    );
  });
});
