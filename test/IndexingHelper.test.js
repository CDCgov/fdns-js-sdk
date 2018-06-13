const querystring = require('querystring');
const chai = require('chai');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const proxyquire = require('proxyquire');
const fs = require('fs');
const expect = chai.expect;

// test data
const payload = JSON.parse(fs.readFileSync(`${__dirname}/IndexingConfig.json`, 'utf8'));
const INDEXING_URL = 'http://fdns-ms-indexing:8084';
const basePath = '/api/1.0';
const type = 'test';
const id = 'xxx';
const scrollId = 'xxx';
const query = 'test';
const hydrate = false;
const from = 0;
const size = 100;
const scroll = '1m';
let mock;
let FDNS;
let fdns;

// IndexingHelper
describe('IndexingHelper', () => {
  before(() => {
    // configure mock axios
    mock = new MockAdapter(axios);
    mock.onGet(`${INDEXING_URL}${basePath}/`).reply(200, {});
    mock.onPut(`${INDEXING_URL}${basePath}/index/${type}`).reply(200, {});
    mock.onDelete(`${INDEXING_URL}${basePath}/index/${type}`).reply(200, {});
    const qs1 = querystring.stringify({ hydrate });
    mock.onGet(`${INDEXING_URL}${basePath}/get/${type}/${id}?${qs1}`).reply(200, {});
    mock.onPost(`${INDEXING_URL}${basePath}/index/${type}/${id}`).reply(200, {});
    mock.onPut(`${INDEXING_URL}${basePath}/index/all/${type}`).reply(200, {});
    mock.onPost(`${INDEXING_URL}${basePath}/index/bulk/${type}`).reply(200, {});
    mock.onPost(`${INDEXING_URL}${basePath}/mapping/${type}`).reply(200, {});
    const qs2 = querystring.stringify({
      query,
      hydrate,
      from,
      size,
      scroll,
    });
    mock.onPost(`${INDEXING_URL}${basePath}/search/${type}?${qs2}`).reply(200, {});
    const qs3 = querystring.stringify({
      scroll,
      scrollId,
      hydrate,
    });
    mock.onPost(`${INDEXING_URL}${basePath}/search/scroll/${type}?${qs3}`).reply(200, {});
    const qs4 = querystring.stringify({ scrollId });
    mock.onDelete(`${INDEXING_URL}${basePath}/search/scroll?${qs4}`).reply(200, {});

    // setup fdns
    FDNS = proxyquire('../lib/index', {
      'axios': axios,
    });
    fdns = new FDNS({
      INDEXING_URL,
    });
  });

  it('includes indexing', () => {
    expect(fdns.indexing).to.be.an('object');
  });

  it('#index', (done) => {
    fdns.indexing.index().then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#createIndex', (done) => {
    fdns.indexing.createIndex({ type }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#deleteIndex', (done) => {
    fdns.indexing.deleteIndex({ type }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#getIndexedObject', (done) => {
    fdns.indexing.getIndexedObject({ type, id }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#indexObject', (done) => {
    fdns.indexing.indexObject({ type, id }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#indexAll', (done) => {
    fdns.indexing.indexAll({ type }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#indexList', (done) => {
    fdns.indexing.indexList({ type, data: [id] }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#createMapping', (done) => {
    fdns.indexing.createMapping({ type, payload }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#search', (done) => {
    fdns.indexing.search({ type, query }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#searchScrollIndex', (done) => {
    fdns.indexing.searchScrollIndex({ type, scrollId }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#deleteScrollIndex', (done) => {
    fdns.indexing.deleteScrollIndex({ scrollId }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });
});
