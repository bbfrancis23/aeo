import { Component, EventEmitter, HostListener, OnInit, Output  } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { AccountService } from './data';

import { MilieuInputComponent } from '../milieu/core';




/* EMAIL INPUT *****************************************************************/

@Component ({
  selector: 'email-input',
  template: `
    <div class="input-group" [formGroup]="form">
      <input  class="form-control" formControlName="email"
              (keypress)="form.focus='email'" (blur)="emailBlur.emit($event)"
              tabindex="{{tabIndex}}" required={{required}} autofocus={{autofocus}} placeholder="Email" >
      <button class="btn btn-outline-secondary material-icons" type="button" *ngIf="form.focus==='email'" title="Reset Email" (click)=email.reset() >clear</button>
    </div>
    <div *ngIf="email.invalid && email.touched" class="alert alert-danger">
      <aside *ngIf="errors.required">Email is required.</aside>
      <aside *ngIf="errors.minlength">Email min {{errors.minlength.requiredLength}} characters.<br>You have {{errors.minlength.actualLength}}.</aside>
      <aside *ngIf="errors.maxlength">Email max {{errors.maxlength.requiredLength}} characters.<br> You have {{errors.maxlength.actualLength}}.</aside>
      <aside *ngIf="errors.email">Must be valid Email.<br>e.g. - name@mail.com</aside>
    </div>
    `
})
export class EmailInputComponent extends MilieuInputComponent implements OnInit {

  @Output() emailBlur = new EventEmitter();

  constructor(protected accountService:AccountService){ super(accountService)}

  ngOnInit(){
    this.form.addControl('email',  new FormControl('', [Validators.required, Validators.minLength(this.accountService.email.min),Validators.maxLength(this.accountService.email.max),Validators.email]));
  }

  get email() { return this.form.get('email') }
  get errors() { return this.email.errors }
}

/* PASSWORD INPUT **************************************************************/

@Component({
  selector: 'password-input',
  host:{
    '(document:keypress)': 'handleKeyboardEvent($event)'
  },
  template:`
    <div class="input-group" [formGroup]="form">
      <input  class="form-control"
              (keypress)="this.form.focus='password'"
              [type]="inputType"
              formControlName="password" placeholder="Password"  autocorrect="off" autocomplete="off" tabindex="{{tabIndex}}" required="{{required}}">
      <button class="btn btn-outline-secondary material-icons"
              (mousedown)="inputType ='text'" (mouseup)="inputType='password'"
              type="button" title="Show Password"
              *ngIf="focus==='password'">
        visibility
      </button>
      <button class="btn btn-outline-secondary material-icons" type="button" title="Clear Password" (click)="password.reset()" *ngIf="focus==='password'">clear</button>
    </div>
    <div *ngIf="password.invalid && (password.touched)" class="alert alert-danger">
      <aside *ngIf="errors.required">Password is required.</aside>
      <aside *ngIf="errors.minlength">Password min {{errors.minlength.requiredLength}} characters.<br>You have {{errors.minlength.actualLength}}.</aside>
      <aside *ngIf="errors.maxlength">Password max {{errors.maxlength.requiredLength}} characters.<br>You have {{errors.maxlength.actualLength}}.</aside>
      <aside *ngIf="errors.pattern">Space characters are invalid for Passwords.</aside>
    </div>
    <div class="alert alert-warning" *ngIf="caps">CAPS IS ON</div>`
})
export class PasswordInputComponent extends MilieuInputComponent implements OnInit{

  caps = false;
  inputType = 'password';

  constructor(protected accountService:AccountService){ super(accountService) }

  handleKeyboardEvent(event: KeyboardEvent) { if(this.focus==='password') this.caps = event.getModifierState( 'CapsLock' ) }

  ngOnInit(){
    this.form.addControl( 'password',
                          new FormControl(  '',
                                            [ Validators.required,
                                              Validators.minLength(this.accountService.password.min),
                                              Validators.maxLength(this.accountService.password.max),
                                              Validators.pattern(this.accountService.password.pattern)
                                            ]
                                          )
                        );
  }

  get password() { return this.form.get('password') }
  get errors() { return this.password.errors }
  get focus() { return this.form.focus }
}

/* USER NAME INPUT *************************************************************/

@Component ({
  selector: 'username-input',
  template: `
    <div class="input-group" [formGroup]="form">
      <input  class="form-control" formControlName="username"
              (keypress)="form.focus='username'" (blur)="usernameBlur.emit($event)"
              tabindex="{{tabIndex}}" autofocus="{{autofocus}}"  required={{required}} placeholder="User Name">
      <button class="btn btn-outline-secondary material-icons" type="button" *ngIf="form.focus==='username'" title="Reset User Name" (click)=username.reset() >clear</button>
    </div>
    <div *ngIf="username.invalid && username.touched" class="alert alert-danger">
      <aside *ngIf="errors.required">User Name is required.</aside>
      <aside *ngIf="errors.minlength">User Name min {{errors.minlength.requiredLength}} characters.<br>You have {{errors.minlength.actualLength}}.</aside>
      <aside *ngIf="errors.maxlength">User Name max {{errors.maxlength.requiredLength}} characters.<br> You have {{errors.maxlength.actualLength}}.</aside>
      <div *ngIf="username.errors.pattern">User Name can only use Alpha Numberic characters and NO spaces.</div>
    </div>`
})
export class UserNameInputComponent extends MilieuInputComponent implements OnInit {

  @Output() usernameBlur = new EventEmitter();

  constructor(protected accountService:AccountService){ super(accountService)}

  ngOnInit(){
    this.form.addControl( 'username',
                          new FormControl(  '',
                                            [ Validators.required,
                                              Validators.minLength(this.accountService.username.min),
                                              Validators.maxLength(this.accountService.username.max),
                                              Validators.pattern(this.accountService.username.pattern) ]
                                          )
                        );
  }

  get username() { return this.form.get('username') }
  get errors() { return this.username.errors }
}
