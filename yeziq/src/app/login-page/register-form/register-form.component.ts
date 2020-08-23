import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  @Output('formSwitch')
  public emitFormSwitch: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  switchForms(): void {
    this.emitFormSwitch.emit(true);
  }

  ngOnInit(): void {
  }

}
