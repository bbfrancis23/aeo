import { Component, Input }           from '@angular/core';
import { ActivatedRoute, Router }             from "@angular/router";

import { AccountService }             from './data';

import { Milieu, MilieuFormGroup, MilieuVue, MilieuVuePlus }          from '../milieu/core'

'use strict';

/* ABSTRACT ************************************************************************************************************************************************************************************************/

/* ACCOUNT FORM VUE ************************************************************/

export abstract class AccountFormVue extends MilieuVuePlus {
  uniqueUser: boolean = null;
  uniqueEmail: boolean = null;
  accountCreated = null;
  message = "";
  form = new MilieuFormGroup({});
  processing = false;

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
    this.processing = true;
    this.accountService.uniqueEmail(this.email.value).then( unique => {
      this.processing = false;
      this.uniqueEmail = unique;
    });
  }
}

/* COMPONENTS **********************************************************************************************************************************************************************************************/

/* ACCOUNT MILIEU **************************************************************/

@Component({
  selector: 'account-milieu',
  template: `
  <view-port>
    <media><div class="media-wrapper"><img src="assets/img/programmer.jpg" ></div></media>
    <content>
      <div *ngIf="!accountService.authenticated"><create-account-vue [accountService]="accountService" ></create-account-vue></div>
      <div *ngIf="accountService.authenticated"><account-vue [accountService]="accountService" ></account-vue></div>
    </content>
  </view-port>`
})
export class AccountMilieuComponent extends Milieu{ constructor(protected route: ActivatedRoute, public accountService: AccountService) { super(route, accountService); } }

/* ACCOUT VUE ******************************************************************/

@Component({
  selector: "account-vue",
  template: `
    <main class="row"><div class="col-md-2"></div>
      <div class="col-md-8">
        <div class="card">
          <div class="card-header" >Account Info</div>
          <div class="card-block">
            <table>
              <tr>
                <td><button class="btn btn-outline-primary material-icons" [ngClass]="{'active': showEditForm==='username'}" title="Update User Name" (mousedown)="showEditForm = showEditForm==='username' ? null : 'username'" >create</button></td>
                <td class="field-name" >User Name:</td>
                <td class="field" *ngIf="showEditForm !=='username'">{{accountService.username.value}}</td>
                <td *ngIf="showEditForm==='username'"><username-form (cancel)="showEditForm=null"></username-form></td>
              </tr>
              <tr>
                <td><button class="btn btn-outline-primary material-icons" [ngClass]="{'active': showEditForm==='email'}" title="Update Email" (mousedown)="showEditForm= showEditForm==='email'?null:'email'" >create</button></td>
                <td class="field-name">Email:</td>
                <td class="field" *ngIf="showEditForm !== 'email'">{{accountService.email.value}}</td>
                <td *ngIf="showEditForm==='email'"><email-form (cancel)="showEditForm=null" ></email-form></td>
              </tr>
              <tr>
                <td><button class="btn btn-outline-primary material-icons" [ngClass]="{'active': showEditForm==='password'}" title="Update Password"  (mousedown)="showEditForm= showEditForm==='password'? null: 'password'" >create</button></td>
                <td class="field-name">Password:</td>
                <td class="field" *ngIf="editPassword!==password"></td>
                <td *ngIf="showEditForm==='password'"><update-password-form (cancelUpdate)="showEditForm=null"></update-password-form></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    <div class="col-md-2"></div></main>`
})
export class AccountVueComponent extends MilieuVue {

  showEditForm = '';

  @Input() accountService: AccountService;
}

/* CREATE ACCOUNT VUE **********************************************************/

