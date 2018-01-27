import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { AccountService } from './data';
import { AccountFormVue } from './forms';

import { Milieu, MilieuFormGroup, MilieuVue, MilieuVuePlus } from '../milieu/core';

'use strict';

/* VUE COMPONENTS ***************************************************************************************************************************************************************************/

/* ACCOUT VUE ******************************************************************/

@Component({
  selector: "account-vue",
  template: `
    <div class="card">
      <div class="card-header" >Account Info</div>
      <div class="card-block">
        <table>
          <tr>
            <td><button class="btn btn-outline-secondary material-icons" [ngClass]="{'active': showEditForm==='username'}" title="Update User Name" (mousedown)="showEditForm = showEditForm==='username' ? null : 'username'" >create</button></td>
            <td class="field-name" >User Name:</td>
            <td class="field" *ngIf="showEditForm !=='username'">{{accountService.username.value}}</td>
            <td *ngIf="showEditForm==='username'"><username-form (cancel)="showEditForm=null"></username-form></td>
          </tr>
          <tr>
            <td><button class="btn btn-outline-secondary material-icons" [ngClass]="{'active': showEditForm==='email'}" title="Update Email" (mousedown)="showEditForm= showEditForm==='email'?null:'email'" >create</button></td>
            <td class="field-name">Email:</td>
            <td class="field" *ngIf="showEditForm !== 'email'">{{accountService.email.value}}</td>
            <td *ngIf="showEditForm==='email'"><email-form (cancel)="showEditForm=null" ></email-form></td>
          </tr>
          <tr>
            <td><button class="btn btn-outline-secondary material-icons" [ngClass]="{'active': showEditForm==='password'}" title="Update Password"  (mousedown)="showEditForm= showEditForm==='password'? null: 'password'" >create</button></td>
            <td class="field-name">Password:</td>
            <td class="field" *ngIf="editPassword!==password"></td>
            <td *ngIf="showEditForm==='password'"><password-form (cancelUpdate)="showEditForm=null"></password-form></td>
          </tr>
        </table>
      </div>
    </div>`
})
export class AccountVueComponent extends MilieuVue {
  showEditForm = '';
  @Input() accountService: AccountService;
}

/* ACCOUNT RESET FORM **********************************************************/

@Component({
  selector: 'account-reset-form',
  template:`
    <div class="card" *ngIf="show">
    <div class="card-header">Reset Form</div>
      <div class="card-block">
        <form [formGroup]="form" (ngSubmit)="resetPassword()" *ngIf="!mailsent && !submitted">
          <email-input [form]="form" [tabIndex]="1" [autofocus]="true" [required]="true" (emailBlur)="checkUniqueEmail()"></email-input>
          <button type="submit" class="btn mb-2" [ngClass]="{'btn-outline-primary': form.invalid, 'btn-primary': form.valid}" [disabled]="form.invalid" tabindex="2" >RESET PASSWORD</button>
        </form>
        <div class="alert alert-danger" *ngIf="uniqueEmail">Email Address not found.</div>
        <div class="alert alert-success" *ngIf="submitted">Processing</div>
        <div class="alert alert-success" *ngIf="mailsent">Reset Instructions have been to sent to your Email. <br>Valid for 1 Hour.</div>
        <a routerLink="/" type="button" class="btn" [ngClass]="{'btn-outline-secondy': !mailsent, 'btn-primary': mailsent}" *ngIf="!submitted">{{mailsent ? 'OK' : 'CANCEL'}}</a>
      </div>
    </div>`
})
export class AccountResetVueComponent extends AccountFormVue { constructor( public accountService: AccountService ){ super( accountService ) } }

/* CREATE ACCOUNT VUE **********************************************************/

@Component({
  selector: "create-account-vue",
  template: `
    <div class="card" >
    <div class="card-header" >Introduce Your Self</div>
      <div class="card-block" style="color: black" >
        <form (ngSubmit)="createAccount()" [formGroup]="form" *ngIf="!accountCreated">
          <username-input (usernameBlur)="checkUniqueUserName()" [form]="form" [tabIndex]="1" [autofocus]="true" [required]="true"></username-input>
          <div class="alert alert-danger" *ngIf="!uniqueUser && username.touched && !processing" >User Name is already Taken.</div>
          <email-input (emailBlur)="checkUniqueEmail()" [form]="form" [tabIndex]="2" [required]="true"></email-input>
          <div class="alert alert-danger" *ngIf="!uniqueEmail && email.touched && !processing" >
            Email is already Taken.<br>
            <a (mousedown)="this.accountService.router.navigateByUrl('/account/reset-form')" href="#" >I FORGOT MY PASSWORD</a>
          </div>
          <password-input [form]="form" [tabIndex]="4" ></password-input>
          <button type="submit" class="btn float-right" [ngClass]="{'btn-outline-primary': form.invalid, 'btn-primary': form.valid}" [disabled]="form.invalid || uniqueEmail === false || uniqueUser == false" >CREATE ACCOUNT</button><br><br>
        </form>
        <div class="alert" [ngClass]="{'alert-success': accountCreated === true, 'alert-danger': accountCreated === false}" *ngIf="message">{{message}}</div>
        <hr>
        <button class="btn btn-outline-secondary" (mousedown)="this.accountService.router.navigateByUrl('/account/log-in')" type="button" >I HAVE AN ACCOUNT</button>
      </div>
    </div>`
})
export class CreateAccountVueComponent extends AccountFormVue { constructor(accountService: AccountService){ super(accountService) } }

