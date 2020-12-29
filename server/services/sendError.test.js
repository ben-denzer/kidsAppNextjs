const chai = require('chai');
const sinon = require('sinon');
const sendError = require('./sendError');
const expect = chai.expect;

describe('Send Error', () => {
  let res;
  let err;
  let resStatus;
  let resSend;
  beforeEach('setting up res and logError', () => {
    res = {
      status() {
        return this;
      },
      send() {}
    };
    resStatus = sinon.spy(res, 'status');
    resSend = sinon.spy(res, 'send');
  });

  it('should send 500 on unknown error', () => {
    err = {};
    sendError(err, res);
    expect(resStatus.calledOnce).to.be.true;
    expect(resStatus.firstCall.args[0]).to.equal(500);
    expect(resSend.calledOnce).to.be.true;
    expect(JSON.parse(resSend.firstCall.args[0]).error).to.equal(
      'Server Error'
    );
  });

  it('should send correct status and message', () => {
    const errStatus = 401;
    const errMessage = 'Invalid Email Or Password';
    err = { status: errStatus, error: errMessage };
    sendError(err, res);
    expect(resStatus.calledOnce).to.be.true;
    expect(resStatus.firstCall.args[0]).to.equal(errStatus);
    expect(resSend.calledOnce).to.be.true;
    expect(JSON.parse(resSend.firstCall.args[0]).error).to.equal(errMessage);
  });
});
