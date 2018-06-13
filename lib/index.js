const axios = require('axios');

// load helpers
const CDAUtilsHelper = require('./CDAUtilsHelper');
const CombinerHelper = require('./CombinerHelper');
const HL7UtilsHelper = require('./HL7UtilsHelper');
const IndexingHelper = require('./IndexingHelper');
const ObjectHelper = require('./ObjectHelper');
const RulesHelper = require('./RulesHelper');
const StorageHelper = require('./StorageHelper');

class FDNS {
  constructor(opts = {}) {
    const {
      token,
      HL7_UTILS_URL = 'http://fdns-ms-hl7-utils:8080',
      CDA_UTILS_URL = 'http://fdns-ms-cda-utils:8081',
      STORAGE_URL = 'http://fdns-ms-storage:8082',
      OBJECT_URL = 'http://fdns-ms-object:8083',
      INDEXING_URL = 'http://fdns-ms-indexing:8084',
      COMBINER_URL = 'http://fdns-ms-combiner:8085',
      RULES_URL = 'http://fdns-ms-rules:8086',
      basePath = '/api/1.0',
    } = opts;

    // assign the token
    if (token) axios.defaults.headers.common.authorization = `Bearer ${token}`;

    // hl7
    this.hl7 = new HL7UtilsHelper({
      api: `${HL7_UTILS_URL}${basePath}`,
      axios,
    });

    // cda
    this.cda = new CDAUtilsHelper({
      api: `${CDA_UTILS_URL}${basePath}`,
      axios,
    });

    // storage
    this.storage = new StorageHelper({
      api: `${STORAGE_URL}${basePath}`,
      axios,
    });

    // object
    this.object = new ObjectHelper({
      api: `${OBJECT_URL}${basePath}`,
      axios,
    });

    // indexing
    this.indexing = new IndexingHelper({
      api: `${INDEXING_URL}${basePath}`,
      axios,
    });

    // combiner
    this.combiner = new CombinerHelper({
      api: `${COMBINER_URL}${basePath}`,
      axios,
    });

    // rules
    this.rules = new RulesHelper({
      api: `${RULES_URL}${basePath}`,
      axios,
    });
  }
}

module.exports = FDNS;
