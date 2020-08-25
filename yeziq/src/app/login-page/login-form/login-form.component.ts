import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, BehaviorSubject } from 'rxjs';
import { User } from 'src/models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit, OnDestroy {

  @Input()
  public showLogin: BehaviorSubject<boolean>;

  public loginForm: FormGroup;

  public showErrors = false;
  public serverMsg = '';

  private activeSubs: Subscription[] = [];

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { 
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  public submitLoginInfo() {
    this.serverMsg = '';

    if (!this.loginForm.valid) {
      this.showErrors = true;

      return;
    }

    this.showErrors = false;

    const sub = this.userService.login(this.loginForm.value).subscribe((user: User) => {
      if (user)
        this.router.navigate(['/courses']);
      else {
        this.serverMsg = 'Incorrect username or password.';
      }
    });

    this.activeSubs.push(sub);
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.activeSubs.forEach(sub => sub.unsubscribe());
  }
}
