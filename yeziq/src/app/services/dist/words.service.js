"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WordsService = void 0;
var core_1 = require("@angular/core");
var WordsService = /** @class */ (function () {
    function WordsService(http) {
        this.http = http;
        this.wordsUrl = 'http://localhost:3000/words/';
    }
    WordsService.prototype.getWords = function (data) {
        this.wordsArray = this.http.post(this.wordsUrl, data);
        return this.wordsArray;
    };
    WordsService.prototype.getKnownWordCount = function (data) {
        return this.http.post(this.wordsUrl + 'count', data);
    };
    WordsService.prototype.wordIsKnown = function (data) {
        return this.http.post(this.wordsUrl + 'knownOne', data);
    };
    WordsService.prototype.wordsOnPageAreKnown = function (data) {
        return this.http.post(this.wordsUrl + 'knownMany', data);
    };
    WordsService.prototype.addYeziq = function (data) {
        return this.http.post(this.wordsUrl + 'yeziq', data);
    };
    WordsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], WordsService);
    return WordsService;
}());
exports.WordsService = WordsService;
