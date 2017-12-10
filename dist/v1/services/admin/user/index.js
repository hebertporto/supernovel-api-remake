'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _user = require('./../../../models/user');

var _schema = require('./schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/:userId', (0, _expressValidation2.default)(_schema.findUserByIdSchema), function (_ref, res, next) {
  var params = _ref.params;
  var userId = params.userId;

  (0, _user.getUserById)(userId).then(function (payload) {
    return res.status(200).json({ payload: payload, status: 200 });
  }).catch(function (error) {
    return next(error);
  });
});

router.post('/register', function (_ref2, res, next) {
  var body = _ref2.body;

  (0, _user.register)(body).then(function (payload) {
    return res.status(201).json({
      message: 'User Criado Com Sucesso',
      payload: payload
    });
  }).catch(function (error) {
    return next(error);
  });
});

router.put('/update', (0, _expressValidation2.default)(_schema.updateUserSchema), function (_ref3, res, next) {
  var body = _ref3.body;
  var userId = body.userId;

  (0, _user.update)(body, userId).then(function (payload) {
    return res.status(200).json({
      message: 'User Atualizado com Sucesso.',
      payload: payload
    });
  }).catch(function (error) {
    return next(error);
  });
});

exports.default = router;