import { Component, EventEmitter, Input, Output,  } from '@angular/core';
import { MilieuFormGroup } from '../milieu/core';
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
