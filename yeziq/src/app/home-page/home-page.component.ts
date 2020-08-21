import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public courses: Course[] = [];

  constructor() { 
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
