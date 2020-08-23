"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterFormComponent = void 0;
var core_1 = require("@angular/core");
var RegisterFormComponent = /** @class */ (function () {
    function RegisterFormComponent() {
        this.emitFormSwitch = new core_1.EventEmitter();
    }
    RegisterFormComponent.prototype.switchForms = function () {
        this.emitFormSwitch.emit(true);
    };
    RegisterFormComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Output('formSwitch')
    ], RegisterFormComponent.prototype, "emitFormSwitch");
    RegisterFormComponent = __decorate([
        core_1.Component({
            selector: 'app-register-form',
            templateUrl: './register-form.component.html',
            styleUrls: ['./register-form.component.css']
        })
    ], RegisterFormComponent);
    return RegisterFormComponent;
}());
exports.RegisterFormComponent = RegisterFormComponent;
