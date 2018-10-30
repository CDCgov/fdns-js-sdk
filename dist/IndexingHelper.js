"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var querystring = require('querystring'); // Indexing Microservice Helper


var IndexingHelper =
/*#__PURE__*/
function () {
  function IndexingHelper() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, IndexingHelper);

    var axios = opts.axios,
        api = opts.api;
    this.axios = axios;
    this.api = api;
  } // index


  _createClass(IndexingHelper, [{
    key: "index",
    value: function index() {
      return this.axios.get("".concat(this.api, "/"));
    } // Creates a new index.

  }, {
    key: "createIndex",
    value: function createIndex() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var type = opts.type;
      return this.axios.put("".concat(this.api, "/index/").concat(type));
    } // Delete index.

  }, {
    key: "deleteIndex",
    value: function deleteIndex() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var type = opts.type;
      return this.axios.delete("".concat(this.api, "/index/").concat(type));
    } // Get an indexed object.

  }, {
    key: "getIndexedObject",
    value: function getIndexedObject() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var type = opts.type,
          id = opts.id,
          _opts$hydrate = opts.hydrate,
          hydrate = _opts$hydrate === void 0 ? false : _opts$hydrate;
      var qs = querystring.stringify({
        hydrate: hydrate
      });
      return this.axios.get("".concat(this.api, "/get/").concat(type, "/").concat(id, "?").concat(qs));
    } // Index an existing stored object.

  }, {
    key: "indexObject",
    value: function indexObject() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var type = opts.type,
          id = opts.id;
      return this.axios.post("".concat(this.api, "/index/").concat(type, "/").concat(id));
    } // Index all objects in MongoDB.

  }, {
    key: "indexAll",
    value: function indexAll() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var type = opts.type;
      return this.axios.put("".concat(this.api, "/index/all/").concat(type));
    } // Index a list of objects.

  }, {
    key: "indexList",
    value: function indexList() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var type = opts.type,
          _opts$data = opts.data,
          data = _opts$data === void 0 ? [] : _opts$data;
      return this.axios.post("".concat(this.api, "/index/bulk/").concat(type), data);
    } // Define a mapping in elasticsearch.

  }, {
    key: "createMapping",
    value: function createMapping() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var type = opts.type,
          payload = opts.payload;
      return this.axios.post("".concat(this.api, "/mapping/").concat(type), payload);
    } // Search object.

  }, {
    key: "search",
    value: function search() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var type = opts.type,
          _opts$query = opts.query,
          query = _opts$query === void 0 ? '' : _opts$query,
          _opts$hydrate2 = opts.hydrate,
          hydrate = _opts$hydrate2 === void 0 ? false : _opts$hydrate2,
          _opts$from = opts.from,
          from = _opts$from === void 0 ? 0 : _opts$from,
          _opts$size = opts.size,
          size = _opts$size === void 0 ? 100 : _opts$size,
          _opts$scroll = opts.scroll,
          scroll = _opts$scroll === void 0 ? '1m' : _opts$scroll;
      var qs = querystring.stringify({
        query: query,
        hydrate: hydrate,
        from: from,
        size: size,
        scroll: scroll
      });
      return this.axios.post("".concat(this.api, "/search/").concat(type, "?").concat(qs));
    } // Scroll search result.

  }, {
    key: "searchScrollIndex",
    value: function searchScrollIndex() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var type = opts.type,
          scrollId = opts.scrollId,
          _opts$scroll2 = opts.scroll,
          scroll = _opts$scroll2 === void 0 ? '1m' : _opts$scroll2,
          _opts$hydrate3 = opts.hydrate,
          hydrate = _opts$hydrate3 === void 0 ? false : _opts$hydrate3;
      var qs = querystring.stringify({
        scroll: scroll,
        scrollId: scrollId,
        hydrate: hydrate
      });
      return this.axios.post("".concat(this.api, "/search/scroll/").concat(type, "?").concat(qs));
    } // Delete Scroll Index.

  }, {
    key: "deleteScrollIndex",
    value: function deleteScrollIndex() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var scrollId = opts.scrollId;
      var qs = querystring.stringify({
        scrollId: scrollId
      });
      return this.axios.delete("".concat(this.api, "/search/scroll?").concat(qs));
    }
  }]);

  return IndexingHelper;
}();

module.exports = IndexingHelper;