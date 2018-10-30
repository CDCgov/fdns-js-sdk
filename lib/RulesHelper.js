const querystring = require('querystring');

// Rules Microservice Helper
class RulesHelper {
  constructor(opts = {}) {
    const { axios, api } = opts;
    this.axios = axios;
    this.api = api;
  }

  // index
  index() {
    return this.axios.get(`${this.api}/`);
  }

  // Get saved rules for the specified profile
  get(opts = {}) {
    const { profile } = opts;

    return this.axios.get(`${this.api}/${profile}`);
  }

  // Create or update rules for the specified profile
  create(opts = {}) {
    const { profile, payload } = opts;

    return this.axios.post(`${this.api}/${profile}`, payload);
  }

  // Create or update rules for the specified profile
  update(opts = {}) {
    const { profile, payload } = opts;

    return this.axios.put(`${this.api}/${profile}`, payload);
  }

  // Validate JSON message
  validate(opts = {}) {
    const { profile, payload, explain = false } = opts;

    const qs = querystring.stringify({ explain });

    if (profile) {
      return this.axios.post(`${this.api}/validate/${profile}?${qs}`, payload);
    }

    return this.axios.post(`${this.api}/validate?${qs}`, payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
}

module.exports = RulesHelper;
