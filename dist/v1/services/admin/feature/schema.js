'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerSchema = exports.createFeatureSchema = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createFeatureSchema = exports.createFeatureSchema = {
  body: {
    shownSince: _joi2.default.date().required(),
    imagePath: _joi2.default.string(),
    active: _joi2.default.boolean().required(),
    novel: _joi2.default.string().required(),
    file: _joi2.default.binary()
  },
  options: {
    allowUnknownBody: false
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