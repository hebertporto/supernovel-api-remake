'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validationError = validationError;
exports.internalError = internalError;

var _expressValidation = require('express-validation');

var _messages = require('./../config/messages');

var messages = _interopRequireWildcard(_messages);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function validationError(err, req, res, next) {
  if (err instanceof _expressValidation.ValidationError) {
    return res.status(422).json({
      message: messages.VALIDATION_ERROR,
      payload: err.errors,
      status: 422
    });
  }
  return next(err);
}

function internalError(err, req, res, next) {
  next(res.status(err.status || 500).json({
    payload: err.payload ? {} : err,
    status: err.status || 500,
    message: err.message || messages.INTERNAL_ERROR
  }));
}