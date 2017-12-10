'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hydrateUser = exports.decodeJWT = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var hydrateUser = exports.hydrateUser = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var _id, user;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (req.user) {
              _context.next = 3;
              break;
            }

            throw Object('Token is either missing or invalid');

          case 3:
            _id = req.user._id;

            // Search for an user

            _context.next = 6;
            return Admin.getUserById(_id);

          case 6:
            user = _context.sent;

            if (!user) {
              _context.next = 9;
              break;
            }

            return _context.abrupt('return', next());

          case 9:
            throw Object('Invalid token');

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', next(_context.t0));

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 12]]);
  }));

  return function hydrateUser(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.encode = encode;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _expressUnless = require('express-unless');

var _expressUnless2 = _interopRequireDefault(_expressUnless);

var _user = require('./../models/user');

var Admin = _interopRequireWildcard(_user);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secret = process.env.SECRET || 'secret';
var decodeJWT = exports.decodeJWT = (0, _expressJwt2.default)({ secret: secret, credentialsRequired: false });

decodeJWT.unless = _expressUnless2.default;

function encode(data) {
  return _jsonwebtoken2.default.sign(data, secret);
}

hydrateUser.unless = _expressUnless2.default;