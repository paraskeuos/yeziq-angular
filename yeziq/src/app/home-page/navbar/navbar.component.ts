import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input()
  public user: User;

  constructor() { }

  ngOnInit(): void {
  }

}
