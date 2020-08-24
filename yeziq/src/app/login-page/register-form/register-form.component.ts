import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit, OnDestroy {

  @Output('formSwitch')
  public emitFormSwitch: EventEmitter<boolean> = new EventEmitter<boolean>();

  public registerForm: FormGroup;

  public showErrors = false;
  public serverMsg = '';

  public activeSubs: Subscription[] = [];

  constructor(private formBuilder: FormBuilder,
              private userService: UserServiceService,
              private router: Router) { 

    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      confirmPassword: ['', [Validators.required, this.confirmPasswordValidator()]],
      email: ['', [Validators.required, Validators.email]],
      targetLang: 'de'
    });
  }

  private confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      if (!this.registerForm)
        return null;
      const passwordConfirmed = control.value === '' ? false : control.value === this.registerForm.get('password').value;
      return passwordConfirmed ? null : { unconfirmedPassword: true };
    }
  }

  submitRegisterInfo() {
    this.serverMsg = '';

    if (!this.registerForm.valid) {
      this.showErrors = true;

      return;
    }

    this.showErrors = false;

    const data = {
      ...this.registerForm.value,
      srcLang: 'en'
    };
    const registerSub = this.userService.createUser(data).subscribe((user: User) => {
      if (user) {

        const loginSub = this.userService.login({ username: data.username, password: data.password }).subscribe((obj: any) => {
          if (user)
            this.router.navigate(['/courses']);
        });

        this.activeSubs.push(loginSub);

      } else {
        this.serverMsg = 'User already exists.';
      }
    });
    this.activeSubs.push(registerSub);
    this.registerForm.reset();
    this.registerForm.get('targetLang').setValue('de');
  }

  switchForms(): void {
    this.emitFormSwitch.emit(true);
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get email() {
    return this.registerForm.get('email');
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.activeSubs.forEach(sub => sub.unsubscribe());
  }
}
