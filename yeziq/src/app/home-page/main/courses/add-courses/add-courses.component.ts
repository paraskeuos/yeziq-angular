import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { User } from '../../../../../models/user.model';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})
export class AddCoursesComponent implements OnInit {

  @Input()
  public user: User;

  // Form for adding a course
  public courseForm: FormGroup;

  // TODO: refactor and comment
  public addCourseError: string = null;

  constructor(private formBuilder: FormBuilder) {

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

  // Course creation and saving based on form data
  /* public submitText(data) {
    this.addCourseError = null;
    if (!this.courseForm.valid) {
      if(this.courseForm.get('name').errors.maxlength)
        this.addCourseError = 'The course name must be maximum 30 characters long.';
      else
        this.addCourseError = 'Some other error idk now...';

      return;
    }

    // Loading animacija dok se kreira kurs.
    this.loadingProgress = this.langMap.get(this.user.srcLang).get('creatingCourseDesc');;
    this.loading = true;

    // Automatski ce se izlistati lekcije kreiranog kursa
    this.showLessonList = true;

    // Ako je izabran fajl, kreira se kurs iz njega, cak i ako je unesen i tekst.
    if (data.file) {
      const file = this.fileInput.nativeElement.files[0];

      // .txt fajlovi
      if (data.file.endsWith('.txt')) {
        const reader = new FileReader();

        reader.onerror = () => {
          this.loading = false;
          this.addCourseError = this.langMap.get(this.user.srcLang).get('addCourseErrMsg');
          this.courseForm.reset();
        };

        // Ako se uspesno procita fajl, kreira se kurs, pamti u bazi i osvezava se niz kurseva
        reader.onload = () => {
          const course = this.makeCourse(<string>reader.result, data.name, this.user.username, this.user.targetLang);

          this.loadingProgress = this.langMap.get(this.user.srcLang).get('savingCourseDesc');
          const sub = this.userService.createCourse(course).subscribe((obj) => {
            if (obj.message === 'saved') {
              this.courses.next(null);
              this.toggleViews();
              
              // Da bi se automatski izlistale lekcije kreiranog kursa
              this.courseId = obj.courseId;
              this.refreshCourses();
            } else {
              this.loading = false;
              this.showLessonList = false;
              this.addCourseError = this.langMap.get(this.user.srcLang).get('addCourseSaveErrMsg');
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

            this.loadingProgress = this.langMap.get(this.user.srcLang).get('savingCourseDesc');
            const sub = this.userService.createCourse(course).subscribe((obj) => {
              if (obj.message === 'saved') {
                this.courses.next(null);
                this.toggleViews();
                // Da bi se automatski izlistale lekcije kreiranog kursa
                this.courseId = obj.courseId;
                this.refreshCourses();
              } else {
                this.loading = false;
                this.showLessonList = false;
                this.addCourseError = this.langMap.get(this.user.srcLang).get('addCourseSaveErrMsg');
              }
            });

            this.activeSubs.push(sub);
            this.courseForm.reset();
          } else {
            this.loading = false;
            this.showLessonList = false;
            this.addCourseError = this.langMap.get(this.user.srcLang).get('addCourseErrMsg');
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

            this.loadingProgress = this.langMap.get(this.user.srcLang).get('savingCourseDesc');
            const sub = this.userService.createCourse(course).subscribe((obj) => {
              if (obj.message === 'saved') {
                this.courses.next(null);
                this.toggleViews();

                // Da bi se automatski izlistale lekcije kreiranog kursa
                this.courseId = obj.courseId;
                this.refreshCourses();
              } else {
                this.loading = false;
                this.showLessonList = false;
                this.addCourseError = this.langMap.get(this.user.srcLang).get('addCourseSaveErrMsg');
              }
            });

            this.activeSubs.push(sub);
            this.courseForm.reset();
          } else {
            this.loading = false;
            this.addCourseError = this.langMap.get(this.user.srcLang).get('addCourseErrMsg');
          }
        });
        this.activeSubs.push(epubSub);
      }

    } else { // Kreiranje kursa na osnovu teksta iz formulara

      const course = this.makeCourse(data.text, data.name, this.user.username, this.user.targetLang);

      this.loadingProgress = this.langMap.get(this.user.srcLang).get('savingCourseDesc');
      const sub = this.userService.createCourse(course).subscribe((obj) => {
        if (obj.message === 'saved') {
          this.courses.next(null);
          this.toggleViews();

          // Da bi se automatski izlistale lekcije kreiranog kursa
          this.courseId = obj.courseId;
          this.refreshCourses();
        } else {
          this.loading = false;
          this.showLessonList = false;
          this.addCourseError = this.langMap.get(this.user.srcLang).get('addCourseSaveErrMsg');
        }
      });

      this.activeSubs.push(sub);
      this.courseForm.reset();
    }
  } */

  ngOnInit(): void {
  }

}
