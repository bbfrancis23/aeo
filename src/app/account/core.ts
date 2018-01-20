import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { MilieuInputComponent, MilieuFormGroup } from '../milieu/core';
import { AccountService } from './account.service';
import { FormControl, Validators } from '@angular/forms';



'use strict';

@Component ({
  selector: 'email-input',
  template: `
    <div class="input-group" [formGroup]="form">
      <input class="form-control" formControlName="email" placeholder="Email"  (keypress)="form.focus='email'" tabindex="{{tabIndex}}" (blur)="emailBlur.emit($event)" required>
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

@Component({
  selector: 'password-input',
  host:{
    '(document:keypress)': 'handleKeyboardEvent($event)'
  },
  template:`
    <div class="input-group" [formGroup]="form">
      <input class="form-control" [type]="inputType" formControlName="password" placeholder="Password" (keypress)="this.form.focus='password'" autocorrect="off" autocomplete="off" tabindex="{{tabIndex}}" required>
      <button class="btn btn-outline-secondary material-icons" type="button" *ngIf="focus==='password'" title="Show Password" (mousedown)="inputType ='text'" (mouseup)="inputType='password'">visibility</button>
      <button class="btn btn-outline-secondary material-icons" type="button" *ngIf="focus==='password'" title="Clear Password" (click)="password.reset()">clear</button>
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

  constructor(protected accountService:AccountService){ super(accountService)}

  handleKeyboardEvent(event: KeyboardEvent) {
    if(this.focus==='password'){
      this.caps = event.getModifierState( 'CapsLock' );
    }
  }

  ngOnInit(){
    this.form.addControl('password',  new FormControl('', [Validators.required, Validators.minLength(this.accountService.password.min), Validators.maxLength(this.accountService.password.max), Validators.pattern(this.accountService.password.pattern)]));
  }

  get password() { return this.form.get('password') }
  get errors() { return this.password.errors }
  get focus() { return this.form.focus }
}

@Component({
  selector: 'update-password-form',
  host:{
    '(document:keypress)': 'handleKeyboardEvent($event)'
  },
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <div class="input-group">
        <input class="form-control" type="inputType" formControlName="Password" (keypress)="form.focus='password'" autocorrect="off" autocomplete="off" tabindex="1" required>
        <button class="btn btn-outline-secondary material-icons" type="button" title="Show Password" (mousedown)="inputType='text'" mouseup="inputType='password'" tabindex="2"></button>
        <button class="btn btn-outline-secondary material-icona" type="button" title="Clear Password" (click)="password.reset()" tabindex="3">clear</button>
        <button class="btn" [ngClass]="{'btn-outline-success': form.invalid, 'btn-success': form.valid}" title="Update Password" tabindex="4">done</button>
        <button class="btn btn-secondary" title="Cancel Password Update" tabindex="5">clear</button>
      </div>
      <div class="alert alert-warning" *ngIf="caps">CAPS IS ON</div>
      <div class="alert alert-danger" *ngIf="password.invalid && password.touched">
        <aside *ngIf="errors.required">Password is required.</aside>
        <aside *ngIf="errors.minlength">Password min {{errors.minlength.requiredLength}} characters.<br>You have {{errors.minlength.actualLength}}.</aside>
        <aside *ngIf="errors.maxlength">Password max {{errors.maxlength.requiredLength}} characters.<br>You have {{errors.maxlength.actualLength}}.</aside>
        <aside *ngIf="errors.pattern">Space characters are invalid for Passwords.</aside>
      </div>
    </form>`,
    styles: [``]
})
export class UpdatePasswordForm{
  caps = false;
  inputType = 'password';
  form: MilieuFormGroup;

  constructor(protected accountService:AccountService){}

  handleKeyboardEvent(event: KeyboardEvent) {
    if(this.focus==='password'){
      this.caps = event.getModifierState( 'CapsLock' );
    }
  }

  ngOnInit(){
    this.form.addControl('password',  new FormControl('', [Validators.required, Validators.minLength(this.accountService.password.min), Validators.maxLength(this.accountService.password.max), Validators.pattern(this.accountService.password.pattern)]));
  }

  get password() { return this.form.get('password') }
  get errors() { return this.password.errors }
  get focus() { return this.form.focus }
}
