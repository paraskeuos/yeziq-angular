import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'src/models/course.model';

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

  constructor() { }

  ngOnInit(): void {
  }

}
