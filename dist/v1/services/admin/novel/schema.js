'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerSchema = exports.createNovelSchema = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createNovelSchema = exports.createNovelSchema = {
  body: {
    name: _joi2.default.string().required(),
    description: _joi2.default.string().required(),
    author: _joi2.default.string().required(),
    translation_team: _joi2.default.string().required(),
    cover_url: _joi2.default.string(),
    user: _joi2.default.string(),
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