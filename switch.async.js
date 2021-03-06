"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
function PRE_USER_SWITCH_BLOCK(block) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, block.apply(void 0, args)];
        });
    });
}
function PRE_USER_SWITCH_CASE(block) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, block.apply(void 0, args)];
        });
    });
}
//Sync Version
var SwitchAsync = (function () {
    function SwitchAsync(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.cases = [];
        var allowFall = options.allowFall, compareFunction = options.compareFunction;
        this.allowFall = allowFall;
        //don't trust em
        this.userCompare = compareFunction;
        this._switch = function (switch_input, switch_case_builder) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.switchcaseinput = switch_input;
                        //trust them here
                        _a = this;
                        return [4 /*yield*/, PRE_USER_SWITCH_BLOCK(switch_case_builder, switch_input)];
                    case 1:
                        //trust them here
                        _a._default = _b.sent();
                        return [4 /*yield*/, this.start()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this._case = function (switch_compare_input, switch_case_function) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.cases.push([switch_compare_input, switch_case_function]);
                return [2 /*return*/];
            });
        }); };
    }
    SwitchAsync.prototype.start = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var cases, position, case_resolved, get_case, is_case_executable, has_user_implementation_of_compare, has_default, advance_case, _a, $case, block, fallthru_return_optional;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cases = this.cases;
                        position = 0;
                        case_resolved = false;
                        get_case = function () {
                            return position < cases.length ? cases[position] : undefined;
                        };
                        is_case_executable = function () {
                            var _a = get_case(), $case = _a[0], block = _a[1];
                            return $case instanceof Function;
                        };
                        has_user_implementation_of_compare = function () {
                            return !!_this.userCompare;
                        };
                        has_default = function () {
                            return !!_this._default;
                        };
                        advance_case = function () {
                            position++;
                        };
                        _b.label = 1;
                    case 1:
                        if (!get_case()) return [3 /*break*/, 7];
                        _a = get_case(), $case = _a[0], block = _a[1];
                        if (!!case_resolved) return [3 /*break*/, 4];
                        if (!is_case_executable()) return [3 /*break*/, 3];
                        return [4 /*yield*/, PRE_USER_SWITCH_CASE($case, this.switchcaseinput)];
                    case 2:
                        case_resolved = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        case_resolved = has_user_implementation_of_compare() ?
                            this.userCompare(this.switchcaseinput, $case) :
                            this.switchcaseinput === $case;
                        _b.label = 4;
                    case 4:
                        if (!case_resolved) return [3 /*break*/, 6];
                        fallthru_return_optional = void 0;
                        return [4 /*yield*/, PRE_USER_SWITCH_CASE(block)];
                    case 5:
                        fallthru_return_optional = _b.sent();
                        if (fallthru_return_optional && fallthru_return_optional === "break") {
                            return [2 /*return*/];
                        }
                        _b.label = 6;
                    case 6:
                        if (case_resolved && !this.allowFall) {
                            return [2 /*return*/];
                        }
                        advance_case();
                        return [3 /*break*/, 1];
                    case 7:
                        if (!has_default()) return [3 /*break*/, 9];
                        ;
                        return [4 /*yield*/, this._default()];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return SwitchAsync;
}());
exports.SwitchAsync = SwitchAsync;
//# sourceMappingURL=switch.async.js.map