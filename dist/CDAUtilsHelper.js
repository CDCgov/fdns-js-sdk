"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var querystring = require('querystring'); // CDA Utilities Microservice Helper


var CDAUtilsHelper =
/*#__PURE__*/
function () {
  function CDAUtilsHelper() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, CDAUtilsHelper);

    var axios = opts.axios,
        api = opts.api;
    this.axios = axios;
    this.api = api;
  } // index


  _createClass(CDAUtilsHelper, [{
    key: "index",
    value: function index() {
      return this.axios.get("".concat(this.api, "/"));
    } // Generate random CDA message

  }, {
    key: "generate",
    value: function generate() {
      return this.axios.get("".concat(this.api, "/generate"));
    } // Transform CDA to JSON

  }, {
    key: "toJSON",
    value: function toJSON() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var message = opts.message;
      return this.axios.post("".concat(this.api, "/json"), message, {
        headers: {
          'Content-Type': 'text/plain'
        }
      });
    } // Validate CDA message

  }, {
    key: "validate",
    value: function validate() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var message = opts.message,
          _opts$explain = opts.explain,
          explain = _opts$explain === void 0 ? false : _opts$explain;
      var qs = querystring.stringify({
        explain: explain
      });
      return this.axios.post("".concat(this.api, "/validate?").concat(qs), message, {
        headers: {
          'Content-Type': 'text/plain'
        }
      });
    }
  }]);

  return CDAUtilsHelper;
}();

module.exports = CDAUtilsHelper;