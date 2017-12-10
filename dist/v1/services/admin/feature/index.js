'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _upload = require('./../../../utils/upload');

var _schema = require('./schema');

var _feature = require('./../../../models/feature');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', _upload.upload.single('file'), (0, _expressValidation2.default)(_schema.createFeatureSchema), function (_ref, res, next) {
  var body = _ref.body,
      file = _ref.file;

  (0, _feature.create)(body, file).then(function (payload) {
    return res.status(201).json(payload);
  }).catch(function (error) {
    return next(error);
  });
});

router.get('/:featureId?', function (_ref2, res, next) {
  var params = _ref2.params,
      query = _ref2.query;
  var featureId = params.featureId;
  var currentPage = query.currentPage;

  (0, _feature.findByIdOrFindAll)(featureId, currentPage).then(function (payload) {
    return res.status(200).json(payload);
  }).catch(function (error) {
    return next(error);
  });
});

router.delete('/:featureId', function (_ref3, res, next) {
  var params = _ref3.params;
  var featureId = params.featureId;

  (0, _feature.remove)(featureId).then(function (payload) {
    return res.status(200).json(payload);
  }).catch(function (error) {
    return next(error);
  });
});

router.put('/:featureId', _upload.upload.single('file'), function (_ref4, res, next) {
  var body = _ref4.body,
      params = _ref4.params,
      file = _ref4.file;
  var featureId = params.featureId;

  (0, _feature.update)(body, featureId, file).then(function (payload) {
    return res.status(200).json(payload);
  }).catch(function (error) {
    return next(error);
  });
});

exports.default = router;