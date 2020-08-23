"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var LoginFormComponent = /** @class */ (function () {
    function LoginFormComponent(formBuilder) {
        this.formBuilder = formBuilder;
        this.emitFormSwitch = new core_1.EventEmitter();
        this.loginForm = this.formBuilder.group({
            username: ['', [forms_1.Validators.required]],
            password: ['', [forms_1.Validators.required]]
        });
    }
    LoginFormComponent.prototype.submitLoginInfo = function () {
    };
    LoginFormComponent.prototype.switchForms = function () {
        this.emitFormSwitch.emit(false);
    };
    LoginFormComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Output('formSwitch')
    ], LoginFormComponent.prototype, "emitFormSwitch");
    LoginFormComponent = __decorate([
        core_1.Component({
            selector: 'app-login-form',
            templateUrl: './login-form.component.html',
            styleUrls: ['./login-form.component.css']
        })
    ], LoginFormComponent);
    return LoginFormComponent;
}());
exports.LoginFormComponent = LoginFormComponent;
