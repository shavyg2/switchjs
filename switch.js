"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function PRE_USER_SWITCH_BLOCK(block) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return block.apply(void 0, args);
}
function PRE_USER_SWITCH_CASE(block) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    ;
    return block.apply(void 0, args);
}
//Sync Version
var Switch = (function () {
    function Switch(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.cases = [];
        var allowFall = options.allowFall, compareFunction = options.compareFunction;
        this.allowFall = allowFall;
        //don't trust em
        this.userCompare = compareFunction;
        this._switch = function (switch_input, switch_case_builder) {
            _this.cases.length = 0;
            _this.switchcaseinput = switch_input;
            //trust them here
            _this._default = PRE_USER_SWITCH_BLOCK(switch_case_builder, switch_input);
            //start my shit here
            _this.start();
        };
        this._case = function (switch_compare_input, switch_case_function) {
            _this.cases.push([switch_compare_input, switch_case_function]);
        };
    }
    Switch.prototype.start = function () {
        //the shit
        var _this = this;
        var cases = this.cases;
        var position = 0;
        var case_resolved = false;
        var get_case = function () {
            return position < cases.length ? cases[position] : undefined;
        };
        var is_case_executable = function () {
            var _a = get_case(), $case = _a[0], block = _a[1];
            return $case instanceof Function;
        };
        var has_user_implementation_of_compare = function () {
            return !!_this.userCompare;
        };
        var has_default = function () {
            return !!_this._default;
        };
        var advance_case = function () {
            position++;
        };
        while (get_case()) {
            var _a = get_case(), $case = _a[0], block = _a[1];
            /**
             * This sections seems to be working correctly
             */
            if (!case_resolved) {
                if (is_case_executable()) {
                    var r = PRE_USER_SWITCH_CASE($case, this.switchcaseinput);
                    case_resolved = r;
                    ;
                }
                else {
                    case_resolved = has_user_implementation_of_compare() ?
                        this.userCompare(this.switchcaseinput, $case) :
                        this.switchcaseinput === $case;
                }
            }
            if (case_resolved) {
                var r = PRE_USER_SWITCH_CASE(block);
                var fallthru_return_optional = void 0;
                fallthru_return_optional = r;
                if (fallthru_return_optional && fallthru_return_optional === "break") {
                    return;
                }
            }
            if (case_resolved && !this.allowFall) {
                return;
            }
            advance_case();
        }
        if (has_default()) {
            debugger;
            ;
            this._default();
            ;
        }
    };
    return Switch;
}());
exports.Switch = Switch;
//# sourceMappingURL=switch.js.map