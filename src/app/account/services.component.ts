import { Component,  OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AccountService } from './account.service';
import { Account } from './account';

import { MilieuFormGroup } from '../milieu/core';

'use strict';

@Component({
  selector: 'account-services',

  template: `
    <div class="card" >
      <modal-controls></modal-controls>
      <div class="card-header" *ngIf="!showResetForm">{{accountService.authenticated ? 'Account' : 'Log In'}}</div>
      <div class="card-header" *ngIf="showResetForm">Reset Password</div>
      <div class="card-block" >
        <div *ngIf="showResetForm">
          <form  [formGroup]="resetForm" #formReset="ngForm" (ngSubmit)="resetPassword()">
            <email-input [form]="resetForm"></email-input>
          </form>
        </div>
        <div *ngIf="!accountService.authenticated && !showResetForm">
          <form [formGroup]="logInForm" *ngIf="!loggedIn"  (ngSubmit)="onSubmit()">
            <email-input [form]="logInForm" [tabIndex]="1"></email-input>
            <password-input  [form]="logInForm" [tabIndex]="2"></password-input>
            <button type="submit" class="btn btn-success mt-2 float-right" [disabled]="logInForm.invalid" tabindex="3" >LOG IN</button><br><br>
          </form>
          <div class="alert" [ngClass]="{'alert-success': loggedIn, 'alert-danger': !loggedIn}" *ngIf="serverMessage">{{serverMessage}}</div>

          <hr>
          <div class="create-account mb-2" *ngIf="!accountService.authenticated" ><button class="btn btn-secondary" (click)="showResetForm=true" >RESET PASSWORD</button></div>
          <div class="create-account" *ngIf="!accountService.authenticated" ><a routerLink="account" class="btn btn-primary close-modal" >FREE ACCOUNT</a></div>
        </div>

        <div class="create-account mb-2" *ngIf="accountService.authenticated === true"><a (click)="accountService.logOut()" class="btn btn-outline-primary close-modal" >LOG OUT</a></div>
        <div class="create-account" *ngIf="accountService.authenticated === true"><a routerLink="/account" class="btn btn-outline-primary close-modal" >VIEW PROFILE</a></div>

      </div>
    </div>`
})
export class AccountServicesComponent implements OnInit {

  logInForm: MilieuFormGroup;
  resetForm: MilieuFormGroup;

  showResetForm = false;
  submitted = false;
  serverMessage = '';
  loggedIn: boolean = null;

  constructor(private accountService: AccountService){}



  ngOnInit() {
    this.logInForm = new MilieuFormGroup({});
    this.resetForm = new MilieuFormGroup({});
  }

  onSubmit(): void {
    this.accountService.login(this.logInForm.value).then((data)=>{
      this.serverMessage = data;
      this.loggedIn = data.login;
      this.serverMessage = data.message;
    });
  }



  resetPassword(){

  }
}

/* Copyright AEO all rights reserved */
