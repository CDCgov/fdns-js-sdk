"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var querystring = require('querystring'); // Rules Microservice Helper


var RulesHelper =
/*#__PURE__*/
function () {
  function RulesHelper() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, RulesHelper);

    var axios = opts.axios,
        api = opts.api;
    this.axios = axios;
    this.api = api;
  } // index


  _createClass(RulesHelper, [{
    key: "index",
    value: function index() {
      return this.axios.get("".concat(this.api, "/"));
    } // Get saved rules for the specified profile

  }, {
    key: "get",
    value: function get() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var profile = opts.profile;
      return this.axios.get("".concat(this.api, "/").concat(profile));
    } // Create or update rules for the specified profile

  }, {
    key: "create",
    value: function create() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var profile = opts.profile,
          payload = opts.payload;
      return this.axios.post("".concat(this.api, "/").concat(profile), payload);
    } // Create or update rules for the specified profile

  }, {
    key: "update",
    value: function update() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var profile = opts.profile,
          payload = opts.payload;
      return this.axios.put("".concat(this.api, "/").concat(profile), payload);
    } // Validate JSON message

  }, {
    key: "validate",
    value: function validate() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var profile = opts.profile,
          payload = opts.payload,
          _opts$explain = opts.explain,
          explain = _opts$explain === void 0 ? false : _opts$explain;
      var qs = querystring.stringify({
        explain: explain
      });

      if (profile) {
        return this.axios.post("".concat(this.api, "/validate/").concat(profile, "?").concat(qs), payload);
      }

      return this.axios.post("".concat(this.api, "/validate?").concat(qs), payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    }
  }]);

  return RulesHelper;
}();

module.exports = RulesHelper;