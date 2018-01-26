import { Component, EventEmitter, HostListener, Input, Output, OnInit  } from '@angular/core';
import { MilieuFormGroup, MilieuInputComponent, MilieuVuePlus } from '../milieu/core';
import { FormControl, Validators } from '@angular/forms';
import { MilieuService } from '../milieu/milieu.service';
import { AccountService } from './data';


'use strict';

export abstract class MilieuFieldForm{
  message: string = null;
  subbitted = false;
  updated = false;

  @Input() showCancelButton = true;

  @Output() cancel = new EventEmitter();
  form = new MilieuFormGroup({});

  constructor( public milieuService: MilieuService ){}

}

export abstract class AccountFormVue extends MilieuVuePlus {
  uniqueUser: boolean = null;
  uniqueEmail: boolean = null;
  accountCreated = null;
  submitted = false;
  mailsent = null;

  message = "";
  form = new MilieuFormGroup({});
  processing = false;
  loggedIn: boolean = null;

  @Input() accountService: AccountService;

  constructor(accountService:AccountService){super(accountService)}

  get username() { return this.form.get('username'); }
  get email(){ return this.form.get('email'); }

  createAccount(){
    this.accountService.createItem(this.form.value).then((data)=>{
      this.accountCreated = data.created;
      this.message = data.message;
      window.location.reload();
    });
  }

  checkUniqueUserName(){
    this.processing = true;
    this.accountService.uniqueUserName(this.username.value).then((data)=>{
      this.processing = false;
      this.uniqueUser = data;
    });
  }

  checkUniqueEmail(){
    if(this.email.value && this.email.valid){

      console.log(this.email.valid);

      this.processing = true;
      this.accountService.uniqueEmail(this.email.value).then( unique => {
        this.processing = false;
        this.uniqueEmail = unique;
      });
    }
  }

  logIn(){
    this.accountService.login(this.form.value).then((data)=>{
      this.message = data;
      this.loggedIn = data.login;
      this.message = data.message;
    });
  }

  resetPassword(){
    this.submitted = true;
    this.accountService.resetPassword(this.form.get('email').value).then( mailsent =>{
      this.mailsent = mailsent;
      this.submitted = false;
    });
  }
}




@Component ({
  selector: 'username-input',
  template: `
    <div class="input-group" [formGroup]="form">
      <input class="form-control" formControlName="username" placeholder="User Name"  (keypress)="form.focus='username'" tabindex="{{tabIndex}}" autofocus="{{autofocus}}" (blur)="usernameBlur.emit($event)"  required>
      <button class="btn btn-outline-secondary material-icons" type="button" *ngIf="form.focus==='username'" title="Reset User Name" (click)=username.reset() >clear</button>
    </div>
    <div *ngIf="username.invalid && username.touched" class="alert alert-danger">
      <aside *ngIf="errors.required">User Name is required.</aside>
      <aside *ngIf="errors.minlength">User Name min {{errors.minlength.requiredLength}} characters.<br>You have {{errors.minlength.actualLength}}.</aside>
      <aside *ngIf="errors.maxlength">User Name max {{errors.maxlength.requiredLength}} characters.<br> You have {{errors.maxlength.actualLength}}.</aside>
      <div *ngIf="username.errors.pattern">User Name can only use Alpha Numberic characters and NO spaces.</div>
    </div>
    `
})
export class UserNameInputComponent extends MilieuInputComponent implements OnInit {

  @Output() usernameBlur = new EventEmitter();

  constructor(protected accountService:AccountService){ super(accountService)}

  ngOnInit(){
    this.form.addControl('username',  new FormControl('', [Validators.required, Validators.minLength(this.accountService.username.min), Validators.maxLength(this.accountService.username.max), Validators.pattern(this.accountService.username.pattern) ]));
  

  }

