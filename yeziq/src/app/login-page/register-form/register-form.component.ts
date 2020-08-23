import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  @Output('formSwitch')
  public emitFormSwitch: EventEmitter<boolean> = new EventEmitter<boolean>();

  public registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      confirmPassword: ['', [Validators.required, this.confirmPasswordValidator()]],
      email: ['', [Validators.required, Validators.email]],
      //targetLang: [this.srcLang === 'en' ? 'de' : 'en']
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
    
  }

  switchForms(): void {
    this.emitFormSwitch.emit(true);
  }

  ngOnInit(): void {
  }

}
