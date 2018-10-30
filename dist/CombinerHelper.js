"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var querystring = require('querystring'); // Combiner Microservice Helper


var CombinerHelper =
/*#__PURE__*/
function () {
  _createClass(CombinerHelper, [{
    key: "targetTypes",
    // targetType options
    get: function get() {
      return ['xlsx', 'csv'];
    } // orientation options

  }, {
    key: "orientations",
    get: function get() {
      return ['portrait', 'landscape'];
    }
  }]);

  function CombinerHelper() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, CombinerHelper);

    var axios = opts.axios,
        api = opts.api;
    this.axios = axios;
    this.api = api;
  } // index


  _createClass(CombinerHelper, [{
    key: "index",
    value: function index() {
      return this.axios.get("".concat(this.api, "/"));
    } // Export data to CSV or XLSX

  }, {
    key: "export",
    value: function _export() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _opts$targetType = opts.targetType,
          targetType = _opts$targetType === void 0 ? 'xlsx' : _opts$targetType,
          config = opts.config,
          file = opts.file,
          _opts$filename = opts.filename,
          filename = _opts$filename === void 0 ? '' : _opts$filename,
          _opts$orientation = opts.orientation,
          orientation = _opts$orientation === void 0 ? 'portrait' : _opts$orientation,
          _opts$includeHeader = opts.includeHeader,
          includeHeader = _opts$includeHeader === void 0 ? true : _opts$includeHeader,
          _opts$sortFiles = opts.sortFiles,
          sortFiles = _opts$sortFiles === void 0 ? false : _opts$sortFiles,
          _opts$responseType = opts.responseType,
          responseType = _opts$responseType === void 0 ? 'json' : _opts$responseType;
      var qs = querystring.stringify({
        filename: filename,
        orientation: orientation,
        includeHeader: includeHeader,
        sortFiles: sortFiles
      });
      return this.axios.post("".concat(this.api, "/").concat(targetType, "/").concat(config, "?").concat(qs), file, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: responseType
      });
    } // Flatten JSON object

  }, {
    key: "flatten",
    value: function flatten() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _opts$targetType2 = opts.targetType,
          targetType = _opts$targetType2 === void 0 ? 'xlsx' : _opts$targetType2,
          file = opts.file;
      return this.axios.post("".concat(this.api, "/").concat(targetType, "/flatten"), file, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } // Get configuration

  }, {
    key: "getConfig",
    value: function getConfig() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var config = opts.config;
      return this.axios.get("".concat(this.api, "/config/").concat(config));
    } // Create or update rules for the specified configuration

  }, {
    key: "createConfig",
    value: function createConfig() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var config = opts.config,
          payload = opts.payload;
      return this.axios.post("".concat(this.api, "/config/").concat(config), payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } // Create or update rules for the specified configuration

  }, {
    key: "updateConfig",
    value: function updateConfig() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var config = opts.config,
          payload = opts.payload;
      return this.axios.put("".concat(this.api, "/config/").concat(config), payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } // Delete configuration

  }, {
    key: "deleteConfig",
    value: function deleteConfig() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var config = opts.config;
      return this.axios.delete("".concat(this.api, "/config/").concat(config));
    }
  }]);

  return CombinerHelper;
}();

module.exports = CombinerHelper;