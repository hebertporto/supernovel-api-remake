'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerSchema = exports.loginSchema = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loginSchema = exports.loginSchema = {
  body: {
    email: _joi2.default.string().email({ minDomainAtoms: 2 }).required(),
    password: _joi2.default.string().required()
  }
};

var registerSchema = exports.registerSchema = {
  body: {
    email: _joi2.default.string().email({ minDomainAtoms: 2 }).required(),
    password: _joi2.default.string().required(),
    name: _joi2.default.string().required(),
    type: _joi2.default.string().valid(['PUBLISHER', 'USER']).required()
  },
  options: {
    allowUnknownBody: false
  }
};