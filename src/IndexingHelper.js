const querystring = require('querystring');

// Indexing Microservice Helper
class IndexingHelper {
  constructor(opts = {}) {
    const { axios, api } = opts;
    this.axios = axios;
    this.api = api;
  }

  // index
  index() {
    return this.axios.get(`${this.api}/`);
  }

  // Creates a new index.
  createIndex(opts = {}) {
    const { type } = opts;

    return this.axios.put(`${this.api}/index/${type}`);
  }

  // Delete index.
  deleteIndex(opts = {}) {
    const { type } = opts;

    return this.axios.delete(`${this.api}/index/${type}`);
  }

  // Get an indexed object.
  getIndexedObject(opts = {}) {
    const { type, id, hydrate = false } = opts;

    const qs = querystring.stringify({
      hydrate,
    });

    return this.axios.get(`${this.api}/get/${type}/${id}?${qs}`);
  }

  // Index an existing stored object.
  indexObject(opts = {}) {
    const { type, id } = opts;

    return this.axios.post(`${this.api}/index/${type}/${id}`);
  }

  // Index all objects in MongoDB.
  indexAll(opts = {}) {
    const { type } = opts;

    return this.axios.put(`${this.api}/index/all/${type}`);
  }

  // Index a list of objects.
  indexList(opts = {}) {
    const { type, data = [] } = opts;

    return this.axios.post(`${this.api}/index/bulk/${type}`, data);
  }

  // Define a mapping in elasticsearch.
  createMapping(opts = {}) {
    const { type, payload } = opts;

    return this.axios.post(`${this.api}/mapping/${type}`, payload);
  }

  // Search object.
  search(opts = {}) {
    const {
      type,
      query = '',
      hydrate = false,
      from = 0,
      size = 100,
      scroll = '1m',
    } = opts;

    const qs = querystring.stringify({
      query,
      hydrate,
      from,
      size,
      scroll,
    });

    return this.axios.post(`${this.api}/search/${type}?${qs}`);
  }

  // Scroll search result.
  searchScrollIndex(opts = {}) {
    const {
      type,
      scrollId,
      scroll = '1m',
      hydrate = false,
    } = opts;

    const qs = querystring.stringify({
      scroll,
      scrollId,
      hydrate,
    });

    return this.axios.post(`${this.api}/search/scroll/${type}?${qs}`);
  }

  // Delete Scroll Index.
  deleteScrollIndex(opts = {}) {
    const { scrollId } = opts;

    const qs = querystring.stringify({
      scrollId,
    });

    return this.axios.delete(`${this.api}/search/scroll?${qs}`);
  }
}

module.exports = IndexingHelper;
