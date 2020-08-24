import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Course } from '../../models/course.model';
import { User } from 'src/models/user.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public user: User;
  public knownWordCount: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  
  public courses: Course[] = [];

  constructor(private userService: UserService,
              private router: Router) {

    const getUser = this.userService.getUser();
    if (!getUser){
      this.router.navigate(['/']);
    }

    const userSub = getUser.subscribe((user: User) => {
      if (user) {
        this.user = user;

        //this.refreshCourses();

        /* const knownWordCountSub = this.wordsService.getKnownWordCount({ userId: this.user._id, targetLang: this.user.targetLang })
          .subscribe((count: number) => {

            this.knownWordCount.next(count);
            this.level.next(this.getLevel(count));
          });
        this.activeSubs.push(knownWordCountSub); */
      }
    });
            
    const course: Course = {
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

  ngOnInit(): void {
  }

}