  get username() { return this.form.get('username') }
  get errors() { return this.username.errors }
}


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
  selector: 'username-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" *ngIf="!submitted">
      <div class="input-group">
        <input class="form-control" [type]="inputType" (keypress)="form.focus ='username'" formControlName="username" tabindex="1" placeholder="User Name" required>
        <button class="btn btn-outline-secondary material-icons" type="button" title="Clear User Name" (click)="username.reset()" tabindex="2" *ngIf="form.focus==='username'">close</button>
        <button class="btn btn-outline-success material-icons submit-check-button"  [disabled]="form.invalid" title="Submit User Name" tabindex="3" *ngIf="form.focus==='username'">done</button>
        <button class="btn btn-outline-secondary material-icons" type="button" (mousedown)="cancel.emit($event)" title="Cancel" tabindex="4" *ngIf="form.focus==='username'">cancel</button>
      </div>
    </form>
    <div class="alert alert-danger" *ngIf="username.invalid && username.touched">
      <aside *ngIf="errors.required">User Name is required.</aside>
      <aside *ngIf="errors.minlength">User Name min {{errors.minlength.requiredLength}} characters.<br>You have {{errors.minlength.actualLength}}.</aside>
      <aside *ngIf="errors.maxlength">User Name max {{errors.maxlength.requiredLength}} characters.<br>You have {{errors.maxlength.actualLength}}.</aside>
      <aside *ngIf="errors.pattern">User Name can only use Alpha Numberic characters and NO spaces.</aside>
    </div>
    <div class="alert" [ngClass]="{'alert-success': updated, 'alert-danger': !updated}" *ngIf="message" >{{message}}</div>
    <div *ngIf="uniqueUser===false && username.touched"><div class="alert alert-danger">User Name is already Taken.</div></div>`
})
export class UserNameFormComponent extends MilieuFieldForm {

  uniqueUser: boolean = null;

  constructor( public accountService: AccountService){
    super(accountService);
    this.form.addControl('username', new FormControl( '', [ Validators.required, Validators.minLength(this.accountService.username.min), Validators.maxLength(this.accountService.username.max), Validators.pattern(this.accountService.username.pattern)]));
  }

  get username() { return this.form.get('username') }
  get errors() { return this.username.errors}


  uniqueUserName(){
    return this.accountService.uniqueUserName(this.username.value).then((data)=>{
      this.uniqueUser = data;
      return data;
    });
  }

  submit(){
    this.uniqueUserName().then(data =>{
      this.accountService.updateUserName(this.username.value).then( updateData =>{
        if(updateData.update){
          this.message = updateData.message;
          this.updated = updateData.update;


          setTimeout(()=>{
            window.location.reload();
          },3000);
        }
      });
    }).catch( err =>{
      console.log(err);
    });
  }
}

@Component({

  selector: 'update-password-form',

  host:{ '( document:keypress )': 'handleKeyboardEvent( $event )' },

  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" *ngIf="!submitted">
      <div class="input-group">
        <input class="form-control" [type]="inputType" (keypress)="form.focus = 'password' " formControlName="password" autocorrect="off" autocomplete="off" tabindex="1" placeholder="Password" required>
        <button class="btn btn-outline-secondary material-icons" type="button" title="Show Password" (mousedown)="inputType='text'" (mouseup)="inputType='password'" (mouseout)="inputType='password'" tabindex="2">visibility</button>
        <button class="btn btn-outline-secondary material-icons" type="button" title="Clear Password" (click)="password.reset()" tabindex="3">clear</button>
        <button class="btn btn-success material-icons submit-check-button"  [disabled]="form.invalid" title="Update Password" tabindex="4">done</button>
        <button class="btn btn-secondary material-icons" type="button" *ngIf="showCancelButton" (click)="cancelUpdate.emit($event)" title="Cancel Password Update" tabindex="5">clear</button>
      </div>
    </form>
    <div class="alert alert-warning" *ngIf="caps">CAPS IS ON</div>
    <div class="alert alert-danger" *ngIf="password.invalid && password.touched">
      <aside *ngIf="errors.required">Password is required.</aside>
      <aside *ngIf="errors.minlength">Password min {{errors.minlength.requiredLength}} characters.<br>You have {{errors.minlength.actualLength}}.</aside>
      <aside *ngIf="errors.maxlength">Password max {{errors.maxlength.requiredLength}} characters.<br>You have {{errors.maxlength.actualLength}}.</aside>
      <aside *ngIf="errors.pattern">Space characters are invalid for Passwords.</aside>
    </div>
    <div class="alert" [ngClass]="{'alert-success': passwordUpdated, 'alert-danger': !passwordUpdated}" *ngIf="message" >{{message}}</div>`
})
export class UpdatePasswordForm{

  caps = false;
  inputType = 'password';
  message = null;
  submitted = false;
  passwordUpdated = false;

  @Input() showCancelButton = true;
  @Input() resetToken: string = null;

  @Output() cancelUpdate = new EventEmitter();

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
      this.passwordUpdated = response.update;

    })
  }
}

@Component({
  selector: 'email-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" *ngIf="!submitted">
      <div class="input-group">
        <input class="form-control" [type]="inputType" (keypress)="form.focus ='email'" formControlName="email" tabindex="1" placeholder="Email" required>
        <button class="btn btn-outline-secondary material-icons" type="button" title="Clear Email" (click)="email.reset()" tabindex="2">clear</button>
        <button class="btn btn-success material-icons submit-check-button"  [disabled]="form.invalid" title="Submit Email" tabindex="3">done</button>
        <button class="btn btn-secondary material-icons" type="button" (click)="cancel.emit($event)" title="Cancel" tabindex="4">clear</button>
      </div>
    </form>
    <div class="alert alert-danger" *ngIf="email.invalid && email.touched">
      <aside *ngIf="errors.required">Email is required.</aside>
      <aside *ngIf="errors.minlength">Email min {{errors.minlength.requiredLength}} characters.<br>You have {{errors.minlength.actualLength}}.</aside>
      <aside *ngIf="errors.maxlength">Email max {{errors.maxlength.requiredLength}} characters.<br>You have {{errors.maxlength.actualLength}}.</aside>
      <aside *ngIf="errors.email">Must be valid Email.<br>e.g. - name@mail.com</aside>
    </div>
    <div class="alert" [ngClass]="{'alert-success': updated, 'alert-danger': !updated}" *ngIf="message" >{{message}}</div>
    <div *ngIf="uniqueEmail===false && email.touched"><div class="alert alert-danger">Email is already Taken.</div></div>`
})
export class EmailFormComponent extends MilieuFieldForm {

  uniqueEmail: boolean = null;

  constructor( public accountService: AccountService){
    super(accountService);
    this.form.addControl('email', new FormControl( '', [ Validators.required, Validators.minLength(this.accountService.email.min), Validators.maxLength(this.accountService.email.max), Validators.email]));
  }

  get email() { return this.form.get('email') }
  get errors() { return this.email.errors}

  checkUniqueEmail(){
    return this.accountService.uniqueEmail(this.email.value).then( data => {
      this.uniqueEmail = data;
      return data;
    });
  }

  submit(){
    this.checkUniqueEmail().then(data =>{

      //console.log(data);

      if(data){

        //console.log('ready to update email');
        this.accountService.updateEmail(this.email.value).then( updateData =>{
         if(updateData.update){
            this.message = updateData.message;
            this.updated = updateData.update;

            setTimeout(()=>{
              window.location.reload();
            },3000);
          }
        });

      }

    }).catch( err =>{
      console.log(err);
    });
  }

}
