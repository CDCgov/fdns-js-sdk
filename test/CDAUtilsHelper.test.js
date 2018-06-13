const querystring = require('querystring');
const chai = require('chai');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const proxyquire = require('proxyquire');
const fs = require('fs');
const expect = chai.expect;

// test data
const message = fs.readFileSync(`${__dirname}/CDAmessage.xml`, 'utf8');
const CDA_UTILS_URL = 'http://fdns-ms-cda-utils:8081';
const basePath = '/api/1.0';
const explain = false;
let mock;
let FDNS;
let fdns;

// CDAUtilsHelper
describe('CDAUtilsHelper', () => {
  before(() => {
    // configure mock axios
    mock = new MockAdapter(axios);
    mock.onGet(`${CDA_UTILS_URL}${basePath}/`).reply(200, {});
    mock.onGet(`${CDA_UTILS_URL}${basePath}/generate`).reply(200, {});
    mock.onPost(`${CDA_UTILS_URL}${basePath}/json`).reply(200, {});
    const qs1 = querystring.stringify({ explain });
    mock.onPost(`${CDA_UTILS_URL}${basePath}/validate?${qs1}`).reply(200, {});

    // setup fdns
    FDNS = proxyquire('../lib/index', {
      'axios': axios,
    });
    fdns = new FDNS({
      CDA_UTILS_URL,
    });
  });

  it('includes cda', () => {
    expect(fdns.cda).to.be.an('object');
  });

  it('#index', (done) => {
    fdns.cda.index().then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#generate', (done) => {
    fdns.cda.generate().then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#toJSON', (done) => {
    fdns.cda.toJSON({ message }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#validate', (done) => {
    fdns.cda.validate({ message }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });
});
