"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("../index");
var sinon = require("sinon");
var chai_1 = require("chai");
describe("Switch Async", function () {
    it("should match the first case", function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a, _switch, _case, spy, test;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = new index_1.SwitchAsync(), _switch = _a._switch, _case = _a._case;
                        spy = sinon.spy();
                        test = "test";
                        return [4 /*yield*/, _switch(test, function () {
                                _case("test", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    return tslib_1.__generator(this, function (_a) {
                                        spy();
                                        return [2 /*return*/];
                                    });
                                }); });
                                return function () {
                                    throw new Error("mistakes were made");
                                };
                            })];
                    case 1:
                        _b.sent();
                        chai_1.expect(spy.calledOnce).to.be.true;
                        return [2 /*return*/];
                }
            });
        });
    });
    it("should use the default case", function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _switch, _case, spy, test;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = new index_1.SwitchAsync(), _switch = _a._switch, _case = _a._case;
                        spy = sinon.spy();
                        test = "test";
                        return [4 /*yield*/, _switch(test, function () {
                                _case("test1", function () {
                                    throw new Error("mistakes were made");
                                });
                                return function () {
                                    ;
                                    spy();
                                };
                            })];
                    case 1:
                        _b.sent();
                        chai_1.expect(spy.calledOnce).to.be.true;
                        return [2 /*return*/];
                }
            });
        });
    });
    it("should be able to select the right case by function", function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _switch, _case, spy, test;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = new index_1.SwitchAsync(), _switch = _a._switch, _case = _a._case;
                        spy = sinon.spy();
                        test = "test";
                        return [4 /*yield*/, _switch(test, function () {
                                _case(function () { return true; }, function () {
                                    spy();
                                });
                                return function () {
                                    ;
                                    throw new Error("mistakes were made");
                                };
                            })];
                    case 1:
                        _b.sent();
                        chai_1.expect(spy.calledOnce).to.be.true;
                        return [2 /*return*/];
                }
            });
        });
    });
    it("should be ok with no default statement", function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _switch, _case, spy, test;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = new index_1.SwitchAsync(), _switch = _a._switch, _case = _a._case;
                        spy = sinon.spy();
                        test = "test";
                        return [4 /*yield*/, _switch(test, function () {
                                _case(function () { return false; }, function () {
                                    spy();
                                });
                            })];
                    case 1:
                        _b.sent();
                        chai_1.expect(spy.callCount).to.eql(0);
                        return [2 /*return*/];
                }
            });
        });
    });
    it("should hit all cases and the default", function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var option, _a, _switch, _case, spy, test;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        option = {
                            allowFall: true
                        };
                        _a = new index_1.SwitchAsync(option), _switch = _a._switch, _case = _a._case;
                        spy = sinon.spy();
                        test = "test";
                        return [4 /*yield*/, _switch(test, function () {
                                _case(function () { return true; }, function () {
                                    spy();
                                });
                                _case(function () { return false; }, function () {
                                    spy();
                                });
                                _case(function () { return false; }, function () {
                                    spy();
                                });
                                return function () {
                                    spy();
                                };
                            })];
                    case 1:
                        _b.sent();
                        chai_1.expect(spy.callCount).to.eql(4);
                        return [2 /*return*/];
                }
            });
        });
    });
    it("should be ok with no default statement", function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var option, _a, _switch, _case, spy, test;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        option = {
                            allowFall: true
                        };
                        _a = new index_1.SwitchAsync(option), _switch = _a._switch, _case = _a._case;
                        spy = sinon.spy();
                        test = "test";
                        return [4 /*yield*/, _switch(test, function () {
                                _case(function () { return true; }, function () {
                                    spy();
                                    return 'break';
                                });
                                _case(function () { return false; }, function () {
                                    spy();
                                });
                                _case(function () { return false; }, function () {
                                    spy();
                                });
                                return function () {
                                    spy();
                                };
                            })];
                    case 1:
                        _b.sent();
                        chai_1.expect(spy.callCount).to.eql(1);
                        return [2 /*return*/];
                }
            });
        });
    });
    it("should be ok with no default statement", function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var options, _a, _switch, _case, spy, test;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        options = {
                            allowFall: true,
                            compareFunction: function (input, expect) {
                                var result = input === expect;
                                debugger;
                                return result;
                            }
                        };
                        _a = new index_1.SwitchAsync(options), _switch = _a._switch, _case = _a._case;
                        spy = sinon.spy();
                        test = "test";
                        return [4 /*yield*/, _switch(test, function () {
                                _case('test', function () {
                                    spy();
                                    return 'break';
                                });
                                _case(function () { return false; }, function () {
                                    spy();
                                });
                                _case(function () { return false; }, function () {
                                    spy();
                                });
                                return function () {
                                    spy();
                                };
                            })];
                    case 1:
                        _b.sent();
                        chai_1.expect(spy.callCount).to.eql(1);
                        return [2 /*return*/];
                }
            });
        });
    });
});
//# sourceMappingURL=switch.async.spec.js.map