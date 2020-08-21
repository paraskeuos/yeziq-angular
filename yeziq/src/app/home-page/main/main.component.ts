import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../../models/course.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  // Shows courses or reading page
  public showCourses = true;

  @Input()
  public courses: Course[];

  constructor() { }

  ngOnInit(): void {
  }

}
