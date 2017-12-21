import chai from 'chai';
import sinon from 'sinon';
import insertParent from './insertParent';
const expect = chai.expect;

describe('Insert Parent', function() {
  let body;
  beforeEach('setting up logError and body', function() {
    global.logError = sinon.spy();
    body = {
      childCount: '1',
      children: ['child1'],
      email: 'fake@gmail.com',
      emailList: false,
    };
  });

  it('should reject if any arg is undefined', function() {
    return insertParent(body, '#rewoirjeo33434')
      .then(success => expect(success).to.be.false)
      .catch(e => {
        expect(logError.called).to.be.true;
        expect(e.status).to.equal(500);
      });
  });

  it('should log each missing arg', function() {
    return insertParent()
      .then(success => expect(success).to.be.false)
      .catch(e => {
        expect(logError.calledThrice).to.be.true;
        expect(logError.firstCall.args[0]).to.include('no body');
        expect(logError.secondCall.args[0]).to.include('no hash');
        expect(logError.thirdCall.args[0]).to.include('no connection');
      });
  });

  it('should reject if body is missing email', function() {
    body = Object.assign({}, body, { email: '' });
    const connection = {
      query: sinon.stub()
    };

    return insertParent(body, 'seroijeroij', connection)
      .then(success => expect(success).to.be.false)
      .catch(e => {
        expect(logError.calledOnce).to.be.true;
        expect(logError.firstCall.args[0]).to.deep.equal(body);
      });
  });

  it('should reject if body is missing childCount', function() {
    body = Object.assign({}, body, { childCount: undefined });
    const connection = {
      query: sinon.stub()
    };

    return insertParent(body, 'seroijeroij', connection)
      .then(success => expect(success).to.be.false)
      .catch(e => {
        expect(logError.calledOnce).to.be.true;
        expect(logError.firstCall.args[0]).to.deep.equal(body);
      });
  });

  it('should reject if children array doesnt match childcount', function() {
    body = Object.assign({}, body, { childCount: 2 });
    const connection = {
      query: sinon.stub()
    };

    return insertParent(body, 'sdlfasdlkfjdso', connection)
      .then(success => expect(success).to.be.false)
      .catch(e => {
        expect(logError.calledOnce).to.be.true;
        expect(e.status).to.equal(500);
      });
  });

  it('should reject on db error', function() {
    const connection = {
      query: sinon.stub().callsArgWithAsync(2, { error: true })
    };

    return insertParent(body, 'slfjaoiwj', connection)
      .then(success => expect(success).to.be.false)
      .catch(e => {
        expect(logError.calledOnce).to.be.true;
        expect(logError.firstCall.args[1]).to.include('insertParent');
        expect(e.status).to.equal(500);
      });
  });

  it('should reject if it doesnt return an insertId', function() {
    const connection = {
      query: sinon.stub().callsArgWithAsync(2, null, {})
    };

    return insertParent(body, 'slfjaoiwj', connection)
      .then(success => expect(success).to.be.false)
      .catch(e => {
        expect(logError.calledOnce).to.be.true;
        expect(logError.firstCall.args[1]).to.include('insertParent');
        expect(logError.firstCall.args[1]).to.include('insertId');
        expect(e.status).to.equal(500);
      });
  });

  it('should resolve with insertId and childArray', function() {
    const mockId = 10;
    const connection = { query: () => {}};
    const query = sinon.stub(connection, 'query');
    query.onCall(0).callsArgWithAsync(2, null, { insertId: mockId });
    query.onCall(1).callsArgWithAsync(2, null, { insertId: 1 });

    return insertParent(body, 'slfjaoiwj', connection)
      .then(({ parentId, childArray }) => {
        expect(query.calledTwice).to.be.true;
        expect(parentId).to.equal(10);
        expect(Array.isArray(childArray)).to.be.true;
        expect(childArray.length).to.equal(1);
      });
  });

  it('should call query as many times as needed for children', function() {
    body = Object.assign({}, body, { childCount: 3, children: ['child1', 'child2', 'child3'] });
    const connection = { query: () => {}};
    const query = sinon.stub(connection, 'query');
    query.onCall(0).callsArgWithAsync(2, null, { insertId: 1 });
    query.onCall(1).callsArgWithAsync(2, null, { insertId: 1 });
    query.onCall(2).callsArgWithAsync(2, null, { insertId: 1 });
    query.onCall(3).callsArgWithAsync(2, null, { insertId: 1 });
    query.onCall(4).callsArgWithAsync(2, null, { insertId: 1 });

    return insertParent(body, 'slfjaoiwj', connection)
      .then(({ parentId, childArray }) => {
        expect(query.callCount).to.equal(4);
      });
  });
});
