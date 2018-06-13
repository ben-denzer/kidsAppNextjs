const chai = require('chai');
const sinon = require('sinon');
const addWordToDbService = require('./addWordToDbService');
const expect = chai.expect;

describe('Add Word To DB', () => {
  let connection;
  let body;

  beforeEach('setup', () => {
    body = { childId: 12, word: 'test', token: 'asdfklasdjf' };
    connection = { query() {} };
    global.logError = sinon.stub();
  });

  it('should reject 400 on no childId or word', () => {
    body = { childId: 12 };
    return addWordToDbService(body, connection)
      .then(ok => expect(ok).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(400);
      });
  });

  it('should reject 500 on no connection', () => {
    return addWordToDbService(body)
      .then(ok => expect(ok).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('should have some integration tests here');
});
