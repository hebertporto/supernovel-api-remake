'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compare = exports.hash = undefined;

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var saltRounds = 10;

var hash = exports.hash = _bluebird2.default.promisify(function (password, cb) {
  return _bcryptjs2.default.hash(password, saltRounds, cb);
});

var compare = exports.compare = _bluebird2.default.promisify(_bcryptjs2.default.compare);