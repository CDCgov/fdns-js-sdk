const querystring = require('querystring');

// HL7 Utilities Microservice Helper
class HL7UtilsHelper {
  // specs options
  get specs() {
    return ([
      'hl7',
      'phinms',
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

  // Get case identifier
  caseId(opts = {}) {
    const { message, spec } = opts;

    return this.axios.post(`${this.api}/caseId/${spec}`, message, {
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  // Generate random HL7 message
  generate() {
    return this.axios.get(`${this.api}/generate`);
  }

  // Get message hash
  hash(opts = {}) {
    const { message } = opts;

    return this.axios.post(`${this.api}/hash`, message, {
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  // Transform HL7 to JSON
  toJSON(opts = {}) {
    const { spec, message, profile } = opts;

    if (profile) {
      return this.axios.post(`${this.api}/json/${profile}?spec=${spec}`, message, {
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    return this.axios.post(`${this.api}/json?spec=${spec}`, message, {
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  // Transform HL7 to XML
  toXML(opts = {}) {
    const { message } = opts;

    return this.axios.post(`${this.api}/xml`, message, {
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  // Create or update rules for the specified profile
  createRules(opts = {}) {
    const { rules, profile } = opts;

    return this.axios.post(`${this.api}/rules/${profile}`, rules);
  }

  // Create or update rules for the specified profile
  updateRules(opts = {}) {
    const { rules, profile } = opts;

    return this.axios.put(`${this.api}/rules/${profile}`, rules);
  }

  // Get saved rules for the specified profile
  getRules(opts = {}) {
    const { ruleset, profile } = opts;

    return this.axios.get(`${this.api}/rules/${profile}/${ruleset}`);
  }

  // Check rules against the schema
  checkRules(opts = {}) {
    const { rules } = opts;

    return this.axios.post(`${this.api}/rules/check`, rules);
  }

  // Get rules schema
  getRulesSchema() {
    return this.axios.get(`${this.api}/rules/schema`);
  }

  // Validate HL7 message
  validate(opts = {}) {
    const {
      profile,
      message,
      explain = false,
      checkPII = false,
    } = opts;

    const qs = querystring.stringify({
      explain,
      checkPII,
    });

    return this.axios.post(`${this.api}/rules/validate/${profile}?${qs}`, message, {
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}

module.exports = HL7UtilsHelper;
