'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _novel = require('./../../models/novel');

var _feature = require('./../../models/feature');

var _chapter = require('./../../models/chapter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/featureNovels', function (req, res, next) {
  (0, _feature.findAllActive)().then(function (payload) {
    return res.status(200).json(payload);
  }).catch(function (error) {
    return next(error);
  });
});

router.get('/novels/:novelId?', function (_ref, res, next) {
  var params = _ref.params,
      query = _ref.query;
  var novelId = params.novelId;
  var currentPage = query.currentPage;

  (0, _novel.findByIdOrFindAll)(novelId, currentPage).then(function (payload) {
    return res.status(200).json(payload);
  }).catch(function (error) {
    return next(error);
  });
});
// TODO - get last chaptar - by number  //
router.get('/chapters/byNovel/:novelId', function (_ref2, res, next) {
  var params = _ref2.params;
  var novelId = params.novelId;

  (0, _chapter.findByNovel)(novelId).then(function (payload) {
    return res.status(200).json(payload);
  }).catch(function (error) {
    return next(error);
  });
});

router.get('/chapters/:chapterId', function (_ref3, res, next) {
  var params = _ref3.params;
  var chapterId = params.chapterId;

  (0, _chapter.findByChapterId)(chapterId).then(function (payload) {
    return res.status(200).json(payload);
  }).catch(function (error) {
    return next(error);
  });
});

exports.default = router;