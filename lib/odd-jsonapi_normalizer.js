(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("odd-jsonapi_normalizer", [], factory);
	else if(typeof exports === 'object')
		exports["odd-jsonapi_normalizer"] = factory();
	else
		root["odd-jsonapi_normalizer"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Normalizer; });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Normalizer = /*#__PURE__*/function () {
  /**
   *Creates an instance of Normalizer.
   * @param {Object} response response that returned by Axios
   * @memberof Normalizer
   */
  function Normalizer(response) {
    _classCallCheck(this, Normalizer);

    this.data = Array.isArray(response.data) ? response.data : [response.data];
    this.includedResources = response.included || [];
    this.resources = [].concat(_toConsumableArray(this.data), _toConsumableArray(this.includedResources));
    this.serverSideSort = {};
    this.entities = {};
    this.meta = response.meta;
  }
  /**
   * short hand for new Normalizer(response).normalize()
   *
   * @static
   * @param {Object} response response that returned by Axios
   * @returns {Object} { serverSideSort, entities, meta }
   * @memberof Normalizer
   */


  _createClass(Normalizer, [{
    key: "normalize",

    /**
     * normalizing JSON:API response
     *
     * @returns {Object} { serverSideSort, entities, meta }
     * @memberof Normalizer
     */
    value: function normalize() {
      var _this = this;

      this.resources.forEach(function (resource) {
        _this.__recordServerSideSort(resource);

        _this.__writeToEntities(resource);
      });
      return {
        entities: this.entities,
        meta: this.meta,
        serverSideSort: this.serverSideSort
      };
    }
    /**
     * keep server-side sort by an array of ids
     *
     * @param {Object} resource JSON:API resource object
     * @memberof Normalizer
     */

  }, {
    key: "__recordServerSideSort",
    value: function __recordServerSideSort(resource) {
      if (!this.serverSideSort[resource.type]) this.serverSideSort[resource.type] = [];
      this.serverSideSort[resource.type].push(resource.id);
    }
    /**
     * record resource into entities object in `entities[type][id]` format.
     * will remove `type` property.
     * relationships will been added as attributes, and each relationship will contain `type` and `id` from JSON:API.
     *
     * @param {Object} resource JSON:API resource object
     * @memberof Normalizer
     */

  }, {
    key: "__writeToEntities",
    value: function __writeToEntities(resource) {
      if (!this.entities[resource.type]) this.entities[resource.type] = {};
      this.entities[resource.type][resource.id] = Object.assign({
        id: resource.id
      }, resource.attributes, this.__relationshipsFrom(resource), this.__apiData(resource));
    }
    /**
     * Converting `relationships` in a resource into
     * `{ brand: { type: 'product-brand', id: '1' } }` format.
     * If it is an one-to-many relationship, result will like
     * `{ variants: [{ type: 'product-variants', id: '1' }, { type: 'product-variants', id: '2' }] }`
     *
     * @param {Object} resource JSON:API resource object
     * @returns
     * @memberof Normalizer
     */

  }, {
    key: "__relationshipsFrom",
    value: function __relationshipsFrom(resource) {
      if (!resource.relationships) return null;
      var result = {};
      Object.keys(resource.relationships).forEach(function (relationshipName) {
        result[relationshipName] = resource.relationships[relationshipName].data;
      });
      return result;
    }
    /**
     * save JSON:API resource type and otherinfo in `__apiData` attribute.
     *
     * @param {Object} resource JSON:API resource object
     * @returns
     * @memberof Normalizer
     */

  }, {
    key: "__apiData",
    value: function __apiData(resource) {
      var result = {
        __apiInfo: {
          type: resource.type
        }
      };
      if (resource.hasOwnProperty('links')) Object.assign(result.__apiInfo, {
        links: resource.links
      });
      return result;
    }
  }], [{
    key: "normalize",
    value: function normalize(response) {
      return new this(response).normalize();
    }
  }]);

  return Normalizer;
}();



/***/ })
/******/ ]);
});
//# sourceMappingURL=odd-jsonapi_normalizer.js.map