const chai = require('chai');
const sinon = require('sinon');
const linkWordToChild = require('./linkWordToChild');
const expect = chai.expect;

describe('Link Word To Child', () => {
  let connection;

  beforeEach('setup', () => {
    connection = { query() {} };
    global.logError = sinon.stub();
  });

  it('should reject 500 on no word || child || connection', () => {
    return linkWordToChild('test', undefined, connection)
      .then(ok => expect(ok).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
      });
  });

  it('should reject if db error', () => {
    sinon.stub(connection, 'query').callsArgWithAsync(2, { error: true });
    return linkWordToChild('test', 12, connection)
      .then(ok => expect(ok).to.be.false)
      .catch(err => {
        expect(logError.calledOnce).to.be.true;
        expect(err.status).to.equal(500);
        expect(/db error/i.test(logError.firstCall.args[1])).to.be.true;
      });
  });

  it('should resolve with wordId', () => {
    const wordId = 222;
    sinon.stub(connection, 'query').callsArgWithAsync(2, null, { wordId });
    return linkWordToChild('test', wordId, connection).then(wordVal =>
      expect(wordVal).to.equal(wordId)
    );
  });
});
