"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var PAYMENT_PROVIDER_KEY = "pp_kobil";
var _default = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var manager;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!(req.body.status === "finished")) {
            _context2.next = 5;
            break;
          }
          manager = req.scope.resolve("manager");
          _context2.next = 4;
          return manager.transaction( /*#__PURE__*/function () {
            var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(transactionManager) {
              var orderService, paymentService, query, payment, orderId, cartId, order;
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    orderService = req.scope.resolve("orderService");
                    paymentService = req.scope.resolve("paymentService");
                    query = "\n              SELECT *\n              FROM payment\n                WHERE data ->> 'transactionId' = $1;\n              ";
                    _context.next = 5;
                    return paymentService.withTransaction(transactionManager).paymentRepository_.query(query, [req.body.transactionId]);
                  case 5:
                    payment = _context.sent;
                    console.log(payment);
                    orderId = payment[0].order_id;
                    cartId = payment[0].cart_id;
                    _context.next = 11;
                    return orderService.withTransaction(transactionManager).retrieveByCartId(cartId)["catch"](function () {
                      return undefined;
                    });
                  case 11:
                    order = _context.sent;
                    if (!((order === null || order === void 0 ? void 0 : order.payment_status) !== "captured")) {
                      _context.next = 15;
                      break;
                    }
                    _context.next = 15;
                    return orderService.withTransaction(transactionManager).capturePayment(orderId);
                  case 15:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function (_x3) {
              return _ref2.apply(this, arguments);
            };
          }());
        case 4:
          res.status(200).send("thanks");
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports["default"] = _default;