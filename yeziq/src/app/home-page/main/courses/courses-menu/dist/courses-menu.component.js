"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CoursesMenuComponent = void 0;
var core_1 = require("@angular/core");
var CoursesMenuComponent = /** @class */ (function () {
    function CoursesMenuComponent() {
        this.emitSwitchView = new core_1.EventEmitter();
    }
    CoursesMenuComponent.prototype.showAddCourse = function () {
        this.emitSwitchView.emit(false);
    };
    CoursesMenuComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input()
    ], CoursesMenuComponent.prototype, "courses");
    __decorate([
        core_1.Output('switchView')
    ], CoursesMenuComponent.prototype, "emitSwitchView");
    __decorate([
        core_1.Input()
    ], CoursesMenuComponent.prototype, "selectedCourse");
    __decorate([
        core_1.Input()
    ], CoursesMenuComponent.prototype, "selectedLesson");
    CoursesMenuComponent = __decorate([
        core_1.Component({
            selector: 'app-courses-menu',
            templateUrl: './courses-menu.component.html',
            styleUrls: ['./courses-menu.component.css']
        })
    ], CoursesMenuComponent);
    return CoursesMenuComponent;
}());
exports.CoursesMenuComponent = CoursesMenuComponent;
