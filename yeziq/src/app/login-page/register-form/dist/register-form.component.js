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
var forms_1 = require("@angular/forms");
var RegisterFormComponent = /** @class */ (function () {
    function RegisterFormComponent(formBuilder) {
        this.formBuilder = formBuilder;
        this.emitFormSwitch = new core_1.EventEmitter();
        this.registerForm = this.formBuilder.group({
            username: ['', [forms_1.Validators.required, forms_1.Validators.minLength(4), forms_1.Validators.maxLength(25)]],
            password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6), forms_1.Validators.maxLength(25)]],
            confirmPassword: ['', [forms_1.Validators.required, this.confirmPasswordValidator()]],
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            //targetLang: [this.srcLang === 'en' ? 'de' : 'en']
            targetLang: 'de'
        });
    }
    RegisterFormComponent.prototype.confirmPasswordValidator = function () {
        var _this = this;
        return function (control) {
            if (!_this.registerForm)
                return null;
            var passwordConfirmed = control.value === '' ? false : control.value === _this.registerForm.get('password').value;
            return passwordConfirmed ? null : { unconfirmedPassword: true };
        };
    };
    RegisterFormComponent.prototype.submitRegisterInfo = function () {
    };
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
