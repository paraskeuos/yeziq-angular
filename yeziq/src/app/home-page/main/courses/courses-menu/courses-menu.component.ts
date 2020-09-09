import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Course } from 'src/models/course.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-courses-menu',
  templateUrl: './courses-menu.component.html',
  styleUrls: ['./courses-menu.component.css']
})
export class CoursesMenuComponent implements OnInit {

  @Input()
  public courses: Course[];

  @Output('switchView')
  public emitSwitchView: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  public selectedCourse: BehaviorSubject<number>;
  @Input()
  public selectedLesson: BehaviorSubject<number>;

  constructor() { }

  public showAddCourse(): void {
    this.emitSwitchView.emit(false);
  }

  ngOnInit(): void {
  }

}
