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
    function HomePageComponent(userService, wordsService, router) {
        var _this = this;
        this.userService = userService;
        this.wordsService = wordsService;
        this.router = router;
        this.knownWordCount = new rxjs_1.BehaviorSubject(-1);
        this.courses = new rxjs_1.BehaviorSubject(null);
        this.loadingProgress = '';
        //public loading = false;
        this.activeSubs = [];
        var getUser = this.userService.getUser();
        if (!getUser) {
            this.router.navigate(['/']);
        }
        var userSub = getUser.subscribe(function (user) {
            if (user) {
                _this.user = user;
                _this.refreshCourses();
                var knownWordCountSub = _this.wordsService.getKnownWordCount({ userId: _this.user._id, targetLang: _this.user.targetLang })
                    .subscribe(function (count) {
                    _this.knownWordCount.next(count);
                    //this.level.next(this.getLevel(count));
                });
                _this.activeSubs.push(knownWordCountSub);
            }
        });
        /* const course: Course = {
          _id: 'nekiid',
          name: 'Course Name',
          author: 'author',
          targetLang: 'de',
          lessons: [],
          unknownWords: 0,
          yeziqs: 0
        };
    
        this.courses.push(course); */
    }
    HomePageComponent.prototype.refreshCourses = function () {
        var _this = this;
        this.loadingProgress = 'Loading courses...';
        this.courses.next(null);
        //this.loading = false;
        var sub = this.userService.getCoursesByAuthor({ author: this.user.username, targetLang: this.user.targetLang }).subscribe(function (courses) {
            _this.courses.next(courses);
            /* this.showRemoveOpts = new Array(courses.length);
      
            // Informacije o poznatim ("belim") i yeziq ("zutim") recima iz baze
            this.coursesStats = new Map<string, Array<LessonStats>>();
            const knownDB = new Set<string>();
            const yeziqDB = new Set<string>();
      
            const regex = new RegExp('^' + this.regexMap.get(this.user.targetLang) + '$');
      
            const wordsSub = this.wordsService.getWords({ id: this.user._id, targetLang: this.user.targetLang }).subscribe((words: Word[]) => {
              // Rec se ubacuje u odgovarajuci skup
              words.forEach((w: Word) => {
                if (w.status === 1) {
                  yeziqDB.add(w.word);
                } else {
                  knownDB.add(w.word);
                }
              });
      
              // Za svaku lekciju svakog kursa se racuna statistika o recima
              this.courses.value.forEach((course: Course) => {
      
                this.coursesStats.set(course._id, new Array<LessonStats>(course.lessons.length));
                for (let i = 0; i < course.lessons.length; i++) {
                  const unknown = new Set<string>();
                  const yeziq = new Set<string>();
                  const total = new Set<string>();
      
                  course.lessons[i].forEach(page => {
                    page.filter(token => regex.test(token)).forEach(w => {
                      const word = w.toLowerCase();
      
                      if (yeziqDB.has(word)) {
                        yeziq.add(word);
                      }
                      else if (!knownDB.has(word)) {
                        unknown.add(word);
                      }
      
                      total.add(word);
                    });
                  });
      
                  let unknownPct = Math.floor(unknown.size / total.size * 100);
                  // Ako broj nepoznatih nije 0 ali se procenat zaokruzi na 0%, postavlja se na 1%
                  unknownPct = unknown.size !== 0 && unknownPct === 0 ? 1 : unknownPct;
      
                  this.coursesStats.get(course._id)[i] = new LessonStats(unknown.size, unknownPct, yeziq.size, total.size);
                };
              });
      
              // Ako se doslo iz komponente reading-space sa zahtevom za povratak na listu lekcija odredjenog kursa
              // ili ako je upravo kreiran kursa, izlistavaju se njegove lekcije
              if (this.courseId) {
                for (let i = 0; this.courses.getValue().length; i++) {
                  if (this.courses.getValue()[i]._id === this.courseId) {
                    this.showLessons(i);
      
                    break;
                  }
                }
              }
      
      
              this.loading = false;
            });
      
            this.activeSubs.push(wordsSub); */
        });
        this.activeSubs.push(sub);
    };
    HomePageComponent.prototype.ngOnInit = function () {
    };
    HomePageComponent.prototype.ngOnDestroy = function () {
        this.activeSubs.forEach(function (sub) { return sub.unsubscribe(); });
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
