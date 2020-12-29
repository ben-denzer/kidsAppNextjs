const chai = require('chai');
const sinon = require('sinon');
const createNodemailerMailgun = require('./createNodemailerMailgun');
const expect = chai.expect;

describe('Create Nodemailer Mailgun', () => {
  it('should export a function called sendMail', () => {
    expect(Boolean(createNodemailerMailgun.sendMail)).to.be.true;
    expect(typeof createNodemailerMailgun.sendMail).to.equal('function');
  });
});
