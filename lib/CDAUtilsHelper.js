const querystring = require('querystring');

// CDA Utilities Microservice Helper
class CDAUtilsHelper {
  constructor(opts = {}) {
    const { axios, api } = opts;
    this.axios = axios;
    this.api = api;
  }

  // index
  index() {
    return this.axios.get(`${this.api}/`);
  }

  // Generate random CDA message
  generate() {
    return this.axios.get(`${this.api}/generate`);
  }

  // Transform CDA to JSON
  toJSON(opts = {}) {
    const { message } = opts;

    return this.axios.post(`${this.api}/json`, message, {
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  // Validate CDA message
  validate(opts = {}) {
    const { message, explain = false } = opts;

    const qs = querystring.stringify({
      explain,
    });

    return this.axios.post(`${this.api}/validate?${qs}`, message, {
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}

module.exports = CDAUtilsHelper;
