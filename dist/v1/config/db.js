'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var MONGO_URL = process.env.MONGO_URL;


_mongoose2.default.Promise = _bluebird2.default;

_mongoose2.default.connect(MONGO_URL, {
  useMongoClient: true
});

exports.default = _mongoose2.default;