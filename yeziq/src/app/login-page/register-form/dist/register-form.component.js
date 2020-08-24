"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var language_support_1 = require("../../../assets/language-support");
var RegisterFormComponent = /** @class */ (function () {
    function RegisterFormComponent(formBuilder, userService, router) {
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.router = router;
        this.emitFormSwitch = new core_1.EventEmitter();
        this.showErrors = false;
        this.serverMsg = '';
        this.languages = language_support_1.SupportedLanguages;
        this.langNames = language_support_1.LangNames;
        this.activeSubs = [];
        this.registerForm = this.formBuilder.group({
            username: ['', [forms_1.Validators.required, forms_1.Validators.minLength(4), forms_1.Validators.maxLength(25)]],
            password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6), forms_1.Validators.maxLength(25)]],
            confirmPassword: ['', [forms_1.Validators.required, this.confirmPasswordValidator()]],
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
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
        var _this = this;
        this.serverMsg = '';
        if (!this.registerForm.valid) {
            this.showErrors = true;
            return;
        }
        this.showErrors = false;
        var data = __assign(__assign({}, this.registerForm.value), { srcLang: 'en' });
        var registerSub = this.userService.createUser(data).subscribe(function (user) {
            if (user) {
                var loginSub = _this.userService.login({ username: data.username, password: data.password }).subscribe(function (obj) {
                    if (user)
                        _this.router.navigate(['/courses']);
                });
                _this.activeSubs.push(loginSub);
            }
            else {
                _this.serverMsg = 'User already exists.';
            }
        });
        this.activeSubs.push(registerSub);
        this.registerForm.reset();
        this.registerForm.get('targetLang').setValue('de');
    };
    RegisterFormComponent.prototype.switchForms = function () {
        this.emitFormSwitch.emit(true);
    };
    Object.defineProperty(RegisterFormComponent.prototype, "username", {
        get: function () {
            return this.registerForm.get('username');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegisterFormComponent.prototype, "password", {
        get: function () {
            return this.registerForm.get('password');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegisterFormComponent.prototype, "confirmPassword", {
        get: function () {
            return this.registerForm.get('confirmPassword');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegisterFormComponent.prototype, "email", {
        get: function () {
            return this.registerForm.get('email');
        },
        enumerable: false,
        configurable: true
    });
    RegisterFormComponent.prototype.ngOnInit = function () {
    };
    RegisterFormComponent.prototype.ngOnDestroy = function () {
        this.activeSubs.forEach(function (sub) { return sub.unsubscribe(); });
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
