const chai = require('chai');
const sinon = require('sinon');
const verifyPasswordAndReturnId = require('./verifyPasswordAndReturnId');
const expect = chai.expect;

describe('Verify Password', () => {
  let bcrypt;
  let body;
  let connection;

  beforeEach('setting up bcrypt and logError', () => {
    global.logError = sinon.stub();
    body = { email: 'fake@gmail.com', password: 'fakePassword' };
    bcrypt = { compare() {} };
    connection = { query() {} };
  });

  it('should reject if no email || password', () => {
    sinon.stub(connection, 'query');
    body = Object.assign({}, body, { email: '' });
    return verifyPasswordAndReturnId(body, connection, bcrypt)
      .then(id => expect(id).to.be.false)
      .catch(e => {
        expect(logError.calledOnce).to.be.true;
        expect(e.status).to.equal(500);
      });
  });

  it('should reject if no connection', () => {
    return verifyPasswordAndReturnId(body)
      .then(id => expect(id).to.be.false)
      .catch(e => {
        expect(logError.calledOnce).to.be.true;
        expect(e.status).to.equal(500);
      });
  });

  it('should reject if no bcrypt', () => {
    return verifyPasswordAndReturnId(body, {})
      .then(id => expect(id).to.be.false)
      .catch(e => {
        expect(logError.calledOnce).to.be.true;
        expect(e.status).to.equal(500);
      });
  });

  it('should reject on db error', () => {
    sinon.stub(connection, 'query').callsArgWithAsync(2, { error: true });
    return verifyPasswordAndReturnId(body, connection)
      .then(id => expect(id).to.be.false)
      .catch(e => {
        expect(logError.calledOnce).to.be.true;
        expect(e.status).to.equal(500);
      });
  });

  it('should reject on bcrypt error', () => {
    sinon
      .stub(connection, 'query')
      .callsArgWithAsync(2, null, [ { parent_id: 1, password: 'asdf' } ]);
    sinon.stub(bcrypt, 'compare').rejects();
    return verifyPasswordAndReturnId(body, connection, bcrypt)
      .then(id => expect(id).to.be.false)
      .catch(e => {
        expect(logError.calledOnce).to.be.true;
        expect(e.status).to.equal(500);
      });
  });

  it('should reject with 401 on no email found', () => {
    sinon.stub(connection, 'query').callsArgWithAsync(2, null, []);
    return verifyPasswordAndReturnId(body, connection, bcrypt)
      .then(id => expect(id).to.be.false)
      .catch(e => {
        expect(e.status).to.equal(401);
      });
  });

  it('should reject with 401 on bad password', () => {
    sinon
      .stub(connection, 'query')
      .callsArgWithAsync(2, null, [ { parent_id: 1, password: 'asdf' } ]);
    sinon.stub(bcrypt, 'compare').resolves(null);
    return verifyPasswordAndReturnId(body, connection, bcrypt)
      .then(id => expect(id).to.be.false)
      .catch(e => {
        expect(e.status).to.equal(401);
      });
  });

  it('should return parentId on success', () => {
    sinon
      .stub(connection, 'query')
      .callsArgWithAsync(2, null, [ { parent_id: 1, password: 'asdf' } ]);
    sinon.stub(bcrypt, 'compare').resolves(true);
    return verifyPasswordAndReturnId(body, connection, bcrypt).then(id =>
      expect(typeof id).to.equal('number')
    );
  });
});
