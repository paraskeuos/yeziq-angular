import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../../models/course.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @Input()
  public courses: Course[];

  public selectedCourse: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  public selectedLesson: BehaviorSubject<number> = new BehaviorSubject<number>(-1);

  constructor() { }

  ngOnInit(): void {
  }

}
