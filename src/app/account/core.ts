import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MilieuInputComponent, MilieuFormGroup } from '../milieu/core';
import { AccountService } from './data';
import { FormControl, Validators } from '@angular/forms';

import { MilieuService } from '../milieu/milieu.service';

import { CreateAccountVueComponent } from './create-account-vue.component';


import { ActivatedRoute } from "@angular/router";

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

  host:{ '( document:keypress )': 'handleKeyboardEvent( $event )' },

  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" *ngIf="!submitted">
      <div class="input-group">
        <input class="form-control" [type]="inputType" (keypress)="form.focus = 'password' " formControlName="password" autocorrect="off" autocomplete="off" tabindex="1" placeholder="Password" required>
        <button class="btn btn-outline-secondary material-icons" type="button" title="Show Password" (mousedown)="inputType='text'" (mouseup)="inputType='password'" tabindex="2">visibility</button>
        <button class="btn btn-outline-secondary material-icons" type="button" title="Clear Password" (click)="password.reset()" tabindex="3">clear</button>
        <button class="btn btn-success material-icons update"  [disabled]="form.invalid" title="Update Password" tabindex="4">done</button>
        <button class="btn btn-secondary material-icons" *ngIf="showCancelButton" title="Cancel Password Update" tabindex="5">clear</button>
      </div>
    </form>
    <div class="alert alert-warning" *ngIf="caps">CAPS IS ON</div>
    <div class="alert alert-danger" *ngIf="password.invalid && password.touched">
      <aside *ngIf="errors.required">Password is required.</aside>
      <aside *ngIf="errors.minlength">Password min {{errors.minlength.requiredLength}} characters.<br>You have {{errors.minlength.actualLength}}.</aside>
      <aside *ngIf="errors.maxlength">Password max {{errors.maxlength.requiredLength}} characters.<br>You have {{errors.maxlength.actualLength}}.</aside>
      <aside *ngIf="errors.pattern">Space characters are invalid for Passwords.</aside>
    </div>
    <div class="alert" [ngClass]="{'alert-success': passwordUpdated, 'alert-danger': !passwordUpdated}" *ngIf="message" >{{message}}</div>`,

  styles: [` form div.input-group button.btn.material-icons.update{ padding-right: 25px; padding-left: 25px; } `]
})
export class UpdatePasswordForm{

  caps = false;
  inputType = 'password';
  message = null;
  submitted = false;
  passwordUpdated = false;

  @Input() showCancelButton = true;
  @Input() resetToken: string = null;

  form: MilieuFormGroup = new MilieuFormGroup({
    password: new FormControl(
      '',
      [ Validators.required,
        Validators.minLength( this.accountService.password.min ),
        Validators.maxLength( this.accountService.password.max ),
        Validators.pattern( this.accountService.password.pattern ) ] )
  });

  get password() { return this.form.get('password') }
  get errors() { return this.password.errors }
  get focus() { return this.form.focus }

  constructor( public accountService: AccountService ){}

  handleKeyboardEvent(event: KeyboardEvent) { if( this.focus==='password' ) this.caps = event.getModifierState( 'CapsLock' ) }

  submit(){
    this.submitted = true;
    this.accountService.updatePassword(this.password.value, this.resetToken).then(response =>{
      this.message = response.message;
      if(response.valid && response.update){
        this.passwordUpdated = true;
      }
    })
  }
}

@Component({
  selector: 'account-milieu',
  template: `
  <view-port>
    <media><div class="media-wrapper"><img src="assets/img/code.jpg" ></div></media>
    <content>
      <div *ngIf="accountService.authenticated === false"><create-account-vue [accountService]="accountService" ></create-account-vue></div>
      <div *ngIf="accountService.authenticated === true;"><account-vue [accountService]="accountService" ></account-vue></div>
    </content>
  </view-port>`,
  providers: [MilieuService]
})
export class AccountMilieuComponent {

  @ViewChild(CreateAccountVueComponent) createVue;

  constructor(public accountService: AccountService){

  }
}


@Component({
  selector: 'account-reset',
  template: `
  <view-port>
    <media><div class="media-wrapper"><img src="assets/img/code.jpg" ></div></media>
    <content>
      <main class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <div class="card">
          <div class="card-header">Reset Password</div>
            <div class="card-block">
              <div class="alert alert-danger" *ngIf="!validCode">This link is Invalid or Expired.</div>
              <update-password-form [showCancelButton]="false" *ngIf="validCode===true" [resetToken]="token" ></update-password-form>
            </div>
          </div>
        </div>
        <div class="col-md-3"></div>
      </main>
    </content>
  </view-port>`
})
export class AccountResetCompoent {


  validCode = null;
  token: string = null;

  constructor(public route: ActivatedRoute, public accountService: AccountService){
    this.route.params.subscribe(params => {

      this.token = params.id;
      this.accountService.validResetId(params.id).then(valid=>{
        this.validCode = valid;
      });

    });
  }
}
