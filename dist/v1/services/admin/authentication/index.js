'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _user = require('../../../models/user/');

var _schema = require('./schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/login', (0, _expressValidation2.default)(_schema.loginSchema), function (_ref, res, next) {
  var body = _ref.body;
  var email = body.email,
      password = body.password;

  (0, _user.login)(email, password).then(function (payload) {
    return res.status(200).json(payload);
  }).catch(function (error) {
    return next(error);
  });
});

router.post('/register', (0, _expressValidation2.default)(_schema.registerSchema), function (_ref2, res, next) {
  var body = _ref2.body;

  (0, _user.register)(body).then(function (payload) {
    return res.status(201).json(payload);
  }).catch(function (error) {
    return next(error);
  });
});

exports.default = router;