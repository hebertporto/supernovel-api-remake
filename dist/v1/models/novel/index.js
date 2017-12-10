'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.novelModel = novelModel;
exports.create = create;
exports.findWithoutPagination = findWithoutPagination;
exports.findByIdOrFindAll = findByIdOrFindAll;
exports.remove = remove;
exports.update = update;

var _datauri = require('datauri');

var _datauri2 = _interopRequireDefault(_datauri);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _upload = require('./../../utils/upload');

var _db = require('./../../config/db');

var _db2 = _interopRequireDefault(_db);

var _messages = require('./../../config/messages');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dUri = new _datauri2.default();

var NovelSchema = new _db2.default.Schema({
  name: {
    type: String,
    require: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  translation_team: {
    type: String,
    required: true
  },
  cover_url: {
    type: String,
    require: true
  },
  date_start: {
    type: Date
  },
  date_end: {
    type: Date
  },
  users: {
    type: [_db2.default.SchemaTypes.ObjectId],
    ref: 'User'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

function novelModel() {
  return _db2.default.model('Novel', NovelSchema);
}

var Novel = novelModel();

function createNovel(data) {
  return new Novel(data).save().then(function (result) {
    return result;
  }).catch(function (err) {
    throw Object({
      message: _messages.CREATE_NOVEL_FAILED,
      status: 422,
      payload: err.name
    });
  });
}

function updateNovel(data, novelId) {
  var ObjectId = _db2.default.Types.ObjectId;

  return Novel.findOneAndUpdate({ _id: ObjectId(novelId) }, { $set: data }, { new: true }).then(function (payload) {
    return payload;
  }).catch(function (err) {
    throw new Error({
      message: _messages.UPDATE_NOVEL_FAILED,
      status: 422,
      payload: err
    });
  });
}

function create(data, image) {
  if (image) {
    dUri.format(_path2.default.extname(image.originalname).toString(), image.buffer);
    return _upload.serviceCloudinary.uploader.upload(dUri.content).then(function (result) {
      var novelWithImage = data;
      novelWithImage.cover_url = result.secure_url;
      return createNovel(novelWithImage);
    }).catch(function (err) {
      if (err) {
        throw Object({
          message: _messages.CREATE_NOVEL_FAILED,
          status: 422,
          payload: err.name
        });
      }
    });
  }
  return createNovel(data);
}

function findWithoutPagination() {
  return Novel.find({}).then(function (payload) {
    return payload;
  }).catch(function (err) {
    throw new Error({
      payload: err,
      code: 500
    });
  });
}

function findByIdOrFindAll(novelId, currentPage) {
  if (novelId) {
    var ObjectId = _db2.default.Types.ObjectId;

    return Novel.findById(ObjectId(novelId)).then(function (result) {
      return result;
    }).catch(function (err) {
      throw new Error({
        payload: err,
        code: 500
      });
    });
  }
  var perPage = 20;
  var page = currentPage || 1;

  return Novel.aggregate([{
    $lookup: {
      from: 'chapters',
      localField: '_id',
      foreignField: 'novel',
      as: 'chapters'
    }
  }, { $unwind: '$chapters' }, { $sort: { 'chapters.number': -1 } }, {
    $project: {
      name: 1,
      cover_url: 1,
      translation_team: 1,
      author: 1,
      chapters: {
        number: 1,
        title: 1,
        created_at: 1
      }
    }
  }]).skip(perPage * page - perPage).limit(perPage).then(function (result) {
    return Novel.count().then(function (contResult) {
      return {
        novels: result,
        currentPage: page,
        pages: Math.ceil(contResult / perPage)
      };
    }).catch(function (err) {
      throw new Error({
        payload: err,
        code: 500
      });
    });
  }).catch(function (err) {
    throw new Error({
      payload: err,
      code: 500
    });
  });
}

function remove(novelId) {
  var ObjectId = _db2.default.Types.ObjectId;


  return Novel.remove({ _id: ObjectId(novelId) }).exec().then(function (payload) {
    return payload;
  }).catch(function (err) {
    throw Object({
      message: _messages.REMOVE_NOVEL_FAILED,
      status: 422,
      payload: err
    });
  });
}

function update(data, novelId, image) {
  if (image) {
    dUri.format(_path2.default.extname(image.originalname).toString(), image.buffer);
    return _upload.serviceCloudinary.uploader.upload(dUri.content).then(function (result) {
      var novelWithImage = data;
      novelWithImage.cover_url = result.secure_url;
      return updateNovel(novelWithImage, novelId);
    }).catch(function (err) {
      if (err) {
        throw Object({
          message: _messages.UPDATE_NOVEL_FAILED,
          status: 422,
          payload: err.name
        });
      }
    });
  }
  return updateNovel(data, novelId);
}