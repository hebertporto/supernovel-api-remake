'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerSchema = exports.createChapterSchema = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createChapterSchema = exports.createChapterSchema = {
  body: {
    number: _joi2.default.string().required(),
    title: _joi2.default.string().required(),
    translators: _joi2.default.string().required(),
    revisors: _joi2.default.string().required(),
    content: _joi2.default.string().required(),
    novel: _joi2.default.string().required()
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