import chai from 'chai';
import sinon from 'sinon';
import getAllData from './getAllData';
const expect = chai.expect;

describe('Get All Data', function() {
  let connection;
  let parentId;

  beforeEach('setup', function() {
    global.logError = sinon.stub();
    connection = { query() {} };
    parentId = 12;
  });

  it('Should reject if it no parentId', function() {
    parentId = undefined;
    return getAllData(parentId, connection)
      .then(userData => expect(userData).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('Should reject if no connection', function() {
    return getAllData(parentId)
      .then(userData => expect(userData).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('Should reject on db error', function() {
    sinon.stub(connection, 'query').callsArgWithAsync(2, { error: true });
    return getAllData(parentId, connection)
      .then(userData => expect(userData).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(/db error/i.test(logError.firstCall.args[1])).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('Should reject 401 if no user data found', function() {
    sinon.stub(connection, 'query').callsArgWithAsync(2, null, []);
    return getAllData(parentId, connection)
      .then(userData => expect(userData).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(401);
      });
  });

  it('Should resolve with user data', function() {
    sinon.stub(connection, 'query').callsArgWithAsync(2, null, [{ success: true }]);
    return getAllData(parentId, connection)
      .then(userData => expect(Boolean(userData)).to.be.true)
  });
});
