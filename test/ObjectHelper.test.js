const querystring = require('querystring');
const chai = require('chai');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const proxyquire = require('proxyquire');
const fs = require('fs');
const expect = chai.expect;

// test data
const csv = fs.readFileSync(`${__dirname}/ObjectTest.csv`, 'utf8');
const OBJECT_URL = 'http://fdns-ms-object:8083';
const basePath = '/api/1.0';
const db = 'test';
const collection = 'test';
const id = 'xxx';
const payload = {};
const from = 0;
const size = -1;
const sort = '';
const order = 1;
const field = 'test';
const csvFormat = 'Default';
let mock;
let FDNS;
let fdns;

// ObjectHelper
describe('ObjectHelper', () => {
  before(() => {
    // configure mock axios
    mock = new MockAdapter(axios);
    mock.onGet(`${OBJECT_URL}${basePath}/`).reply(200, {});
    mock.onPost(`${OBJECT_URL}${basePath}/${db}/${collection}`).reply(200, {});
    mock.onPost(`${OBJECT_URL}${basePath}/${db}/${collection}/${id}`).reply(200, {});
    mock.onGet(`${OBJECT_URL}${basePath}/${db}/${collection}/${id}`).reply(200, {});
    mock.onPut(`${OBJECT_URL}${basePath}/${db}/${collection}/${id}`).reply(200, {});
    mock.onDelete(`${OBJECT_URL}${basePath}/${db}/${collection}/${id}`).reply(200, {});
    mock.onDelete(`${OBJECT_URL}${basePath}/${db}/${collection}`).reply(200, {});
    mock.onPost(`${OBJECT_URL}${basePath}/${db}/${collection}/aggregate`).reply(200, {});
    mock.onPost(`${OBJECT_URL}${basePath}/${db}/${collection}/count`).reply(200, {});
    mock.onPost(`${OBJECT_URL}${basePath}/${db}/${collection}/distinct/${field}`).reply(200, {});
    const qs1 = querystring.stringify({ from, size, sort, order });
    mock.onPost(`${OBJECT_URL}${basePath}/${db}/${collection}/find?${qs1}`).reply(200, {});
    const qs2 = querystring.stringify({ csvFormat });
    mock.onPost(`${OBJECT_URL}${basePath}/bulk/${db}/${collection}?${qs2}`).reply(200, {});
    mock.onPost(`${OBJECT_URL}${basePath}/multi/${db}/${collection}`).reply(200, {});

    // setup fdns
    FDNS = proxyquire('../lib/index', {
      'axios': axios,
    });
    fdns = new FDNS({
      OBJECT_URL,
    });
  });

  it('includes object', () => {
    expect(fdns.object).to.be.an('object');
  });

  it('includes csvFormats', () => {
    expect(fdns.object.csvFormats).to.be.an('array');
  });

  it('#index', (done) => {
    fdns.object.index().then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#create', (done) => {
    fdns.object.create({ db, collection, payload }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#create with id', (done) => {
    fdns.object.create({ db, collection, id, payload }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#get', (done) => {
    fdns.object.get({ db, collection, id }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#update', (done) => {
    fdns.object.update({ db, collection, id, payload }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#delete', (done) => {
    fdns.object.delete({ db, collection, id }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#deleteCollection', (done) => {
    fdns.object.deleteCollection({ db, collection }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#aggregate', (done) => {
    fdns.object.aggregate({ db, collection }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#count', (done) => {
    fdns.object.count({ db, collection }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#distinct', (done) => {
    fdns.object.distinct({ db, collection, field }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#find', (done) => {
    fdns.object.find({ db, collection }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#importCSV', (done) => {
    fdns.object.importCSV({ db, collection, csv }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#importList', (done) => {
    fdns.object.importList({ db, collection }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });
});
