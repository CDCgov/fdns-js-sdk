const querystring = require('querystring');

// Combiner Microservice Helper
class CombinerHelper {
  // targetType options
  get targetTypes() {
    return ([
      'xlsx',
      'csv',
    ]);
  }

  // orientation options
  get orientations() {
    return ([
      'portrait',
      'landscape',
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

  // Export data to CSV or XLSX
  export(opts = {}) {
    const {
      targetType = 'xlsx', // see targetTypes
      config,
      file,
      filename = '',
      orientation = 'portrait', // see orientations
      includeHeader = true,
      sortFiles = false,
      responseType = 'json', // configurable to blob, document, etc.
    } = opts;

    const qs = querystring.stringify({
      filename,
      orientation,
      includeHeader,
      sortFiles,
    });

    return this.axios.post(
      `${this.api}/${targetType}/${config}?${qs}`,
      file,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType,
      },
    );
  }

  // Flatten JSON object
  flatten(opts = {}) {
    const {
      targetType = 'xlsx', // or csv
      file,
    } = opts;

    return this.axios.post(
      `${this.api}/${targetType}/flatten`,
      file,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
  }

  // Get configuration
  getConfig(opts = {}) {
    const { config } = opts;

    return this.axios.get(`${this.api}/config/${config}`);
  }

  // Create or update rules for the specified configuration
  createConfig(opts = {}) {
    const { config, payload } = opts;

    return this.axios.post(
      `${this.api}/config/${config}`,
      payload,
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  // Create or update rules for the specified configuration
  updateConfig(opts = {}) {
    const { config, payload } = opts;

    return this.axios.put(
      `${this.api}/config/${config}`,
      payload,
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  // Delete configuration
  deleteConfig(opts = {}) {
    const { config } = opts;

    return this.axios.delete(`${this.api}/config/${config}`);
  }
}

module.exports = CombinerHelper;
