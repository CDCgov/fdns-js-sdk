const querystring = require('querystring');
const chai = require('chai');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const proxyquire = require('proxyquire');
const fs = require('fs');
const expect = chai.expect;

// test data
const STORAGE_URL = 'http://fdns-ms-storage:8082';
const basePath = '/api/1.0';
const name = 'test';
const source = 'foo';
const target = 'bar';
const prefix = '';
const id = 'xxx';
const sourceId = 'abc';
const targetId = 'xyz';
const file = {};
const generateStruct = false;
const generateId = false;
const replace = false;
const deleteOriginal = false;
let mock;
let FDNS;
let fdns;

// StorageHelper
describe('StorageHelper', () => {
  before(() => {
    // configure mock axios
    mock = new MockAdapter(axios);
    mock.onGet(`${STORAGE_URL}${basePath}/`).reply(200, {});
    mock.onGet(`${STORAGE_URL}${basePath}/drawer`).reply(200, []);
    mock.onGet(`${STORAGE_URL}${basePath}/drawer/${name}`).reply(200, {});
    mock.onPut(`${STORAGE_URL}${basePath}/drawer/${name}`).reply(200, {});
    mock.onDelete(`${STORAGE_URL}${basePath}/drawer/${name}`).reply(200, {});
    const qs1 = querystring.stringify({ prefix });
    mock.onGet(`${STORAGE_URL}${basePath}/drawer/nodes/${name}?${qs1}`).reply(200, []);
    const qs2 = querystring.stringify({ id });
    mock.onGet(`${STORAGE_URL}${basePath}/node/${name}?${qs2}`).reply(200, {});
    const qs3 = querystring.stringify({
      id,
      generateStruct,
      generateId,
      replace,
    });
    mock.onPost(`${STORAGE_URL}${basePath}/node/${name}?${qs3}`).reply(200, {});
    mock.onPut(`${STORAGE_URL}${basePath}/node/${name}?${qs2}`).reply(200, {});
    mock.onDelete(`${STORAGE_URL}${basePath}/node/${name}?${qs2}`).reply(200, {});
    mock.onGet(`${STORAGE_URL}${basePath}/node/${name}/dl?${qs2}`).reply(200, {});
    const qs4 = querystring.stringify({
      sourceId,
      targetId,
      generateStruct,
      generateId,
      deleteOriginal,
    });
    mock.onPut(`${STORAGE_URL}${basePath}/node/copy/${source}/${target}?${qs4}`).reply(200, {});

    // setup fdns
    FDNS = proxyquire('../lib/index', {
      'axios': axios,
    });
    fdns = new FDNS({
      STORAGE_URL,
    });
  });

  it('includes storage', () => {
    expect(fdns.storage).to.be.an('object');
  });

  it('#index', (done) => {
    fdns.storage.index().then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#getDrawers', (done) => {
    fdns.storage.getDrawers().then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#getDrawer', (done) => {
    fdns.storage.getDrawer({ name }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#createDrawer', (done) => {
    fdns.storage.createDrawer({ name }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#deleteDrawer', (done) => {
    fdns.storage.deleteDrawer({ name }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#listNodes', (done) => {
    fdns.storage.listNodes({ name }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#getNode', (done) => {
    fdns.storage.getNode({ name, id }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#createNode', (done) => {
    fdns.storage.createNode({ name, id, file }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#updateNode', (done) => {
    fdns.storage.updateNode({ name, id, file }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#deleteNode', (done) => {
    fdns.storage.deleteNode({ name, id }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#downloadNode', (done) => {
    fdns.storage.downloadNode({ name, id }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });

  it('#copyNode', (done) => {
    fdns.storage.copyNode({
      source,
      target,
      sourceId,
      targetId,
    }).then((res) => {
      expect(res).to.be.an('object');
      done();
    });
  });
});
