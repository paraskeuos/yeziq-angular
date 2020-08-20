import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  // Shows courses or reading page
  public showCourses = true;

  constructor() { }

  ngOnInit(): void {
  }

}