@Component({
  selector: "create-account-vue",
  template: `
    <main class="row" *ngIf="show"><div class="col-md-3" ></div>
      <div class="col-md-6" >
        <div class="card" >
        <div class="card-header" >Introduce Your Self</div>
          <div class="card-block" >
            <form (ngSubmit)="createAccount()" [formGroup]="form" *ngIf="!accountCreated">
              <username-input (usernameBlur)="checkUniqueUserName()" [form]="form" [tabIndex]="1" [autofocus]="true"></username-input>
              <div class="alert alert-danger" *ngIf="!uniqueUser && username.touched && !processing" >User Name is already Taken.</div>
              <email-input (emailBlur)="checkUniqueEmail()" [form]="form" [tabIndex]="2" ></email-input>
              <div class="alert alert-danger" *ngIf="!uniqueEmail && email.touched && !processing" >
                Email is already Taken.<br>
                <a (mousedown)="this.accountService.router.navigateByUrl('/account/reset-form')" href="#" >I FORGOT MY PASSWORD</a>
              </div>
              <password-input [form]="form" [tabIndex]="4" ></password-input>
              <button type="submit" class="btn float-right" [ngClass]="{'btn-outline-primary': form.invalid, 'btn-primary': form.valid}" [disabled]="form.invalid || uniqueEmail === false || uniqueUser == false" >Create Account</button>
            </form>
            <div class="alert" [ngClass]="{'alert-success': accountCreated === true, 'alert-danger': accountCreated === false}" *ngIf="message">{{message}}</div>
          </div>
        </div>
      </div>
    <div class="col-md-3"></div></main>`
})
export class CreateAccountVueComponent extends AccountFormVue {

  constructor(accountService: AccountService){
    super(accountService);
  }
}

/* PASSWORD RESET **************************************************************/

@Component({
  selector: 'reset-password',
  template: `
  <view-port>
    <media><div class="media-wrapper"><img src="assets/img/code.jpg" ></div></media>
    <content>
      <main class="row"><div class="col-md-3"></div>
        <div class="col-md-6">
          <div class="card">
          <div class="card-header">Reset Password</div>
            <div class="card-block">
              <div class="alert alert-danger" *ngIf="!validToken">This link is Invalid or Expired.</div>
              <update-password-form [showCancelButton]="false" *ngIf="validToken" [resetToken]="token" ></update-password-form>
            </div>
          </div>
        </div>
      <div class="col-md-3"></div></main>
    </content>
  </view-port>`
})
export class ResetPasswordCompoent {

  validToken = null;

  constructor(public route: ActivatedRoute, public accountService: AccountService){
    this.route.params.subscribe( params => { this.accountService.validResetId( params.id ).then( valid => this.validToken = valid ) } )
  }
}

/* ACCOUNT RESET FORM **********************************************************/

@Component({
  selector: 'account-reset-form',
  template:`
    <view-port>
      <media><div class="media-wrapper"><img src="assets/img/code.jpg" ></div></media>
      <content>
        <main class="row"><div class="col-md-3"></div>
          <div class="col-md-6">
            <div class="card">
            <div class="card-header">Reset Form</div>
              <div class="card-block">
                <form [formGroup]="form" (ngSubmit)="resetPassword()" *ngIf="!mailsent && !submitted">
                  <email-input [form]="form" [tabIndex]="1" (emailBlur)="checkUniqueEmail()"></email-input>
                  <button type="submit" class="btn mb-2" [ngClass]="{'btn-outline-primary': form.invalid, 'btn-primary': form.valid}" [disabled]="form.invalid" tabindex="2" >RESET PASSWORD</button>
                </form>
                <div class="alert alert-danger" *ngIf="uniqueEmail">Email Address not found.</div>
                <div class="alert alert-success" *ngIf="submitted">Processing</div>
                <div class="alert alert-success" *ngIf="mailsent">Reset Instructions have been to sent to your Email. <br>Valid for 1 Hour.</div>
                <a routerLink="/" type="button" class="btn" [ngClass]="{'btn-outline-secondy': !mailsent, 'btn-primary': mailsent}" *ngIf="!submitted">{{mailsent ? 'OK' : 'CANCEL'}}</a>
              </div>
            </div>
          </div>
        <div class="col-md-3"></div></main>
      </content>
    </view-port>`
})
export class AccountResetFormComponent extends AccountFormVue {

  submitted = false;
  mailsent = null;

  constructor( public accountService: AccountService ){ super( accountService ) }

  resetPassword(){
    this.submitted = true;
    this.accountService.resetPassword(this.form.get('email').value).then( mailsent =>{
      this.mailsent = mailsent;
      this.submitted = false;
    });
  }
}
