"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomePageComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var HomePageComponent = /** @class */ (function () {
    function HomePageComponent(userService, router) {
        var _this = this;
        this.userService = userService;
        this.router = router;
        this.knownWordCount = new rxjs_1.BehaviorSubject(-1);
        this.courses = [];
        var getUser = this.userService.getUser();
        if (!getUser) {
            this.router.navigate(['/']);
        }
        var userSub = getUser.subscribe(function (user) {
            if (user) {
                _this.user = user;
                //this.refreshCourses();
                /* const knownWordCountSub = this.wordsService.getKnownWordCount({ userId: this.user._id, targetLang: this.user.targetLang })
                  .subscribe((count: number) => {
        
                    this.knownWordCount.next(count);
                    this.level.next(this.getLevel(count));
                  });
                this.activeSubs.push(knownWordCountSub); */
            }
        });
        var course = {
            _id: 'nekiid',
            name: 'Course Name',
            author: 'author',
            targetLang: 'de',
            lessons: [],
            unknownWords: 0,
            yeziqs: 0
        };
        this.courses.push(course);
    }
    HomePageComponent.prototype.ngOnInit = function () {
    };
    HomePageComponent = __decorate([
        core_1.Component({
            selector: 'app-home-page',
            templateUrl: './home-page.component.html',
            styleUrls: ['./home-page.component.css']
        })
    ], HomePageComponent);
    return HomePageComponent;
}());
exports.HomePageComponent = HomePageComponent;
