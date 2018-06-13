const querystring = require('querystring');

// Storage Microservice Helper
class StorageHelper {
  constructor(opts = {}) {
    const { axios, api } = opts;
    this.axios = axios;
    this.api = api;
  }

  // index
  index() {
    return this.axios.get(`${this.api}/`);
  }

  // Get all drawers
  getDrawers() {
    return this.axios.get(`${this.api}/drawer`);
  }

  // Get drawer
  getDrawer(opts = {}) {
    const { name } = opts;

    return this.axios.get(`${this.api}/drawer/${name}`);
  }

  // Create drawer
  createDrawer(opts = {}) {
    const { name } = opts;

    return this.axios.put(`${this.api}/drawer/${name}`);
  }

  // Delete drawer
  deleteDrawer(opts = {}) {
    const { name } = opts;

    return this.axios.delete(`${this.api}/drawer/${name}`);
  }

  // List all nodes in a drawer
  listNodes(opts = {}) {
    const { name, prefix = '' } = opts;

    const qs = querystring.stringify({ prefix });

    return this.axios.get(`${this.api}/drawer/nodes/${name}?${qs}`);
  }

  // Get node
  getNode(opts = {}) {
    const { name, id } = opts;

    const qs = querystring.stringify({ id });

    return this.axios.get(`${this.api}/node/${name}?${qs}`);
  }

  // Create node
  createNode(opts = {}) {
    const {
      name,
      file,
      id,
      generateStruct = false,
      generateId = false,
      replace = false,
    } = opts;

    const qs = querystring.stringify({ id, generateStruct, generateId, replace });

    return this.axios.post(`${this.api}/node/${name}?${qs}`, file, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  // Update node
  updateNode(opts = {}) {
    const { name, file, id } = opts;

    const qs = querystring.stringify({ id });

    return this.axios.put(`${this.api}/node/${name}?${qs}`, file, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  // Delete node
  deleteNode(opts = {}) {
    const { name, id } = opts;

    const qs = querystring.stringify({ id });

    return this.axios.delete(`${this.api}/node/${name}?${qs}`);
  }

  // Download node
  downloadNode(opts = {}) {
    const { name, id } = opts;

    const qs = querystring.stringify({ id });

    return this.axios.get(`${this.api}/node/${name}/dl?${qs}`);
  }

  // Copy node
  copyNode(opts = {}) {
    const {
      source,
      target,
      sourceId,
      targetId,
      generateStruct = false,
      generateId = false,
      deleteOriginal = false,
    } = opts;

    const qs = querystring.stringify({
      sourceId,
      targetId,
      generateStruct,
      generateId,
      deleteOriginal,
    });

    return this.axios.put(`${this.api}/node/copy/${source}/${target}?${qs}`);
  }
}

module.exports = StorageHelper;
