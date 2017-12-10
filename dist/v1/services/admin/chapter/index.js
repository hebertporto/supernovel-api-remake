'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _schema = require('./schema');

var _chapter = require('./../../../models/chapter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', (0, _expressValidation2.default)(_schema.createChapterSchema), function (_ref, res, next) {
  var body = _ref.body;

  (0, _chapter.create)(body).then(function (payload) {
    return res.status(201).json(payload);
  }).catch(function (error) {
    return next(error);
  });
});

router.get('/:chapterId?', function (_ref2, res, next) {
  var params = _ref2.params;
  var chapterId = params.chapterId;

  (0, _chapter.findByIdOrFindAll)(chapterId).then(function (payload) {
    return res.status(200).json(payload);
  }).catch(function (error) {
    return next(error);
  });
});

router.get('/byNovel/:novelId', function (_ref3, res, next) {
  var params = _ref3.params,
      query = _ref3.query;
  var novelId = params.novelId;
  var currentPage = query.currentPage;

  (0, _chapter.findByNovel)(novelId, currentPage).then(function (payload) {
    return res.status(200).json(payload);
  }).catch(function (error) {
    return next(error);
  });
});

router.delete('/:chapterId', function (_ref4, res, next) {
  var params = _ref4.params;
  var chapterId = params.chapterId;

  (0, _chapter.remove)(chapterId).then(function (payload) {
    return res.status(200).json(payload);
  }).catch(function (error) {
    return next(error);
  });
});

router.put('/:chapterId', function (_ref5, res, next) {
  var body = _ref5.body,
      params = _ref5.params;
  var chapterId = params.chapterId;


  (0, _chapter.update)(body, chapterId).then(function (payload) {
    return res.status(200).json(payload);
  }).catch(function (error) {
    return next(error);
  });
});

exports.default = router;