import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  // Show courses menu or add course form
  public showMenu = true;

  constructor() { }

  ngOnInit(): void {
  }

}
