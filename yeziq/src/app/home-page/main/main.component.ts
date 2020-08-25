import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../../models/course.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  // Shows courses or reading page
  //public showCourses = true;
  public showCourses: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true); 

  @Input()
  public courses: Course[];

  constructor() { }

  ngOnInit(): void {
  }

}
