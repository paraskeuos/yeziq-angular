"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserService = void 0;
var core_1 = require("@angular/core");
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.usersUrl = 'http://localhost:3000/users/';
        this.coursesUrl = 'http://localhost:3000/courses/';
        this.user = null;
        this.courses = null;
    }
    UserService.prototype.createUser = function (userData) {
        this.user = this.http.post(this.usersUrl, userData);
        return this.user;
    };
    UserService.prototype.changeTargetLang = function (userData) {
        this.user = this.http.patch(this.usersUrl + 'changeLang', userData);
        return this.user;
    };
    UserService.prototype.login = function (userData) {
        this.user = this.http.post(this.usersUrl + 'login', userData);
        return this.user;
    };
    UserService.prototype.getUser = function () {
        return this.user;
    };
    UserService.prototype.getCourses = function () {
        return this.courses;
    };
    UserService.prototype.getCoursesByAuthor = function (data) {
        this.courses = this.http.post(this.coursesUrl + 'getCourses', data);
        return this.courses;
    };
    UserService.prototype.createCourse = function (data) {
        return this.http.post(this.coursesUrl, data);
    };
    UserService.prototype.deleteCourse = function (id) {
        return this.http["delete"](this.coursesUrl + id);
    };
    UserService.prototype.resetUser = function () {
        this.user = null;
    };
    UserService.prototype.getTextFromPdf = function (data) {
        return this.http.post(this.coursesUrl + 'pdf', data);
    };
    UserService.prototype.getTextFromEpub = function (data) {
        return this.http.post(this.coursesUrl + 'epub', data);
    };
    UserService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
