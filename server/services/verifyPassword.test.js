import chai from 'chai';
import sinon from 'sinon';
import verifyPassword from './verifyPassword';
const expect = chai.expect;

describe('Verify Password', function() {
  let bcrypt;
  let body;
  let connection;

  beforeEach('setting up bcrypt and logError', function() {
    global.logError = sinon.stub();
    body = { email: 'fake@gmail.com', password: 'fakePassword' };
    bcrypt = { compare() {} };
    connection = { query() {} };
  });

  it('should reject if no email || password', function() {
    sinon.stub(connection, 'query');
    body = Object.assign({}, body, { email: '' });
    return verifyPassword(body, connection, bcrypt)
      .then(id => expect(id).to.be.false)
      .catch(e => {
        expect(logError.calledOnce).to.be.true;
        expect(e.status).to.equal(500);
      });
  });

  it('should reject if no connection', function() {
    return verifyPassword(body)
      .then(id => expect(id).to.be.false)
      .catch(e => {
        expect(logError.calledOnce).to.be.true;
        expect(e.status).to.equal(500);
      });
  });

  it('should reject if no bcrypt', function() {
    return verifyPassword(body, {})
      .then(id => expect(id).to.be.false)
      .catch(e => {
        expect(logError.calledOnce).to.be.true;
        expect(e.status).to.equal(500);
      });
  });

  it('should reject on db error', function() {
    sinon.stub(connection, 'query').callsArgWithAsync(2, { error: true });
    return verifyPassword(body, connection)
      .then(id => expect(id).to.be.false)
      .catch(e => {
        expect(logError.calledOnce).to.be.true;
        expect(e.status).to.equal(500);
      });
  });

  it('should reject on bcrypt error', function() {
    sinon.stub(connection, 'query').callsArgWithAsync(2, null, [{ parent_id: 1, password: 'asdf' }]);
    sinon.stub(bcrypt, 'compare').rejects();
    return verifyPassword(body, connection, bcrypt)
      .then(id => expect(id).to.be.false)
      .catch(e => {
        expect(logError.calledOnce).to.be.true;
        expect(e.status).to.equal(500);
      });
  });

  it('should reject with 401 on bad password', function() {
    sinon.stub(connection, 'query').callsArgWithAsync(2, null, [{ parent_id: 1, password: 'asdf' }]);
    sinon.stub(bcrypt, 'compare').resolves(null);
    return verifyPassword(body, connection, bcrypt)
      .then(id => expect(id).to.be.false)
      .catch(e => {
        expect(e.status).to.equal(401);
      });
  });

  it('should return parentId on success', function() {
    sinon.stub(connection, 'query').callsArgWithAsync(2, null, [{ parent_id: 1, password: 'asdf' }]);
    sinon.stub(bcrypt, 'compare').resolves(true);
    return verifyPassword(body, connection, bcrypt)
      .then(id => expect(typeof id).to.equal('number'))
  });
});
