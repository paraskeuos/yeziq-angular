import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'src/models/course.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  // Show courses menu or add course form
  public showMenu = true;

  @Input()
  public courses: Course[];

  @Input()
  public selectedCourse: BehaviorSubject<number>;
  @Input()
  public selectedLesson: BehaviorSubject<number>;

  constructor() { }

  public onSwitchView(showMenu: boolean): void {
    this.showMenu = showMenu;
  }

  ngOnInit(): void {
  }

}
