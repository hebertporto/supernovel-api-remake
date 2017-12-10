'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('./v1/config/db');

var _handlers = require('./v1/utils/handlers');

var handlers = _interopRequireWildcard(_handlers);

var _constants = require('./v1/config/constants');

var _jwt = require('./v1/config/jwt');

var _app = require('./v1/services/app');

var _app2 = _interopRequireDefault(_app);

var _novel = require('./v1/services/admin/novel');

var _novel2 = _interopRequireDefault(_novel);

var _chapter = require('./v1/services/admin/chapter');

var _chapter2 = _interopRequireDefault(_chapter);

var _feature = require('./v1/services/admin/feature');

var _feature2 = _interopRequireDefault(_feature);

var _user = require('./v1/services/admin/user');

var _user2 = _interopRequireDefault(_user);

var _authentication = require('./v1/services/admin/authentication');

var _authentication2 = _interopRequireDefault(_authentication);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _name$version$descrip = {
  name: 'supernovel-api-remake',
  version: '2.0.0',
  description: 'api',
  main: 'src/app.js',
  author: 'Hebert Porto <hebertporto@gmail.com>',
  license: 'ISC',
  scripts: {
    clean: 'rimraf client/dist',
    build: 'yarn run clean && ./node_modules/.bin/babel src --out-dir dist',
    start: 'nodemon dist/app.js',
    'dev-win': 'nodemon src/app.js --exec babel-node',
    lint: 'eslint ./src/'
  },
  'pre-commit': ['lint'],
  dependencies: {
    bcryptjs: '^2.4.3',
    bluebird: '^3.5.1',
    'body-parser': '^1.18.2',
    cloudinary: '^1.9.1',
    cors: '^2.8.4',
    datauri: '^1.0.5',
    dotenv: '^4.0.0',
    express: '^4.16.2',
    'express-jwt': '^5.3.0',
    'express-unless': '^0.3.1',
    'express-validation': '^1.0.2',
    joi: '10.6.0',
    jsonwebtoken: '^8.1.0',
    moment: '^2.19.1',
    mongoose: '^4.12.4',
    morgan: '^1.9.0',
    multer: '^1.3.0',
    nodemon: '^1.12.5',
    passport: '^0.4.0',
    'passport-jwt': '^3.0.1',
    path: '^0.12.7',
    'stringify-object': '^3.2.1'
  },
  devDependencies: {
    'babel-cli': '^6.26.0',
    'babel-core': '^6.26.0',
    'babel-eslint': '^8.0.1',
    'babel-loader': '^7.1.2',
    'babel-plugin-inline-json-import': '^0.2.1',
    'babel-plugin-transform-async-to-generator': '^6.24.1',
    'babel-plugin-transform-runtime': '^6.23.0',
    'babel-preset-es2015': '^6.24.1',
    'babel-preset-stage-0': '^6.24.1',
    'babel-register': '^6.26.0',
    'babel-runtime': '^6.26.0',
    chai: '^4.1.2',
    'cross-env': '^5.1.1',
    eslint: '^4.10.0',
    'eslint-config-airbnb': '^16.1.0',
    'eslint-plugin-import': '^2.8.0',
    'eslint-plugin-jsx-a11y': '^6.0.2',
    'eslint-plugin-react': '^7.4.0',
    mocha: '^4.0.1',
    'pre-commit': '^1.2.2',
    rimraf: '^2.6.2',
    supertest: '^3.0.0'
  }
};
var version = _name$version$descrip.version;
// Admin //

var port = process.env.PORT || 3000;
var app = (0, _express2.default)();

var unless = {
  path: [{ url: /^\/v1\/api\/admin\/auth\/register/ }, { url: /^\/v1\/api\/admin\/auth\/login/ }, { url: /^\/v1\/api\/app\// }]
};

var dateOfBirth = (0, _moment2.default)(new Date()).format('MMMM Do YYYY, h:mm:ss a');

app.use(_bodyParser2.default.urlencoded({
  extended: true,
  limit: _constants.DEFAULT_FILE_UPLOAD_SIZE
}));

app.use(_bodyParser2.default.json({ limit: _constants.DEFAULT_FILE_UPLOAD_SIZE }));
app.use((0, _cors2.default)());
app.use((0, _morgan2.default)('dev'));

// Routes //
app.get('/', function (req, res) {
  return res.status(200).json({});
});
app.get('/health', function (req, res) {
  return res.status(200).json({ version: version, dateOfBirth: dateOfBirth });
});

app.use(_jwt.decodeJWT.unless(unless));
app.use(_jwt.hydrateUser.unless(unless));

// APP
app.use('/v1/api/app', _app2.default);
// ADMIN
app.use('/v1/api/admin/user', _user2.default);
app.use('/v1/api/admin/auth', _authentication2.default);
app.use('/v1/api/admin/novel', _novel2.default);
app.use('/v1/api/admin/chapter', _chapter2.default);
app.use('/v1/api/admin/featured', _feature2.default);

// Error Handlers
app.use(handlers.validationError);
app.use(handlers.internalError);

app.listen(port, function () {
  console.log('API Server on port: ' + port);
});

exports.default = app;