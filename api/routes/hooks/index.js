"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _cors = _interopRequireDefault(require("cors"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _middlewares = _interopRequireDefault(require("../../middlewares"));
var _medusaCoreUtils = require("medusa-core-utils");
var route = (0, _express.Router)();
var _default = function _default(app, rootDirectory) {
  var _getConfigFile = (0, _medusaCoreUtils.getConfigFile)(rootDirectory, "medusa-config"),
    configModule = _getConfigFile.configModule;
  var config = configModule && configModule.projectConfig || {};
  console.log({
    config: config
  });
  var storeCors = config.store_cors || "";
  route.use((0, _cors["default"])({
    origin: (0, _medusaCoreUtils.parseCorsOrigins)(storeCors),
    credentials: true
  }));
  app.use("/kobil/payment", route);
  route.post("/callback", _bodyParser["default"].json(), _middlewares["default"].wrap(require("./kobil-payment")["default"]));
  return app;
};
exports["default"] = _default;