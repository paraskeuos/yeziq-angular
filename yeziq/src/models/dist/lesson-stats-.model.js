"use strict";
exports.__esModule = true;
exports.LessonStats = void 0;
var LessonStats = /** @class */ (function () {
    function LessonStats(unknownCount, unknownPct, yeziqCount, total) {
        this.unknownCount = unknownCount;
        this.unknownPct = unknownPct;
        this.yeziqCount = yeziqCount;
        this.total = total;
    }
    LessonStats.prototype.getUnknownCount = function () {
        return this.unknownCount;
    };
    LessonStats.prototype.getTotal = function () {
        return this.total;
    };
    return LessonStats;
}());
exports.LessonStats = LessonStats;
;
