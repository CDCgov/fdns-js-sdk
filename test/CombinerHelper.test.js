const querystring = require('querystring');
const chai = require('chai');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const proxyquire = require('proxyquire');
const fs = require('fs');
const expect = chai.expect;

// test data
const payload = JSON.parse(fs.readFileSync(`${__dirname}/CombinerConfig.json`, 'utf8'));
const COMBINER_URL = 'http://fdns-ms-combiner:8085';
const basePath = '/api/1.0';
const targetType = 'xlsx';
const config = 'test';
const filename = 'test';
const orientation = 'portrait';
const includeHeader = true;
const sortFiles = false;
let mock;
let FDNS;
let fdns;

// CombinerHelper
describe('CombinerHelper', () => {
  before(() => {
    // configure mock axios
    mock = new MockAdapter(axios);
    mock.onGet(`${COMBINER_URL}${basePath}/`).reply(200, {});
    const qs1 = querystring.stringify({
      filename,
      orientation,
      includeHeader,
      sortFiles,
    });
    mock.onPost(`${COMBINER_URL}${basePath}/${targetType}/${config}?${qs1}`).reply(200, {});
    mock.onPost(`${COMBINER_URL}${basePath}/${targetType}/flatten`).reply(200, {});
    mock.onGet(`${COMBINER_URL}${basePath}/config/${config}`).reply(200, {});
    mock.onPost(`${COMBINER_URL}${basePath}/config/${config}`).reply(200, {});
    mock.onPut(`${COMBINER_URL}${basePath}/config/${config}`).reply(200, {});
    mock.onDelete(`${COMBINER_URL}${basePath}/config/${config}`).reply(200, {});

    // setup fdns
    FDNS = proxyquire('../lib/index', {
      'axios': axios,
    });
    fdns = new FDNS({
      COMBINER_URL,
    });
  });

  it('includes combiner', () => {
    expect(fdns.combiner).to.be.an('object');
  });

  it('includes targetTypes', () => {
    expect(fdns.combiner.targetTypes).to.be.an('array');
  });

  it('includes orientations', () => {
    expect(fdns.combiner.orientations).to.be.an('array');
  });

  it('#index', (done) => {
    fdns.combiner.index().then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#export', (done) => {
    fdns.combiner.export({
      targetType,
      config,
      file: [{},{},{}], // [File]
      filename,
    }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#flatten', (done) => {
    fdns.combiner.flatten({
      targetType,
      file: {}, // File
    }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#getConfig', (done) => {
    fdns.combiner.getConfig({ config }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#createConfig', (done) => {
    fdns.combiner.createConfig({ config, payload }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#updateConfig', (done) => {
    fdns.combiner.updateConfig({ config, payload }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#deleteConfig', (done) => {
    fdns.combiner.deleteConfig({ config }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });
});
