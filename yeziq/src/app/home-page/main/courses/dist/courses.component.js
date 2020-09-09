"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CoursesComponent = void 0;
var core_1 = require("@angular/core");
var CoursesComponent = /** @class */ (function () {
    function CoursesComponent() {
        // Show courses menu or add course form
        this.showMenu = true;
    }
    CoursesComponent.prototype.onSwitchView = function (showMenu) {
        this.showMenu = showMenu;
    };
    CoursesComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input()
    ], CoursesComponent.prototype, "courses");
    __decorate([
        core_1.Input()
    ], CoursesComponent.prototype, "selectedCourse");
    __decorate([
        core_1.Input()
    ], CoursesComponent.prototype, "selectedLesson");
    CoursesComponent = __decorate([
        core_1.Component({
            selector: 'app-courses',
            templateUrl: './courses.component.html',
            styleUrls: ['./courses.component.css']
        })
    ], CoursesComponent);
    return CoursesComponent;
}());
exports.CoursesComponent = CoursesComponent;
