import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'src/models/course.model';

@Component({
  selector: 'app-courses-menu',
  templateUrl: './courses-menu.component.html',
  styleUrls: ['./courses-menu.component.css']
})
export class CoursesMenuComponent implements OnInit {

  @Input()
  public courses: Course[];

  constructor() { }

  ngOnInit(): void {
  }

}
