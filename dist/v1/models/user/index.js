'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.userModel = userModel;
exports.getUserById = getUserById;
exports.register = register;
exports.login = login;
exports.update = update;

var _db = require('./../../config/db');

var _db2 = _interopRequireDefault(_db);

var _crypto = require('./../../config/crypto');

var _jwt = require('./../../config/jwt');

var _messages = require('./../../config/messages');

var messages = _interopRequireWildcard(_messages);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AdminSchema = new _db2.default.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['ADIM', 'PUBLISHER', 'USER'],
    default: 'USER'
  },
  avatar: String,
  facebook: String,
  twitter: String,
  userStatus: {
    type: String,
    enum: ['PENDING', 'REQUESTED', 'ACCEPTED', 'DENIED', 'BLOCKED'],
    default: 'PENDING'
  }
}, {
  strict: true,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

AdminSchema.pre('save', true, function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(next, done) {
    var _this = this;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              if (this.password) {
                (0, _crypto.hash)(this.password).then(function (password) {
                  _this.password = password;
                  done();
                }).catch(function (e) {
                  return done(e);
                });
              }
              next();
            } catch (err) {
              next(err);
            }

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function preSave(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return preSave;
}());

function userModel() {
  return _db2.default.model('User', AdminSchema);
}

var User = userModel();

function getUserById(userId) {
  var ObjectId = _db2.default.Types.ObjectId;


  return User.findById(ObjectId(userId)).then(function (result) {
    return result;
  }).catch(function (err) {
    throw new Error({ payload: err, code: 500 });
  });
}

function register(data) {
  return new User((0, _extends3.default)({}, data, { userStatus: 'PENDING' })).save().then(function (payload) {
    var user = payload.toObject();
    user.password = undefined;

    return (0, _extends3.default)({}, user, { authorization: 'Bearer ' + (0, _jwt.encode)(user) });
  }).catch(function (err) {
    throw err;
  });
}

function login(email, password) {
  var _this2 = this;

  return User.findOne({ email: email }).then(function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(user) {
      var validatePassword, result;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _crypto.compare)(password.toString(), user.password.toString());

            case 2:
              validatePassword = _context2.sent;

              if (!(user && validatePassword)) {
                _context2.next = 7;
                break;
              }

              result = user.toObject();

              result.password = undefined;

              return _context2.abrupt('return', (0, _extends3.default)({}, result, { authorization: 'Bearer ' + (0, _jwt.encode)(result) }));

            case 7:
              throw Object({ status: 500, payload: {} });

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    }));

    return function (_x3) {
      return _ref2.apply(this, arguments);
    };
  }()).catch(function (err) {
    throw Object({ message: messages.LOGIN_FAILED, status: 422, payload: err });
  });
}

function update(body, userId) {
  var ObjectId = _db2.default.Types.ObjectId;


  return User.findOneAndUpdate({ _id: ObjectId(userId) }, { $set: body }, { new: true }).then(function (payload) {
    return payload;
  }).catch(function (err) {
    throw new Error({ message: messages.UPDATE_USER_FAILED, status: 422, payload: err });
  });
}