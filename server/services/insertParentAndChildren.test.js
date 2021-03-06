const chai = require('chai');
const sinon = require('sinon');
const insertParentAndChildren = require('./insertParentAndChildren');
const expect = chai.expect;

describe('Insert Parent', () => {
  let body;
  beforeEach('setting up logError and body', () => {
    global.logError = sinon.spy();
    body = {
      childCount: '1',
      children: [ 'child1' ],
      email: 'fake@gmail.com',
      emailList: false
    };
  });

  it('should reject if any arg is undefined', () => {
    return insertParentAndChildren(body, '#rewoirjeo33434')
      .then(success => expect(success).to.be.false)
      .catch(e => {
        expect(logError.called).to.be.true;
        expect(e.status).to.equal(500);
      });
  });

  it('should log each missing arg', () => {
    return insertParentAndChildren()
      .then(success => expect(success).to.be.false)
      .catch(e => {
        expect(logError.calledThrice).to.be.true;
        expect(logError.firstCall.args[0]).to.include('no body');
        expect(logError.secondCall.args[0]).to.include('no hash');
        expect(logError.thirdCall.args[0]).to.include('no connection');
      });
  });

  it('should reject if body is missing email', () => {
    body = Object.assign({}, body, { email: '' });
    const connection = {
      query: sinon.stub()
    };

    return insertParentAndChildren(body, 'seroijeroij', connection)
      .then(success => expect(success).to.be.false)
      .catch(e => {
        expect(logError.calledOnce).to.be.true;
        expect(logError.firstCall.args[0]).to.deep.equal(body);
      });
  });

  it('should reject on db error', () => {
    const connection = {
      query: sinon.stub().callsArgWithAsync(2, { error: true })
    };

    return insertParentAndChildren(body, 'slfjaoiwj', connection)
      .then(success => expect(success).to.be.false)
      .catch(e => {
        expect(logError.calledOnce).to.be.true;
        expect(logError.firstCall.args[1]).to.include('insertParent');
        expect(e.status).to.equal(500);
      });
  });

  it('should reject if it doesnt return an insertId', () => {
    const connection = {
      query: sinon.stub().callsArgWithAsync(2, null, {})
    };

    return insertParentAndChildren(body, 'slfjaoiwj', connection)
      .then(success => expect(success).to.be.false)
      .catch(e => {
        expect(logError.calledOnce).to.be.true;
        expect(logError.firstCall.args[1]).to.include('insertParent');
        expect(logError.firstCall.args[1]).to.include('insertId');
        expect(e.status).to.equal(500);
      });
  });

  it('should resolve with insertId and childArray', () => {
    const mockId = 10;
    const connection = { query: () => {} };
    const query = sinon.stub(connection, 'query');
    query.onCall(0).callsArgWithAsync(2, null, { insertId: mockId });
    query.onCall(1).callsArgWithAsync(2, null, { insertId: 1 });

    return insertParentAndChildren(body, 'slfjaoiwj', connection).then(({
      parentId,
      childArray
    }) => {
      expect(query.calledTwice).to.be.true;
      expect(parentId).to.equal(10);
      expect(Array.isArray(childArray)).to.be.true;
      expect(childArray.length).to.equal(1);
    });
  });

  it('should call query as many times as needed for children', () => {
    body = Object.assign({}, body, {
      childCount: 3,
      children: [ 'child1', 'child2', 'child3' ]
    });
    const connection = { query: () => {} };
    const query = sinon.stub(connection, 'query');
    query.onCall(0).callsArgWithAsync(2, null, { insertId: 1 });
    query.onCall(1).callsArgWithAsync(2, null, { insertId: 1 });
    query.onCall(2).callsArgWithAsync(2, null, { insertId: 1 });
    query.onCall(3).callsArgWithAsync(2, null, { insertId: 1 });
    query.onCall(4).callsArgWithAsync(2, null, { insertId: 1 });

    return insertParentAndChildren(body, 'slfjaoiwj', connection).then(({
      parentId,
      childArray
    }) => {
      expect(query.callCount).to.equal(4);
    });
  });
});
