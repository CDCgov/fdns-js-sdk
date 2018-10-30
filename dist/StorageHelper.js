"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var querystring = require('querystring'); // Storage Microservice Helper


var StorageHelper =
/*#__PURE__*/
function () {
  function StorageHelper() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, StorageHelper);

    var axios = opts.axios,
        api = opts.api;
    this.axios = axios;
    this.api = api;
  } // index


  _createClass(StorageHelper, [{
    key: "index",
    value: function index() {
      return this.axios.get("".concat(this.api, "/"));
    } // Get all drawers

  }, {
    key: "getDrawers",
    value: function getDrawers() {
      return this.axios.get("".concat(this.api, "/drawer"));
    } // Get drawer

  }, {
    key: "getDrawer",
    value: function getDrawer() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var name = opts.name;
      return this.axios.get("".concat(this.api, "/drawer/").concat(name));
    } // Create drawer

  }, {
    key: "createDrawer",
    value: function createDrawer() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var name = opts.name;
      return this.axios.put("".concat(this.api, "/drawer/").concat(name));
    } // Delete drawer

  }, {
    key: "deleteDrawer",
    value: function deleteDrawer() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var name = opts.name;
      return this.axios.delete("".concat(this.api, "/drawer/").concat(name));
    } // List all nodes in a drawer

  }, {
    key: "listNodes",
    value: function listNodes() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var name = opts.name,
          _opts$prefix = opts.prefix,
          prefix = _opts$prefix === void 0 ? '' : _opts$prefix;
      var qs = querystring.stringify({
        prefix: prefix
      });
      return this.axios.get("".concat(this.api, "/drawer/nodes/").concat(name, "?").concat(qs));
    } // Get node

  }, {
    key: "getNode",
    value: function getNode() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var name = opts.name,
          id = opts.id;
      var qs = querystring.stringify({
        id: id
      });
      return this.axios.get("".concat(this.api, "/node/").concat(name, "?").concat(qs));
    } // Create node

  }, {
    key: "createNode",
    value: function createNode() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var name = opts.name,
          file = opts.file,
          id = opts.id,
          _opts$generateStruct = opts.generateStruct,
          generateStruct = _opts$generateStruct === void 0 ? false : _opts$generateStruct,
          _opts$generateId = opts.generateId,
          generateId = _opts$generateId === void 0 ? false : _opts$generateId,
          _opts$replace = opts.replace,
          replace = _opts$replace === void 0 ? false : _opts$replace;
      var qs = querystring.stringify({
        id: id,
        generateStruct: generateStruct,
        generateId: generateId,
        replace: replace
      });
      return this.axios.post("".concat(this.api, "/node/").concat(name, "?").concat(qs), file, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } // Update node

  }, {
    key: "updateNode",
    value: function updateNode() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var name = opts.name,
          file = opts.file,
          id = opts.id;
      var qs = querystring.stringify({
        id: id
      });
      return this.axios.put("".concat(this.api, "/node/").concat(name, "?").concat(qs), file, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } // Delete node

  }, {
    key: "deleteNode",
    value: function deleteNode() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var name = opts.name,
          id = opts.id;
      var qs = querystring.stringify({
        id: id
      });
      return this.axios.delete("".concat(this.api, "/node/").concat(name, "?").concat(qs));
    } // Download node

  }, {
    key: "downloadNode",
    value: function downloadNode() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var name = opts.name,
          id = opts.id;
      var qs = querystring.stringify({
        id: id
      });
      return this.axios.get("".concat(this.api, "/node/").concat(name, "/dl?").concat(qs));
    } // Copy node

  }, {
    key: "copyNode",
    value: function copyNode() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var source = opts.source,
          target = opts.target,
          sourceId = opts.sourceId,
          targetId = opts.targetId,
          _opts$generateStruct2 = opts.generateStruct,
          generateStruct = _opts$generateStruct2 === void 0 ? false : _opts$generateStruct2,
          _opts$generateId2 = opts.generateId,
          generateId = _opts$generateId2 === void 0 ? false : _opts$generateId2,
          _opts$deleteOriginal = opts.deleteOriginal,
          deleteOriginal = _opts$deleteOriginal === void 0 ? false : _opts$deleteOriginal;
      var qs = querystring.stringify({
        sourceId: sourceId,
        targetId: targetId,
        generateStruct: generateStruct,
        generateId: generateId,
        deleteOriginal: deleteOriginal
      });
      return this.axios.put("".concat(this.api, "/node/copy/").concat(source, "/").concat(target, "?").concat(qs));
    }
  }]);

  return StorageHelper;
}();

module.exports = StorageHelper;