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
    function LoginFormComponent(formBuilder, userService, router) {
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.router = router;
        this.showErrors = false;
        this.serverMsg = '';
        this.activeSubs = [];
        this.loginForm = this.formBuilder.group({
            username: ['milan', [forms_1.Validators.required]],
            password: ['milan123', [forms_1.Validators.required]]
        });
    }
    LoginFormComponent.prototype.submitLoginInfo = function () {
        var _this = this;
        this.serverMsg = '';
        if (!this.loginForm.valid) {
            this.showErrors = true;
            return;
        }
        this.showErrors = false;
        var sub = this.userService.login(this.loginForm.value).subscribe(function (user) {
            if (user)
                _this.router.navigate(['/courses']);
            else {
                _this.serverMsg = 'Incorrect username or password.';
            }
        });
        this.activeSubs.push(sub);
    };
    Object.defineProperty(LoginFormComponent.prototype, "username", {
        get: function () {
            return this.loginForm.get('username');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginFormComponent.prototype, "password", {
        get: function () {
            return this.loginForm.get('password');
        },
        enumerable: false,
        configurable: true
    });
    LoginFormComponent.prototype.ngOnInit = function () {
    };
    LoginFormComponent.prototype.ngOnDestroy = function () {
        this.activeSubs.forEach(function (sub) { return sub.unsubscribe(); });
    };
    __decorate([
        core_1.Input()
    ], LoginFormComponent.prototype, "showLogin");
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
