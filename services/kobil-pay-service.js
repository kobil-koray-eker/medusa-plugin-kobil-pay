"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _medusa = require("@medusajs/medusa");
var _axios = _interopRequireDefault(require("axios"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var KobilPayService = /*#__PURE__*/function (_AbstractPaymentProce) {
  (0, _inherits2["default"])(KobilPayService, _AbstractPaymentProce);
  var _super = _createSuper(KobilPayService);
  function KobilPayService(_, options) {
    var _this;
    (0, _classCallCheck2["default"])(this, KobilPayService);
    _this = _super.call(this, _, options);
    _this.options_ = options;
    return _this;
  }
  (0, _createClass2["default"])(KobilPayService, [{
    key: "getPaymentStatus",
    value: function () {
      var _getPaymentStatus = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(paymentSessionData) {
        var checkoutStatus;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              console.log("----------- GET PAYMENT STATUS -----------");
              checkoutStatus = paymentSessionData.checkoutStatus;
              if (!(checkoutStatus === "new")) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return", _medusa.PaymentSessionStatus.AUTHORIZED);
            case 6:
              return _context.abrupt("return", _medusa.PaymentSessionStatus.ERROR);
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function getPaymentStatus(_x) {
        return _getPaymentStatus.apply(this, arguments);
      }
      return getPaymentStatus;
    }()
  }, {
    key: "initiatePayment",
    value: function () {
      var _initiatePayment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(context) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              console.log("----------- INITIATE PAYMENT -----------");
              console.log({
                context: context
              });
              return _context2.abrupt("return", {
                update_requests: {
                  customer_metadata: {}
                },
                session_data: _objectSpread(_objectSpread({}, context), {}, {
                  display_id: context.resource_id
                })
              });
            case 3:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function initiatePayment(_x2) {
        return _initiatePayment.apply(this, arguments);
      }
      return initiatePayment;
    }()
  }, {
    key: "authorizePayment",
    value: function () {
      var _authorizePayment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(paymentSessionData, context) {
        var checkout, status;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              console.log("--------- AUTHORIZE PAYMENT ---------");
              console.log({
                context: context
              });
              _context3.next = 4;
              return this.getToken(paymentSessionData.customer.email);
            case 4:
              _context3.next = 6;
              return this.checkOut({
                idempotency_key: context.idempotency_key.idempotency_key,
                amount: paymentSessionData.amount,
                userId: paymentSessionData.customer.id
              });
            case 6:
              checkout = _context3.sent;
              console.log({
                checkout: checkout
              });
              paymentSessionData.transactionId = checkout.transactionId;
              paymentSessionData.checkoutStatus = checkout.status;
              console.log({
                paymentSessionData: paymentSessionData
              });
              _context3.next = 13;
              return this.getPaymentStatus(paymentSessionData);
            case 13:
              status = _context3.sent;
              return _context3.abrupt("return", {
                status: status,
                data: paymentSessionData
              });
            case 15:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function authorizePayment(_x3, _x4) {
        return _authorizePayment.apply(this, arguments);
      }
      return authorizePayment;
    }()
  }, {
    key: "capturePayment",
    value: function () {
      var _capturePayment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(paymentSessionData) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              console.log("-------- CAPTURE PAYMENT ------");
              console.log({
                paymentSessionData: paymentSessionData
              });
              return _context4.abrupt("return", {
                status: "captured"
              });
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function capturePayment(_x5) {
        return _capturePayment.apply(this, arguments);
      }
      return capturePayment;
    }() // async capturePayment(payment: Payment): Promise<Data> {
    //   return {
    //     status: "captured",
    //   }
    // }
  }, {
    key: "cancelPayment",
    value: function () {
      var _cancelPayment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(paymentSessionData) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              console.log("----------- CANCEL PAYMENT -----------");
              throw new Error("Method not implemented.");
            case 2:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      function cancelPayment(_x6) {
        return _cancelPayment.apply(this, arguments);
      }
      return cancelPayment;
    }()
  }, {
    key: "deletePayment",
    value: function () {
      var _deletePayment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(paymentSessionData) {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              console.log("----------- DELETE PAYMENT -----------");
              throw new Error("Method not implemented.");
            case 2:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      function deletePayment(_x7) {
        return _deletePayment.apply(this, arguments);
      }
      return deletePayment;
    }()
  }, {
    key: "refundPayment",
    value: function () {
      var _refundPayment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(paymentSessionData, refundAmount) {
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              console.log("----------- REFUND PAYMENT -----------");
              throw new Error("Method not implemented.");
            case 2:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }));
      function refundPayment(_x8, _x9) {
        return _refundPayment.apply(this, arguments);
      }
      return refundPayment;
    }()
  }, {
    key: "retrievePayment",
    value: function () {
      var _retrievePayment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(paymentSessionData) {
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              console.log("----------- RETRIEVE PAYMENT -----------");
              console.log({
                paymentSessionData: paymentSessionData
              });
              return _context8.abrupt("return", _objectSpread({}, paymentSessionData));
            case 4:
            case "end":
              return _context8.stop();
          }
        }, _callee8);
      }));
      function retrievePayment(_x10) {
        return _retrievePayment.apply(this, arguments);
      }
      return retrievePayment;
    }()
  }, {
    key: "updatePayment",
    value: function () {
      var _updatePayment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(context) {
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              console.log("----------- UPDATE PAYMENT -----------");
              console.log({
                context: context
              });
              return _context9.abrupt("return", {
                update_requests: {
                  customer_metadata: {}
                },
                session_data: _objectSpread({}, context)
              });
            case 3:
            case "end":
              return _context9.stop();
          }
        }, _callee9);
      }));
      function updatePayment(_x11) {
        return _updatePayment.apply(this, arguments);
      }
      return updatePayment;
    }()
  }, {
    key: "kobilAxios",
    value: function kobilAxios() {
      var axios_ = _axios["default"].create({
        baseURL: this.options_.initiate_url,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(this.access_token)
        }
      });
      return axios_;
    }
  }, {
    key: "getToken",
    value: function () {
      var _getToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(email) {
        var tokenBody, response;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              tokenBody = new URLSearchParams();
              tokenBody.append("username", email);
              tokenBody.append("password", "1234Qwer");
              tokenBody.append("grant_type", "password");
              tokenBody.append("client_id", this.options_.client_id);
              tokenBody.append("client_secret", this.options_.client_secret);
              _context10.prev = 6;
              _context10.next = 9;
              return _axios["default"].post(this.options_.token_url, tokenBody, {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                }
              });
            case 9:
              response = _context10.sent;
              this.access_token = response.data.access_token;
              return _context10.abrupt("return");
            case 14:
              _context10.prev = 14;
              _context10.t0 = _context10["catch"](6);
              console.log("getToken-error", _context10.t0);
            case 17:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this, [[6, 14]]);
      }));
      function getToken(_x12) {
        return _getToken.apply(this, arguments);
      }
      return getToken;
    }()
  }, {
    key: "checkOut",
    value: function () {
      var _checkOut = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(_ref) {
        var idempotency_key, amount, userId, checkoutData, kobil, response;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              idempotency_key = _ref.idempotency_key, amount = _ref.amount, userId = _ref.userId;
              checkoutData = {
                version: 1,
                idempotencyId: idempotency_key,
                userId: userId,
                merchantId: this.options_.client_id,
                merchantServiceUUID: this.options_.client_id,
                merchantName: "ALDI",
                merchantCallback: this.options_.callback_url,
                transactionTimeout: this.options_.transaction_timeout,
                amount: amount,
                tenantId: "do51",
                // currency: this.cart.region.currency_code,
                currency: "USD",
                paymentContent: [[{
                  key: "1 nights, Superior King Room, Deluxe King Room",
                  value: "$2,966.98"
                }]]
              };
              kobil = this.kobilAxios();
              _context11.prev = 3;
              _context11.next = 6;
              return kobil.post("/", checkoutData);
            case 6:
              response = _context11.sent;
              return _context11.abrupt("return", response.data);
            case 10:
              _context11.prev = 10;
              _context11.t0 = _context11["catch"](3);
              console.log("checkOut-error", _context11.t0);
            case 13:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this, [[3, 10]]);
      }));
      function checkOut(_x13) {
        return _checkOut.apply(this, arguments);
      }
      return checkOut;
    }()
  }]);
  return KobilPayService;
}(_medusa.AbstractPaymentProcessor);
(0, _defineProperty2["default"])(KobilPayService, "identifier", "kobil");
var _default = KobilPayService;
exports["default"] = _default;