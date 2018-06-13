const querystring = require('querystring');
const chai = require('chai');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const proxyquire = require('proxyquire');
const fs = require('fs');
const expect = chai.expect;

// test data
const spec = 'hl7';
const message = fs.readFileSync(`${__dirname}/HL7message.txt`, 'utf8');
const rules = JSON.parse(fs.readFileSync(`${__dirname}/HL7rules.json`, 'utf8'));
const profile = 'test';
const ruleset = 'error';
const HL7_UTILS_URL = 'http://fdns-ms-hl7-utils:8080';
const basePath = '/api/1.0';
const explain = false;
const checkPII = false;
let mock;
let FDNS;
let fdns;

// HL7UtilsHelper
describe('HL7UtilsHelper', () => {
  before(() => {
    // configure mock axios
    mock = new MockAdapter(axios);
    mock.onGet(`${HL7_UTILS_URL}${basePath}/`).reply(200, {});
    mock.onPost(`${HL7_UTILS_URL}${basePath}/caseId/${spec}`).reply(200, {});
    mock.onGet(`${HL7_UTILS_URL}${basePath}/generate`).reply(200, {});
    mock.onPost(`${HL7_UTILS_URL}${basePath}/hash`).reply(200, {});
    mock.onPost(`${HL7_UTILS_URL}${basePath}/json?spec=${spec}`).reply(200, {});
    mock.onPost(`${HL7_UTILS_URL}${basePath}/xml`).reply(200, {});
    mock.onPost(`${HL7_UTILS_URL}${basePath}/rules/${profile}`).reply(200, {});
    mock.onPut(`${HL7_UTILS_URL}${basePath}/rules/${profile}`).reply(200, {});
    mock.onGet(`${HL7_UTILS_URL}${basePath}/rules/${profile}/${ruleset}`).reply(200, {});
    mock.onPost(`${HL7_UTILS_URL}${basePath}/rules/check`).reply(200, {});
    mock.onGet(`${HL7_UTILS_URL}${basePath}/rules/schema`).reply(200, {});
    const qs1 = querystring.stringify({
      explain,
      checkPII,
    });
    mock.onPost(`${HL7_UTILS_URL}${basePath}/rules/validate/${profile}?${qs1}`).reply(200, {});

    // setup fdns
    FDNS = proxyquire('../lib/index', {
      'axios': axios,
    });
    fdns = new FDNS({
      HL7_UTILS_URL,
    });
  });

  it('includes hl7', () => {
    expect(fdns.hl7).to.be.an('object');
  });

  it('includes specs', () => {
    expect(fdns.hl7.specs).to.be.an('array');
  });

  it('#index', (done) => {
    fdns.hl7.index().then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#caseId', (done) => {
    fdns.hl7.caseId({ spec, message }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#generate', (done) => {
    fdns.hl7.generate().then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#hash', (done) => {
    fdns.hl7.hash({ message }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#toJSON', (done) => {
    fdns.hl7.toJSON({ spec, message }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#toXML', (done) => {
    fdns.hl7.toXML({ message }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#createRules', (done) => {
    fdns.hl7.createRules({ rules, profile }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#updateRules', (done) => {
    fdns.hl7.updateRules({ rules, profile }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#getRules', (done) => {
    before((done) => {
      fdns.hl7.createRules({ rules, profile }).then(res => done());
    });

    fdns.hl7.getRules({ ruleset, profile }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#checkRules', (done) => {
    fdns.hl7.checkRules({ rules }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#getRulesSchema', (done) => {
    fdns.hl7.getRulesSchema().then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#validate', (done) => {
    before((done) => {
      fdns.hl7.createRules({ rules, profile }).then(res => done());
    });

    fdns.hl7.validate({ profile, message }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });
});
