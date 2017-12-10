'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.featuredModel = featuredModel;
exports.create = create;
exports.findAllActive = findAllActive;
exports.findByIdOrFindAll = findByIdOrFindAll;
exports.remove = remove;
exports.update = update;

var _datauri = require('datauri');

var _datauri2 = _interopRequireDefault(_datauri);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _db = require('./../../config/db');

var _db2 = _interopRequireDefault(_db);

var _upload = require('./../../utils/upload');

var _messages = require('./../../config/messages');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dUri = new _datauri2.default();

var FeatureSchema = new _db2.default.Schema({
  shownSince: {
    type: Date,
    require: true
  },
  imagePath: {
    type: String
  },
  active: {
    type: Boolean,
    require: true
  },
  novel: {
    type: _db2.default.SchemaTypes.ObjectId,
    ref: 'Novel',
    require: true
  }
}, {
  strict: true,
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

function featuredModel() {
  return _db2.default.model('Feature', FeatureSchema);
}

var Feature = featuredModel();

function createFeatured(data) {
  return new Feature(data).save().then(function (result) {
    return result;
  }).catch(function (err) {
    throw Object({
      message: _messages.CREATE_FEATURED_FAILED,
      status: 422,
      payload: err.name
    });
  });
}

function create(data, image) {
  if (image) {
    dUri.format(_path2.default.extname(image.originalname).toString(), image.buffer);
    return _upload.serviceCloudinary.uploader.upload(dUri.content).then(function (result) {
      var featuredlWithImage = data;
      featuredlWithImage.imagePath = result.secure_url;
      return createFeatured(featuredlWithImage);
    }).catch(function (err) {
      if (err) {
        throw Object({
          message: _messages.CREATE_FEATURED_FAILED,
          status: 422,
          payload: err.name
        });
      }
    });
  }
  return createFeatured(data);
}

function findAllActive() {
  return Feature.aggregate([{ $match: { active: true } }, {
    $lookup: {
      from: 'novels',
      localField: 'novel',
      foreignField: '_id',
      as: 'novel'
    }
  }, {
    $project: {
      shownSince: 1,
      imagePath: 1,
      novel: {
        _id: 1,
        name: 1,
        cover_url: 1
      }
    }
  }]).then(function (payload) {
    return payload;
  }).catch(function (err) {
    throw new Error({
      payload: err,
      code: 500
    });
  });
}

function findByIdOrFindAll(featuredId, currentPage) {
  if (featuredId) {
    var ObjectId = _db2.default.Types.ObjectId;

    return Feature.findById(ObjectId(featuredId)).then(function (result) {
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

  return Feature.aggregate([{ $match: { active: true } }, {
    $lookup: {
      from: 'novels',
      localField: 'novel',
      foreignField: '_id',
      as: 'novel'
    }
  }, {
    $project: {
      shownSince: 1,
      imagePath: 1,
      novel: {
        _id: 1,
        name: 1,
        cover_url: 1
      }
    }
  }]).skip(perPage * page - perPage).limit(perPage).then(function (result) {
    return Feature.count().then(function (contResult) {
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

function remove(featuredId) {
  var ObjectId = _db2.default.Types.ObjectId;


  return Feature.remove({ _id: ObjectId(featuredId) }).exec().then(function (payload) {
    return payload;
  }).catch(function (err) {
    throw Object({
      message: _messages.REMOVE_FEATURED_FAILED,
      status: 422,
      payload: err
    });
  });
}

function updateFeatured(body, featuredId) {
  var ObjectId = _db2.default.Types.ObjectId;


  return Feature.findOneAndUpdate({ _id: ObjectId(featuredId) }, { $set: body }, { new: true }).then(function (payload) {
    return payload;
  }).catch(function (err) {
    throw new Error({
      message: _messages.UPDATE_FEATURED_FAILED,
      status: 422,
      payload: err
    });
  });
}

function update(data, novelId, image) {
  if (image) {
    dUri.format(_path2.default.extname(image.originalname).toString(), image.buffer);
    return _upload.serviceCloudinary.uploader.upload(dUri.content).then(function (result) {
      var featureWithImage = data;
      featureWithImage.cover_url = result.secure_url;
      return updateFeatured(featureWithImage, novelId);
    }).catch(function (err) {
      if (err) {
        throw Object({
          message: _messages.UPDATE_FEATURED_FAILED,
          status: 422,
          payload: err.name
        });
      }
    });
  }
  return updateFeatured(data, novelId);
}