"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var login_page_component_1 = require("./login-page/login-page.component");
var home_page_component_1 = require("./home-page/home-page.component");
var navbar_component_1 = require("./home-page/navbar/navbar.component");
var main_component_1 = require("./home-page/main/main.component");
var courses_component_1 = require("./home-page/main/courses/courses.component");
var courses_menu_component_1 = require("./home-page/main/courses/courses-menu/courses-menu.component");
var add_courses_component_1 = require("./home-page/main/courses/add-courses/add-courses.component");
var reading_space_component_1 = require("./home-page/main/reading-space/reading-space.component");
var login_form_component_1 = require("./login-page/login-form/login-form.component");
var register_form_component_1 = require("./login-page/register-form/register-form.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                login_page_component_1.LoginPageComponent,
                home_page_component_1.HomePageComponent,
                navbar_component_1.NavbarComponent,
                main_component_1.MainComponent,
                courses_component_1.CoursesComponent,
                courses_menu_component_1.CoursesMenuComponent,
                add_courses_component_1.AddCoursesComponent,
                reading_space_component_1.ReadingSpaceComponent,
                login_form_component_1.LoginFormComponent,
                register_form_component_1.RegisterFormComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpClientModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
