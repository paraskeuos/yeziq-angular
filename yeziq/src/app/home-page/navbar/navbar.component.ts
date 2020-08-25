import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/models/user.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input()
  public user: User;

  @Input()
  public knownWordCount: BehaviorSubject<number>;

  constructor() { }

  ngOnInit(): void {
  }

}
