'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chapterModel = chapterModel;
exports.create = create;
exports.findByIdOrFindAll = findByIdOrFindAll;
exports.findByChapterId = findByChapterId;
exports.findByNovel = findByNovel;
exports.remove = remove;
exports.update = update;

var _db = require('./../../config/db');

var _db2 = _interopRequireDefault(_db);

var _messages = require('./../../config/messages');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChapterSchema = new _db2.default.Schema({
  number: {
    type: Number,
    require: true
  },
  title: {
    type: String,
    required: true
  },
  translators: {
    type: String,
    required: true
  },
  revisors: {
    type: String,
    required: true
  },
  content: {
    type: String,
    require: true
  },
  novel: {
    type: _db2.default.SchemaTypes.ObjectId,
    ref: 'Novel'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

function chapterModel() {
  return _db2.default.model('Chapter', ChapterSchema);
}

var Chapter = chapterModel();

function create(data) {
  return new Chapter(data).save().then(function (result) {
    return result;
  }).catch(function (err) {
    throw Object({ message: _messages.CREATE_CHAPTER_FAILED, status: 422, payload: err });
  });
}

function findByIdOrFindAll(chapterId, currentPage) {
  if (chapterId) {
    var ObjectId = _db2.default.Types.ObjectId;

    return Chapter.findById(ObjectId(chapterId)).then(function (result) {
      return result;
    }).catch(function (err) {
      throw new Error({ payload: err, code: 500 });
    });
  }
  var perPage = 2;
  var page = currentPage || 1;

  return Chapter.find({}).skip(perPage * page - perPage).limit(perPage).then(function (result) {
    return Chapter.count().then(function (contResult) {
      return {
        chapters: result,
        currentPage: page,
        pages: Math.ceil(contResult / perPage)
      };
    }).catch(function (err) {
      throw new Error({ payload: err, code: 500 });
    });
  }).catch(function (err) {
    throw new Error({ payload: err, code: 500 });
  });
}

function findByChapterId(chapterId) {
  var ObjectId = _db2.default.Types.ObjectId;

  return Chapter.findById(ObjectId(chapterId)).then(function (result) {
    return result;
  }).catch(function (err) {
    throw new Error({ payload: err, code: 500 });
  });
}

function findByNovel(novelId, currentPage) {
  var perPage = 10;
  var page = currentPage || 1;
  var ObjectId = _db2.default.Types.ObjectId;


  return Chapter.find({ novel: ObjectId(novelId) }).skip(perPage * page - perPage).limit(perPage).then(function (result) {
    return Chapter.count().then(function (contResult) {
      return {
        chapters: result,
        currentPage: page,
        pages: Math.ceil(contResult / perPage)
      };
    }).catch(function (err) {
      throw new Error({ payload: err, code: 500 });
    });
  }).catch(function (err) {
    throw new Error({ payload: err, code: 500 });
  });
}

function remove(chapterId) {
  var ObjectId = _db2.default.Types.ObjectId;


  return Chapter.remove({ _id: ObjectId(chapterId) }).exec().then(function (payload) {
    return payload;
  }).catch(function (err) {
    throw Object({ message: _messages.REMOVE_CHAPTER_FAILED, status: 422, payload: err });
  });
}

function update(body, chapterId) {
  var ObjectId = _db2.default.Types.ObjectId;


  return Chapter.findOneAndUpdate({ _id: ObjectId(chapterId) }, { $set: body }, { new: true }).then(function (payload) {
    return payload;
  }).catch(function (err) {
    throw new Error({
      message: _messages.UPDATE_CHAPTER_FAILED,
      status: 422,
      payload: err
    });
  });
}