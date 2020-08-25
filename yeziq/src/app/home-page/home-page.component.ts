import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Course } from '../../models/course.model';
import { User } from 'src/models/user.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { WordsService } from '../services/words.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  public user: User;
  public knownWordCount: BehaviorSubject<number> = new BehaviorSubject<number>(-1);

  public courses: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>(null);

  public loadingProgress = '';
  //public loading = false;

  private activeSubs: Subscription[] = [];

  constructor(private userService: UserService,
    private wordsService: WordsService,
    private router: Router) {

    const getUser = this.userService.getUser();
    if (!getUser) {
      this.router.navigate(['/']);
    }

    const userSub = getUser.subscribe((user: User) => {
      if (user) {
        this.user = user;

        this.refreshCourses();

        const knownWordCountSub = this.wordsService.getKnownWordCount({ userId: this.user._id, targetLang: this.user.targetLang })
          .subscribe((count: number) => {
            
            this.knownWordCount.next(count);
            //this.level.next(this.getLevel(count));
          });
        this.activeSubs.push(knownWordCountSub);
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

  private refreshCourses(): void {
    this.loadingProgress = 'Loading courses...';
    this.courses.next(null);
    //this.loading = false;

    const sub = this.userService.getCoursesByAuthor({ author: this.user.username, targetLang: this.user.targetLang }).subscribe((courses: Course[]) => {

      this.courses.next(courses);
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
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.activeSubs.forEach(sub => sub.unsubscribe());
  }
}
