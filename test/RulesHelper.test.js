const querystring = require('querystring');
const chai = require('chai');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const proxyquire = require('proxyquire');
const fs = require('fs');
const expect = chai.expect;

// test data
const csv = fs.readFileSync(`${__dirname}/ObjectTest.csv`, 'utf8');
const RULES_URL = 'http://fdns-ms-rules:8086';
const basePath = '/api/1.0';
const profile = 'test';
const payload = {};
const explain = false;
let mock;
let FDNS;
let fdns;

// RulesHelper
describe('RulesHelper', () => {
  before(() => {
    // configure mock axios
    mock = new MockAdapter(axios);
    mock.onGet(`${RULES_URL}${basePath}/`).reply(200, {});
    mock.onGet(`${RULES_URL}${basePath}/${profile}`).reply(200, {});
    mock.onPost(`${RULES_URL}${basePath}/${profile}`).reply(200, {});
    mock.onPut(`${RULES_URL}${basePath}/${profile}`).reply(200, {});
    const qs = querystring.stringify({ explain });
    mock.onPost(`${RULES_URL}${basePath}/validate?${qs}`).reply(200, {});
    mock.onPost(`${RULES_URL}${basePath}/validate/${profile}?${qs}`).reply(200, {});

    // setup fdns
    FDNS = proxyquire('../lib/index', {
      'axios': axios,
    });
    fdns = new FDNS({
      RULES_URL,
    });
  });

  it('includes rules', () => {
    expect(fdns.rules).to.be.an('object');
  });

  it('#index', (done) => {
    fdns.rules.index().then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#get', (done) => {
    fdns.rules.get({ profile }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#create', (done) => {
    fdns.rules.create({ profile, payload }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#update', (done) => {
    fdns.rules.update({ profile, payload }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#validate', (done) => {
    fdns.rules.validate({ payload }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#validate w/ profile', (done) => {
    fdns.rules.validate({ payload, profile }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });
});
