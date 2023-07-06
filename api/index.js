"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _hooks = _interopRequireDefault(require("./routes/hooks"));
var _default = function _default(rootDirectory) {
  var app = (0, _express.Router)();
  (0, _hooks["default"])(app, rootDirectory);
  return app;
};
exports["default"] = _default;