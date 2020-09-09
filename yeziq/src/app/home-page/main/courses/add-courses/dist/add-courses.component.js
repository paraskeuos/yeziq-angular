"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddCoursesComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var language_support_1 = require("src/assets/language-support");
var AddCoursesComponent = /** @class */ (function () {
    function AddCoursesComponent(formBuilder, userService, router) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.router = router;
        // TODO: refactor and comment
        this.addCourseError = null;
        this.emitSwitchView = new core_1.EventEmitter();
        this.regexMap = language_support_1.RegexMap;
        this.activeSubs = [];
        // Ako je izvrsen login, getUser nece biti null.
        // Sprecava direktno pristupanje /courses delu pre logina.
        var getUser = this.userService.getUser();
        if (!getUser)
            this.router.navigate(['/']);
        var userSub = getUser.subscribe(function (user) {
            if (user) {
                _this.user = user;
                /* this.refreshCourses();
         
                const knownWordCountSub = this.wordsService.getKnownWordCount({ userId: this.user._id, targetLang: this.user.targetLang })
                  .subscribe((count: number) => {
         
                    this.knownWordCount.next(count);
                    this.level.next(this.getLevel(count));
                  });
                this.activeSubs.push(knownWordCountSub); */
            }
        });
        this.activeSubs.push(userSub);
        this.courseForm = this.formBuilder.group({
            name: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(30)]],
            file: [''],
            text: ['']
        }, { validator: this.contentValidator() });
    }
    // A text or a file must be supplied
    AddCoursesComponent.prototype.contentValidator = function () {
        var _this = this;
        return function () {
            if (!_this.courseForm)
                return null;
            var contentEntered = (_this.courseForm.get('file').value !== '') || (_this.courseForm.get('text').value !== '');
            return contentEntered ? null : { noContent: true };
        };
    };
    AddCoursesComponent.prototype.showCourses = function () {
        this.emitSwitchView.emit(true);
    };
    // Course creation and saving based on form data
    AddCoursesComponent.prototype.submitCourse = function () {
        var _this = this;
        this.addCourseError = null;
        if (!this.courseForm.valid) {
            if (this.courseForm.get('name').errors.maxlength)
                this.addCourseError = 'The course name must be maximum 30 characters long.';
            else
                this.addCourseError = 'Some other error idk now...';
            return;
        }
        var data = this.courseForm.value;
        // Loading animacija dok se kreira kurs.
        //this.loadingProgress = this.langMap.get(this.user.srcLang).get('creatingCourseDesc');;
        //this.loading = true;
        // Automatski ce se izlistati lekcije kreiranog kursa
        //this.showLessonList = true;
        // Ako je izabran fajl, kreira se kurs iz njega, cak i ako je unesen i tekst.
        if (data.file) {
            var file = this.fileInput.nativeElement.files[0];
            // .txt fajlovi
            if (data.file.endsWith('.txt')) {
                var reader_1 = new FileReader();
                reader_1.onerror = function () {
                    //this.loading = false;
                    _this.addCourseError = 'There was a problem with creating your course.';
                    _this.courseForm.reset();
                };
                // Ako se uspesno procita fajl, kreira se kurs, pamti u bazi i osvezava se niz kurseva
                reader_1.onload = function () {
                    var course = _this.makeCourse(reader_1.result, data.name, _this.user.username, _this.user.targetLang);
                    //this.loadingProgress = this.langMap.get(this.user.srcLang).get('savingCourseDesc');
                    var sub = _this.userService.createCourse(course).subscribe(function (obj) {
                        if (obj.message === 'saved') {
                            //this.courses.next(null);
                            //this.toggleViews();
                            // Da bi se automatski izlistale lekcije kreiranog kursa
                            //this.courseId = obj.courseId;
                            //this.refreshCourses();
                        }
                        else {
                            //this.loading = false;
                            //this.showLessonList = false;
                            _this.addCourseError = 'There was a problem with saving your course.';
                        }
                    });
                    _this.activeSubs.push(sub);
                    _this.courseForm.reset();
                };
                reader_1.readAsText(file, 'UTF-8');
            }
            else if (data.file.endsWith('.pdf')) {
                // Salje se ceo fajl serveru koji vraca tekstualni oblik fajla.
                // Potom se sve izvrsava kao u prethodnom slucaju
                var formData = new FormData();
                formData.append('file', file, file.name);
                var pdfSub = this.userService.getTextFromPdf(formData).subscribe(function (text) {
                    if (text) {
                        var course = _this.makeCourse(text, data.name, _this.user.username, _this.user.targetLang);
                        //this.loadingProgress = this.langMap.get(this.user.srcLang).get('savingCourseDesc');
                        var sub = _this.userService.createCourse(course).subscribe(function (obj) {
                            if (obj.message === 'saved') {
                                //this.courses.next(null);
                                //this.toggleViews();
                                // Da bi se automatski izlistale lekcije kreiranog kursa
                                //this.courseId = obj.courseId;
                                //this.refreshCourses();
                            }
                            else {
                                //this.loading = false;
                                //this.showLessonList = false;
                                _this.addCourseError = 'There was a problem with saving your course.';
                            }
                        });
                        _this.activeSubs.push(sub);
                        _this.courseForm.reset();
                    }
                    else {
                        //this.loading = false;
                        //this.showLessonList = false;
                        _this.addCourseError = 'There was a problem with creating your course.';
                    }
                });
                this.activeSubs.push(pdfSub);
            }
            else if (data.file.endsWith('.epub')) {
                // Poput .pdf fajla, salje se fajl serveru ali se dobija tekst u xml formatu.
                var formData = new FormData();
                formData.append('file', file, file.name);
                var epubSub = this.userService.getTextFromEpub(formData).subscribe(function (text) {
                    if (text) {
                        var course = _this.makeCourse(_this.xmlToText(text), data.name, _this.user.username, _this.user.targetLang);
                        //this.loadingProgress = this.langMap.get(this.user.srcLang).get('savingCourseDesc');
                        var sub = _this.userService.createCourse(course).subscribe(function (obj) {
                            if (obj.message === 'saved') {
                                //this.courses.next(null);
                                //this.toggleViews();
                                // Da bi se automatski izlistale lekcije kreiranog kursa
                                //this.courseId = obj.courseId;
                                //this.refreshCourses();
                            }
                            else {
                                //this.loading = false;
                                //this.showLessonList = false;
                                _this.addCourseError = 'There was a problem with saving your course.';
                            }
                        });
                        _this.activeSubs.push(sub);
                        _this.courseForm.reset();
                    }
                    else {
                        //this.loading = false;
                        _this.addCourseError = 'There was a problem with creating your course.';
                    }
                });
                this.activeSubs.push(epubSub);
            }
        }
        else { // Kreiranje kursa na osnovu teksta iz formulara
            var course = this.makeCourse(data.text, data.name, this.user.username, this.user.targetLang);
            //this.loadingProgress = this.langMap.get(this.user.srcLang).get('savingCourseDesc');
            var sub = this.userService.createCourse(course).subscribe(function (obj) {
                if (obj.message === 'saved') {
                    //this.courses.next(null);
                    //this.toggleViews();
                    // Da bi se automatski izlistale lekcije kreiranog kursa
                    //this.courseId = obj.courseId;
                    //this.refreshCourses();
                }
                else {
                    //this.loading = false;
                    //this.showLessonList = false;
                    _this.addCourseError = 'There was a problem with saving your course.';
                }
            });
            this.activeSubs.push(sub);
            this.courseForm.reset();
        }
    };
    AddCoursesComponent.prototype.xmlToText = function (text) {
        return text.replace(/<[/]?[ ]*h[1-6][ ]*>/g, '\n\n')
            .replace(/(&[a-z]+;)|(<[/]?[^>]*[/]?>)/g, '');
    };
    AddCoursesComponent.prototype.getChosenFile = function () {
        var absPath = this.courseForm.get('file').value;
        if (!absPath)
            return '';
        return absPath.substr(absPath.lastIndexOf('\\') + 1);
    };
    AddCoursesComponent.prototype.makeCourse = function (text, courseName, author, targetLang) {
        var course = {
            _id: '',
            name: courseName,
            author: author,
            targetLang: targetLang,
            lessons: [],
            unknownWords: 0,
            yeziqs: 0
        };
        /**
         * I validne reci i nevalidni tokeni se cuvaju u nizu, odrzava se redosled iz teksta.
         * Validne reci se ogranicavaju tagom <split> tako da ce poziv split('<split>')
         * zahvatiti i validne reci i nevalidne tokene u pravilnom redosledu.
         * */
        var regex = new RegExp(this.regexMap.get(this.user.targetLang), 'g');
        var textArr = text.replace(regex, function (w) { return '<split>' + w + '<split>'; })
            .replace(/\n[ \t]*\n/g, '<split><nl><split>')
            .replace(/[ ]+/g, ' ')
            .replace(/\t/g, '<split><tab><split>')
            .replace(/\n/g, '')
            .split('<split>')
            .filter(function (w) { return w !== ''; });
        // Na kraju se niz reci deli na stranice
        var lessonInd = 0;
        var page = 0;
        // Broj tokena po stranici se bira dinamicki jer <nl> rusi balans
        var avgRows = 20;
        var avgLine = 50;
        var avgTokensPerPage = avgRows * avgLine;
        while (textArr.length) {
            if (page === 0)
                course.lessons[lessonInd] = [];
            var currPageSize = 0;
            for (var i = 0; i < textArr.length; i++) {
                if (textArr[i] === '<nl>') {
                    if (currPageSize >= avgTokensPerPage - 8 * avgLine)
                        break;
                    currPageSize += 8 * avgLine;
                }
                else {
                    if (currPageSize >= avgTokensPerPage)
                        break;
                    currPageSize += 1;
                }
            }
            course.lessons[lessonInd].push(textArr.splice(0, currPageSize));
            page++;
            if (page === 20) {
                page = 0;
                lessonInd++;
            }
        }
        return course;
    };
    AddCoursesComponent.prototype.ngOnInit = function () {
    };
    AddCoursesComponent.prototype.ngOnDestroy = function () {
        this.activeSubs.forEach(function (sub) { return sub.unsubscribe(); });
    };
    __decorate([
        core_1.Input()
    ], AddCoursesComponent.prototype, "user");
    __decorate([
        core_1.Output('switchView')
    ], AddCoursesComponent.prototype, "emitSwitchView");
    __decorate([
        core_1.ViewChild('fileInput', { static: false })
    ], AddCoursesComponent.prototype, "fileInput");
    AddCoursesComponent = __decorate([
        core_1.Component({
            selector: 'app-add-courses',
            templateUrl: './add-courses.component.html',
            styleUrls: ['./add-courses.component.css']
        })
    ], AddCoursesComponent);
    return AddCoursesComponent;
}());
exports.AddCoursesComponent = AddCoursesComponent;
