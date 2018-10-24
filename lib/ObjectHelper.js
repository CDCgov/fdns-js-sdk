const querystring = require('querystring');

// Object Microservice Helper
class ObjectHelper {
  // csvFormat options
  get csvFormats() {
    return ([
      'Default',
      'Excel',
      'MySQL',
      'RFC4180',
      'TDF',
    ]);
  }

  constructor(opts = {}) {
    const { axios, api } = opts;
    this.axios = axios;
    this.api = api;
  }

  // index
  index() {
    return this.axios.get(`${this.api}/`);
  }

  // Create object
  create(opts = {}) {
    const { db, collection, id, payload } = opts;

    // Create object with id
    if (id) {
      return this.axios.post(`${this.api}/${db}/${collection}/${id}`, payload);
    }

    return this.axios.post(`${this.api}/${db}/${collection}`, payload);
  }

  // Get object
  get(opts = {}) {
    const { db, collection, id } = opts;

    return this.axios.get(`${this.api}/${db}/${collection}/${id}`);
  }

  // Update object
  update(opts = {}) {
    const { db, collection, id, payload } = opts;

    return this.axios.put(`${this.api}/${db}/${collection}/${id}`, payload);
  }

  // Delete object
  delete(opts = {}) {
    const { db, collection, id } = opts;

    return this.axios.delete(`${this.api}/${db}/${collection}/${id}`);
  }

  // Delete collection
  deleteCollection(opts = {}) {
    const { db, collection } = opts;

    return this.axios.delete(`${this.api}/${db}/${collection}`);
  }

  // Aggregate
  aggregate(opts = {}) {
    const { db, collection, payload = {} } = opts;

    return this.axios.post(`${this.api}/${db}/${collection}/aggregate`, payload);
  }

  // Count object(s)
  count(opts = {}) {
    const { db, collection, payload = {} } = opts;

    return this.axios.post(`${this.api}/${db}/${collection}/count`, payload);
  }

  // Get distinct values
  distinct(opts = {}) {
    const { db, collection, field, payload = {} } = opts;

    return this.axios.post(`${this.api}/${db}/${collection}/distinct/${field}`, payload);
  }

  // Find object(s)
  find(opts = {}) {
    const {
      db,
      collection,
      payload = {},
      from = 0,
      size = -1,
      sort = '',
      order = 1,
    } = opts;

    const qs = querystring.stringify({
      from,
      size,
      sort,
      order,
    });

    return this.axios.post(`${this.api}/${db}/${collection}/find?${qs}`, payload);
  }

  // Bulk import of objects from a CSV file
  importCSV(opts = {}) {
    const { db, collection, csv, csvFormat = 'Default' } = opts;

    const qs = querystring.stringify({ csvFormat });

    return this.axios.post(`${this.api}/bulk/${db}/${collection}?${qs}`, csv, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  // Create a list of objects
  importList(opts = {}) {
    const { db, collection, payload = [] } = opts;

    return this.axios.post(`${this.api}/multi/${db}/${collection}`, payload);
  }
}

module.exports = ObjectHelper;
