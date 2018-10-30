"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var querystring = require('querystring'); // HL7 Utilities Microservice Helper


var HL7UtilsHelper =
/*#__PURE__*/
function () {
  _createClass(HL7UtilsHelper, [{
    key: "specs",
    // specs options
    get: function get() {
      return ['hl7', 'phinms'];
    }
  }]);

  function HL7UtilsHelper() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, HL7UtilsHelper);

    var axios = opts.axios,
        api = opts.api;
    this.axios = axios;
    this.api = api;
  } // index


  _createClass(HL7UtilsHelper, [{
    key: "index",
    value: function index() {
      return this.axios.get("".concat(this.api, "/"));
    } // Get case identifier

  }, {
    key: "caseId",
    value: function caseId() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var message = opts.message,
          spec = opts.spec;
      return this.axios.post("".concat(this.api, "/caseId/").concat(spec), message, {
        headers: {
          'Content-Type': 'text/plain'
        }
      });
    } // Generate random HL7 message

  }, {
    key: "generate",
    value: function generate() {
      return this.axios.get("".concat(this.api, "/generate"));
    } // Get message hash

  }, {
    key: "hash",
    value: function hash() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var message = opts.message;
      return this.axios.post("".concat(this.api, "/hash"), message, {
        headers: {
          'Content-Type': 'text/plain'
        }
      });
    } // Transform HL7 to JSON

  }, {
    key: "toJSON",
    value: function toJSON() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var spec = opts.spec,
          message = opts.message,
          profile = opts.profile;

      if (profile) {
        return this.axios.post("".concat(this.api, "/json/").concat(profile, "?spec=").concat(spec), message, {
          headers: {
            'Content-Type': 'text/plain'
          }
        });
      }

      return this.axios.post("".concat(this.api, "/json?spec=").concat(spec), message, {
        headers: {
          'Content-Type': 'text/plain'
        }
      });
    } // Transform HL7 to XML

  }, {
    key: "toXML",
    value: function toXML() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var message = opts.message;
      return this.axios.post("".concat(this.api, "/xml"), message, {
        headers: {
          'Content-Type': 'text/plain'
        }
      });
    } // Create or update rules for the specified profile

  }, {
    key: "createRules",
    value: function createRules() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var rules = opts.rules,
          profile = opts.profile;
      return this.axios.post("".concat(this.api, "/rules/").concat(profile), rules);
    } // Create or update rules for the specified profile

  }, {
    key: "updateRules",
    value: function updateRules() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var rules = opts.rules,
          profile = opts.profile;
      return this.axios.put("".concat(this.api, "/rules/").concat(profile), rules);
    } // Get saved rules for the specified profile

  }, {
    key: "getRules",
    value: function getRules() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var ruleset = opts.ruleset,
          profile = opts.profile;
      return this.axios.get("".concat(this.api, "/rules/").concat(profile, "/").concat(ruleset));
    } // Check rules against the schema

  }, {
    key: "checkRules",
    value: function checkRules() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var rules = opts.rules;
      return this.axios.post("".concat(this.api, "/rules/check"), rules);
    } // Get rules schema

  }, {
    key: "getRulesSchema",
    value: function getRulesSchema() {
      return this.axios.get("".concat(this.api, "/rules/schema"));
    } // Validate HL7 message

  }, {
    key: "validate",
    value: function validate() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var profile = opts.profile,
          message = opts.message,
          _opts$explain = opts.explain,
          explain = _opts$explain === void 0 ? false : _opts$explain,
          _opts$checkPII = opts.checkPII,
          checkPII = _opts$checkPII === void 0 ? false : _opts$checkPII;
      var qs = querystring.stringify({
        explain: explain,
        checkPII: checkPII
      });
      return this.axios.post("".concat(this.api, "/rules/validate/").concat(profile, "?").concat(qs), message, {
        headers: {
          'Content-Type': 'text/plain'
        }
      });
    }
  }]);

  return HL7UtilsHelper;
}();

module.exports = HL7UtilsHelper;