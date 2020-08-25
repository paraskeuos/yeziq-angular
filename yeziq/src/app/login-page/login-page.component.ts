import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public showLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() { }

  ngOnInit(): void {
  }

}
