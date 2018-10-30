"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var querystring = require('querystring'); // Object Microservice Helper


var ObjectHelper =
/*#__PURE__*/
function () {
  _createClass(ObjectHelper, [{
    key: "csvFormats",
    // csvFormat options
    get: function get() {
      return ['Default', 'Excel', 'MySQL', 'RFC4180', 'TDF'];
    }
  }]);

  function ObjectHelper() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ObjectHelper);

    var axios = opts.axios,
        api = opts.api;
    this.axios = axios;
    this.api = api;
  } // index


  _createClass(ObjectHelper, [{
    key: "index",
    value: function index() {
      return this.axios.get("".concat(this.api, "/"));
    } // Create object

  }, {
    key: "create",
    value: function create() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var db = opts.db,
          collection = opts.collection,
          id = opts.id,
          payload = opts.payload; // Create object with id

      if (id) {
        return this.axios.post("".concat(this.api, "/").concat(db, "/").concat(collection, "/").concat(id), payload);
      }

      return this.axios.post("".concat(this.api, "/").concat(db, "/").concat(collection), payload);
    } // Get object

  }, {
    key: "get",
    value: function get() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var db = opts.db,
          collection = opts.collection,
          id = opts.id;
      return this.axios.get("".concat(this.api, "/").concat(db, "/").concat(collection, "/").concat(id));
    } // Update object

  }, {
    key: "update",
    value: function update() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var db = opts.db,
          collection = opts.collection,
          id = opts.id,
          payload = opts.payload;
      return this.axios.put("".concat(this.api, "/").concat(db, "/").concat(collection, "/").concat(id), payload);
    } // Delete object

  }, {
    key: "delete",
    value: function _delete() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var db = opts.db,
          collection = opts.collection,
          id = opts.id;
      return this.axios.delete("".concat(this.api, "/").concat(db, "/").concat(collection, "/").concat(id));
    } // Delete collection

  }, {
    key: "deleteCollection",
    value: function deleteCollection() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var db = opts.db,
          collection = opts.collection;
      return this.axios.delete("".concat(this.api, "/").concat(db, "/").concat(collection));
    } // Aggregate

  }, {
    key: "aggregate",
    value: function aggregate() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var db = opts.db,
          collection = opts.collection,
          _opts$payload = opts.payload,
          payload = _opts$payload === void 0 ? {} : _opts$payload;
      return this.axios.post("".concat(this.api, "/").concat(db, "/").concat(collection, "/aggregate"), payload);
    } // Count object(s)

  }, {
    key: "count",
    value: function count() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var db = opts.db,
          collection = opts.collection,
          _opts$payload2 = opts.payload,
          payload = _opts$payload2 === void 0 ? {} : _opts$payload2;
      return this.axios.post("".concat(this.api, "/").concat(db, "/").concat(collection, "/count"), payload);
    } // Get distinct values

  }, {
    key: "distinct",
    value: function distinct() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var db = opts.db,
          collection = opts.collection,
          field = opts.field,
          _opts$payload3 = opts.payload,
          payload = _opts$payload3 === void 0 ? {} : _opts$payload3;
      return this.axios.post("".concat(this.api, "/").concat(db, "/").concat(collection, "/distinct/").concat(field), payload);
    } // Find object(s)

  }, {
    key: "find",
    value: function find() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var db = opts.db,
          collection = opts.collection,
          _opts$payload4 = opts.payload,
          payload = _opts$payload4 === void 0 ? {} : _opts$payload4,
          _opts$from = opts.from,
          from = _opts$from === void 0 ? 0 : _opts$from,
          _opts$size = opts.size,
          size = _opts$size === void 0 ? -1 : _opts$size,
          _opts$sort = opts.sort,
          sort = _opts$sort === void 0 ? '' : _opts$sort,
          _opts$order = opts.order,
          order = _opts$order === void 0 ? 1 : _opts$order;
      var qs = querystring.stringify({
        from: from,
        size: size,
        sort: sort,
        order: order
      });
      return this.axios.post("".concat(this.api, "/").concat(db, "/").concat(collection, "/find?").concat(qs), payload);
    } // Bulk import of objects from a CSV file

  }, {
    key: "importCSV",
    value: function importCSV() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var db = opts.db,
          collection = opts.collection,
          csv = opts.csv,
          _opts$csvFormat = opts.csvFormat,
          csvFormat = _opts$csvFormat === void 0 ? 'Default' : _opts$csvFormat;
      var qs = querystring.stringify({
        csvFormat: csvFormat
      });
      return this.axios.post("".concat(this.api, "/bulk/").concat(db, "/").concat(collection, "?").concat(qs), csv, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } // Create a list of objects

  }, {
    key: "importList",
    value: function importList() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var db = opts.db,
          collection = opts.collection,
          _opts$payload5 = opts.payload,
          payload = _opts$payload5 === void 0 ? [] : _opts$payload5;
      return this.axios.post("".concat(this.api, "/multi/").concat(db, "/").concat(collection), payload);
    }
  }]);

  return ObjectHelper;
}();

module.exports = ObjectHelper;