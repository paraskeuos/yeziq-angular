"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserServiceService = void 0;
var core_1 = require("@angular/core");
var UserServiceService = /** @class */ (function () {
    function UserServiceService(http) {
        this.http = http;
        this.usersUrl = 'http://localhost:3000/users/';
        this.coursesUrl = 'http://localhost:3000/courses/';
        this.user = null;
        this.courses = null;
    }
    UserServiceService.prototype.createUser = function (userData) {
        this.user = this.http.post(this.usersUrl, userData);
        return this.user;
    };
    UserServiceService.prototype.changeTargetLang = function (userData) {
        this.user = this.http.patch(this.usersUrl + 'changeLang', userData);
        return this.user;
    };
    UserServiceService.prototype.login = function (userData) {
        this.user = this.http.post(this.usersUrl + 'login', userData);
        return this.user;
    };
    UserServiceService.prototype.getUser = function () {
        return this.user;
    };
    UserServiceService.prototype.getCourses = function () {
        return this.courses;
    };
    UserServiceService.prototype.getCoursesByAuthor = function (data) {
        this.courses = this.http.post(this.coursesUrl + 'getCourses', data);
        return this.courses;
    };
    UserServiceService.prototype.createCourse = function (data) {
        return this.http.post(this.coursesUrl, data);
    };
    UserServiceService.prototype.deleteCourse = function (id) {
        return this.http["delete"](this.coursesUrl + id);
    };
    UserServiceService.prototype.resetUser = function () {
        this.user = null;
    };
    UserServiceService.prototype.getTextFromPdf = function (data) {
        return this.http.post(this.coursesUrl + 'pdf', data);
    };
    UserServiceService.prototype.getTextFromEpub = function (data) {
        return this.http.post(this.coursesUrl + 'epub', data);
    };
    UserServiceService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserServiceService);
    return UserServiceService;
}());
exports.UserServiceService = UserServiceService;
