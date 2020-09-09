import { Component, OnInit, Input, ElementRef, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { User } from '../../../../../models/user.model';
import { RegexMap } from 'src/assets/language-support';
import { UserService } from '../../../../services/user.service';
import { Subscription } from 'rxjs';
import { Course } from 'src/models/course.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})
export class AddCoursesComponent implements OnInit, OnDestroy {

  @Input()
  public user: User;

  // Form for adding a course
  public courseForm: FormGroup;

  // TODO: refactor and comment
  public addCourseError: string = null;

  @Output('switchView')
  public emitSwitchView: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('fileInput', { static: false })
  public fileInput: ElementRef;

  private regexMap = RegexMap;

  private activeSubs: Subscription[] = [];

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) {

    // Ako je izvrsen login, getUser nece biti null.
    // Sprecava direktno pristupanje /courses delu pre logina.
    const getUser = this.userService.getUser();
    if (!getUser)
      this.router.navigate(['/']);

    const userSub = getUser.subscribe((user: User) => {
      if (user) {
        this.user = user;

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
      name: ['', [Validators.required, Validators.maxLength(30)]],
      file: [''],
      text: ['']
    }, { validator: this.contentValidator() });
  }

  // A text or a file must be supplied
  public contentValidator(): ValidatorFn {
    return () => {
      if (!this.courseForm)
        return null;

      const contentEntered = (this.courseForm.get('file').value !== '') || (this.courseForm.get('text').value !== '');
      return contentEntered ? null : { noContent: true };
    }
  }

  public showCourses(): void {
    this.emitSwitchView.emit(true);
  }

  // Course creation and saving based on form data
  public submitCourse() {
    this.addCourseError = null;
    if (!this.courseForm.valid) {
      if (this.courseForm.get('name').errors.maxlength)
        this.addCourseError = 'The course name must be maximum 30 characters long.';
      else
        this.addCourseError = 'Some other error idk now...';

      return;
    }

    const data = this.courseForm.value;

    // Loading animacija dok se kreira kurs.
    //this.loadingProgress = this.langMap.get(this.user.srcLang).get('creatingCourseDesc');;
    //this.loading = true;

    // Automatski ce se izlistati lekcije kreiranog kursa
    //this.showLessonList = true;

    // Ako je izabran fajl, kreira se kurs iz njega, cak i ako je unesen i tekst.
    if (data.file) {
      const file = this.fileInput.nativeElement.files[0];

      // .txt fajlovi
      if (data.file.endsWith('.txt')) {
        const reader = new FileReader();

        reader.onerror = () => {
          //this.loading = false;
          this.addCourseError = 'There was a problem with creating your course.';
          this.courseForm.reset();
        };

        // Ako se uspesno procita fajl, kreira se kurs, pamti u bazi i osvezava se niz kurseva
        reader.onload = () => {
          const course = this.makeCourse(<string>reader.result, data.name, this.user.username, this.user.targetLang);

          //this.loadingProgress = this.langMap.get(this.user.srcLang).get('savingCourseDesc');
          const sub = this.userService.createCourse(course).subscribe((obj) => {
            if (obj.message === 'saved') {
              //this.courses.next(null);
              //this.toggleViews();

              // Da bi se automatski izlistale lekcije kreiranog kursa
              //this.courseId = obj.courseId;
              //this.refreshCourses();
            } else {
              //this.loading = false;
              //this.showLessonList = false;
              this.addCourseError = 'There was a problem with saving your course.';
            }
          });

          this.activeSubs.push(sub);
          this.courseForm.reset();
        }

        reader.readAsText(file, 'UTF-8');
      } else if (data.file.endsWith('.pdf')) {

        // Salje se ceo fajl serveru koji vraca tekstualni oblik fajla.
        // Potom se sve izvrsava kao u prethodnom slucaju
        let formData = new FormData();
        formData.append('file', file, file.name);

        const pdfSub = this.userService.getTextFromPdf(formData).subscribe((text: string) => {
          if (text) {
            const course = this.makeCourse(text, data.name, this.user.username, this.user.targetLang);

            //this.loadingProgress = this.langMap.get(this.user.srcLang).get('savingCourseDesc');
            const sub = this.userService.createCourse(course).subscribe((obj) => {
              if (obj.message === 'saved') {
                //this.courses.next(null);
                //this.toggleViews();

                // Da bi se automatski izlistale lekcije kreiranog kursa
                //this.courseId = obj.courseId;
                //this.refreshCourses();
              } else {
                //this.loading = false;
                //this.showLessonList = false;
                this.addCourseError = 'There was a problem with saving your course.';
              }
            });

            this.activeSubs.push(sub);
            this.courseForm.reset();
          } else {
            //this.loading = false;
            //this.showLessonList = false;
            this.addCourseError = 'There was a problem with creating your course.';
          }
        });
        this.activeSubs.push(pdfSub);
      } else if (data.file.endsWith('.epub')) {

        // Poput .pdf fajla, salje se fajl serveru ali se dobija tekst u xml formatu.
        let formData = new FormData();
        formData.append('file', file, file.name);

        const epubSub = this.userService.getTextFromEpub(formData).subscribe((text: string) => {
          if (text) {
            const course = this.makeCourse(this.xmlToText(text), data.name, this.user.username, this.user.targetLang);

            //this.loadingProgress = this.langMap.get(this.user.srcLang).get('savingCourseDesc');
            const sub = this.userService.createCourse(course).subscribe((obj) => {
              if (obj.message === 'saved') {
                //this.courses.next(null);
                //this.toggleViews();

                // Da bi se automatski izlistale lekcije kreiranog kursa
                //this.courseId = obj.courseId;
                //this.refreshCourses();
              } else {
                //this.loading = false;
                //this.showLessonList = false;
                this.addCourseError = 'There was a problem with saving your course.';
              }
            });

            this.activeSubs.push(sub);
            this.courseForm.reset();
          } else {
            //this.loading = false;
            this.addCourseError = 'There was a problem with creating your course.';
          }
        });
        this.activeSubs.push(epubSub);
      }

    } else { // Kreiranje kursa na osnovu teksta iz formulara

      const course = this.makeCourse(data.text, data.name, this.user.username, this.user.targetLang);

      //this.loadingProgress = this.langMap.get(this.user.srcLang).get('savingCourseDesc');
      const sub = this.userService.createCourse(course).subscribe((obj) => {
        if (obj.message === 'saved') {
          //this.courses.next(null);
          //this.toggleViews();

          // Da bi se automatski izlistale lekcije kreiranog kursa
          //this.courseId = obj.courseId;
          //this.refreshCourses();
        } else {
          //this.loading = false;
          //this.showLessonList = false;
          this.addCourseError = 'There was a problem with saving your course.';
        }
      });

      this.activeSubs.push(sub);
      this.courseForm.reset();
    }
  }

  private xmlToText(text: string): string {
    return text.replace(/<[/]?[ ]*h[1-6][ ]*>/g, '\n\n')
      .replace(/(&[a-z]+;)|(<[/]?[^>]*[/]?>)/g, '')
  }

  public getChosenFile(): string {
    const absPath = this.courseForm.get('file').value;
    if (!absPath)
      return '';

    return absPath.substr(absPath.lastIndexOf('\\') + 1);
  }

  private makeCourse(text: string, courseName: string, author: string, targetLang: string): Course {
    const course: Course = {
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
    const regex = new RegExp(this.regexMap.get(this.user.targetLang), 'g');
    let textArr = text.replace(regex, w => '<split>' + w + '<split>')
      .replace(/\n[ \t]*\n/g, '<split><nl><split>')
      .replace(/[ ]+/g, ' ')
      .replace(/\t/g, '<split><tab><split>')
      .replace(/\n/g, '')
      .split('<split>')
      .filter(w => w !== '');

    // Na kraju se niz reci deli na stranice
    let lessonInd = 0;
    let page = 0;

    // Broj tokena po stranici se bira dinamicki jer <nl> rusi balans
    const avgRows = 20;
    const avgLine = 50;
    const avgTokensPerPage = avgRows * avgLine;

    while (textArr.length) {

      if (page === 0)
        course.lessons[lessonInd] = [];

      let currPageSize = 0;
      for (let i = 0; i < textArr.length; i++) {

        if (textArr[i] === '<nl>') {
          if (currPageSize >= avgTokensPerPage - 8 * avgLine)
            break;

          currPageSize += 8 * avgLine;
        } else {
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
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.activeSubs.forEach(sub => sub.unsubscribe());
  }
}