/* LOGIN VUE *******************************************************************/

@Component({
  selector: 'log-in-vue',
  template: `
    <div class="card" *ngIf="show">
      <div class="card-header" *ngIf="!accountService.authenticated">Log In</div>
      <div *ngIf="accountService.authenticated">{{accountService.router.navigateByUrl('/account')}}</div>
      <div class="card-block">
        <form [formGroup]="form" *ngIf="!loggedIn && !accountService.authenticated" (ngSubmit)="logIn()">
          <email-input [form]="form" [tabIndex]="1" [autofocus]="true" [required]="true" (emailBlur)="checkUniqueEmail()" ></email-input>
          <password-input  [form]="form" [tabIndex]="2"></password-input>
          <button type="submit" class="btn float-right" [ngClass]="{'btn-outline-primary': form.invalid, 'btn-primary': form.valid}" [disabled]="form.invalid" tabindex="3" >LOG IN</button><br><br>
        </form>
        <div class="alert" [ngClass]="{'alert-success': loggedIn, 'alert-danger': !loggedIn}" *ngIf="message">{{message}}</div>
        <div class="alert alert-danger" *ngIf="uniqueEmail">Email Address not found.</div>
        <hr>
        <button class="btn btn-primary mb-2" (mousedown)="this.accountService.router.navigateByUrl('/account')" type="button">FREE ACCOUNT</button><br>
        <button class="btn btn-outline-secondary" (mousedown)="this.accountService.router.navigateByUrl('/account/reset-form')" type="button">RESET PASSWORD</button>
      </div>
    </div>`
})
export class LogInVueComponent extends AccountFormVue {
  constructor(
    public accountService: AccountService ){
      super( accountService );
  }
}

/* PASSWORD RESET **************************************************************/

@Component({
  selector: 'reset-password',
  template: `
    <div class="card" *ngIf="show">
    <div *ngIf="accountService.authenticated">{{accountService.router.navigateByUrl('/account')}}</div>
    <div class="card-header">Reset Password</div>
      <div class="card-block">
        <div class="alert alert-danger" *ngIf="!validToken && !processing">This link is Invalid or Expired.</div>
        <password-form *ngIf="validToken" [resetToken]="token" ></password-form>
      </div>
    </div>`
})
export class ResetPasswordVueCompoent extends MilieuVuePlus {

  validToken = null;
  processing = true;
  token = null;

  constructor(public route: ActivatedRoute, public accountService: AccountService){
    super(accountService);
    this.route.params.subscribe( params =>
      {
        this.accountService.validResetId( params.id ).then( valid => {
          this.validToken = valid;
          this.token = params.id;
          this.processing = false;
        }
    ) } )
  }
}

/* ACCOUNT MILIEU ***************************************************************************************************************************************************************************/

@Component({
  selector: 'account-milieu',
  template: `
  <view-port>
    <media><div class="media-wrapper"><img src="assets/img/programmer.jpg" ></div></media>
    <content>
      <main class="row" >
        <div class="col-md-3" ></div>
        <div class="col-md-6">
          <div *ngIf="!accountService.authenticated && !params && accountService.authenticated !== null"><create-account-vue [accountService]="accountService" ></create-account-vue></div>
          <div *ngIf="accountService.authenticated && !params && !pending"><account-vue [accountService]="accountService" ></account-vue></div>
          <log-in-vue ></log-in-vue>
          <account-reset-form></account-reset-form>
          <reset-password ></reset-password>
        </div>
        <div class="col-md-3"></div>
      </main>
    </content>
  </view-port>`
})
export class AccountMilieuComponent extends Milieu implements OnInit{

  params = false;

  @ViewChild(LogInVueComponent) logInVue;
  @ViewChild(AccountResetVueComponent) accountResetVue;
  @ViewChild(ResetPasswordVueCompoent) resetPasswordVue;

  constructor(protected route: ActivatedRoute, public accountService: AccountService) { super( route, accountService) }

  ngOnInit(){
    this.route.params.subscribe(
      params => {
        if(params.action || params.id) this.params = true;
        this.logInVue.show = params.action === 'log-in' ? 'true' : false;
        this.accountResetVue.show = params.action === 'reset-form' ? 'true' : false;
        this.resetPasswordVue.show = params.id ? 'true' : false;
    });
  }
}
