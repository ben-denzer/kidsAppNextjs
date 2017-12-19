import chai from 'chai';
import sinon from 'sinon';
import createNodemailerMailgun from './createNodemailerMailgun';
const expect = chai.expect;

describe('Create Nodemailer Mailgun', function() {
  it('should export a function called sendMail', function() {
    expect(Boolean(createNodemailerMailgun.sendMail)).to.be.true;
    expect(typeof createNodemailerMailgun.sendMail).to.equal('function');
  });
});
