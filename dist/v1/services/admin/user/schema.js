'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerSchema = exports.updateUserSchema = exports.findUserByIdSchema = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findUserByIdSchema = exports.findUserByIdSchema = {
  params: {
    id: _joi2.default.string()
  }
};

var updateUserSchema = exports.updateUserSchema = {
  body: {
    name: _joi2.default.string(),
    email: _joi2.default.string().email(),
    type: _joi2.default.string().valid('ADIM', 'PUBLISHER', 'USER'),
    avatar: _joi2.default.string(),
    facebook: _joi2.default.string(),
    twitter: _joi2.default.string(),
    gplus: _joi2.default.string(),
    linkedin: _joi2.default.string(),
    userStatus: _joi2.default.string().valid('PENDING', 'REQUESTED', 'ACCEPTED', 'DENIED', 'BLOCKED'),
    userId: _joi2.default.string()
  }

};

var registerSchema = exports.registerSchema = {};