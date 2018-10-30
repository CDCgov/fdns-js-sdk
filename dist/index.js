"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var axios = require('axios'); // load helpers


var CDAUtilsHelper = require('./CDAUtilsHelper');

var CombinerHelper = require('./CombinerHelper');

var HL7UtilsHelper = require('./HL7UtilsHelper');

var IndexingHelper = require('./IndexingHelper');

var ObjectHelper = require('./ObjectHelper');

var RulesHelper = require('./RulesHelper');

var StorageHelper = require('./StorageHelper');

var FDNS = function FDNS() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, FDNS);

  var token = opts.token,
      _opts$HL7_UTILS_URL = opts.HL7_UTILS_URL,
      HL7_UTILS_URL = _opts$HL7_UTILS_URL === void 0 ? 'http://fdns-ms-hl7-utils:8080' : _opts$HL7_UTILS_URL,
      _opts$CDA_UTILS_URL = opts.CDA_UTILS_URL,
      CDA_UTILS_URL = _opts$CDA_UTILS_URL === void 0 ? 'http://fdns-ms-cda-utils:8081' : _opts$CDA_UTILS_URL,
      _opts$STORAGE_URL = opts.STORAGE_URL,
      STORAGE_URL = _opts$STORAGE_URL === void 0 ? 'http://fdns-ms-storage:8082' : _opts$STORAGE_URL,
      _opts$OBJECT_URL = opts.OBJECT_URL,
      OBJECT_URL = _opts$OBJECT_URL === void 0 ? 'http://fdns-ms-object:8083' : _opts$OBJECT_URL,
      _opts$INDEXING_URL = opts.INDEXING_URL,
      INDEXING_URL = _opts$INDEXING_URL === void 0 ? 'http://fdns-ms-indexing:8084' : _opts$INDEXING_URL,
      _opts$COMBINER_URL = opts.COMBINER_URL,
      COMBINER_URL = _opts$COMBINER_URL === void 0 ? 'http://fdns-ms-combiner:8085' : _opts$COMBINER_URL,
      _opts$RULES_URL = opts.RULES_URL,
      RULES_URL = _opts$RULES_URL === void 0 ? 'http://fdns-ms-rules:8086' : _opts$RULES_URL,
      _opts$basePath = opts.basePath,
      basePath = _opts$basePath === void 0 ? '/api/1.0' : _opts$basePath; // assign the token

  if (token) axios.defaults.headers.common.authorization = "Bearer ".concat(token); // hl7

  this.hl7 = new HL7UtilsHelper({
    api: "".concat(HL7_UTILS_URL).concat(basePath),
    axios: axios
  }); // cda

  this.cda = new CDAUtilsHelper({
    api: "".concat(CDA_UTILS_URL).concat(basePath),
    axios: axios
  }); // storage

  this.storage = new StorageHelper({
    api: "".concat(STORAGE_URL).concat(basePath),
    axios: axios
  }); // object

  this.object = new ObjectHelper({
    api: "".concat(OBJECT_URL).concat(basePath),
    axios: axios
  }); // indexing

  this.indexing = new IndexingHelper({
    api: "".concat(INDEXING_URL).concat(basePath),
    axios: axios
  }); // combiner

  this.combiner = new CombinerHelper({
    api: "".concat(COMBINER_URL).concat(basePath),
    axios: axios
  }); // rules

  this.rules = new RulesHelper({
    api: "".concat(RULES_URL).concat(basePath),
    axios: axios
  });
};

module.exports = FDNS;