import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  @Output('formSwitch')
  public emitFormSwitch: EventEmitter<boolean> = new EventEmitter<boolean>();

  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  public submitLoginInfo() {
    
  }

  switchForms(): void {
    this.emitFormSwitch.emit(false);
  }

  ngOnInit(): void {
  }

}
