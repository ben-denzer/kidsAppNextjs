const chai = require('chai');
const sinon = require('sinon');
const getAllData = require('./getAllData');
const expect = chai.expect;

describe('Get All Data', () => {
  let connection;
  let parentId;

  beforeEach('setup', () => {
    global.logError = sinon.stub();
    connection = { query() {} };
    parentId = 12;
  });

  it('Should reject if it no parentId', () => {
    parentId = undefined;
    return getAllData(parentId, connection)
      .then(userData => expect(userData).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('Should reject if no connection', () => {
    return getAllData(parentId)
      .then(userData => expect(userData).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('Should reject on db error', () => {
    sinon.stub(connection, 'query').callsArgWithAsync(2, { error: true });
    return getAllData(parentId, connection)
      .then(userData => expect(userData).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(/db error/i.test(logError.firstCall.args[1])).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('Should reject 401 if no user data found', () => {
    sinon.stub(connection, 'query').callsArgWithAsync(2, null, []);
    return getAllData(parentId, connection)
      .then(userData => expect(userData).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(401);
      });
  });

  it('Should resolve with user data', () => {
    sinon
      .stub(connection, 'query')
      .callsArgWithAsync(2, null, [ { success: true } ]);
    return getAllData(parentId, connection).then(
      userData => expect(Boolean(userData)).to.be.true
    );
  });
});
