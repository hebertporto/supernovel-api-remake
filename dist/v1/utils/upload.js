'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serviceCloudinary = exports.upload = undefined;

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _cloudinary = require('cloudinary');

var _cloudinary2 = _interopRequireDefault(_cloudinary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _process$env = process.env,
    CLOUDINARY_NAME = _process$env.CLOUDINARY_NAME,
    CLOUDINARY_APY_KEY = _process$env.CLOUDINARY_APY_KEY,
    CLOUDINARY_API_SECRET = _process$env.CLOUDINARY_API_SECRET;


var memoryStorage = _multer2.default.memoryStorage();

var upload = exports.upload = (0, _multer2.default)({
  storage: memoryStorage,
  limits: { fileSize: 500000, files: 1 }
});

_cloudinary2.default.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_APY_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

var serviceCloudinary = exports.serviceCloudinary = _cloudinary2.default;