import { Component,  OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AccountService } from './data';
import { Account } from './data';

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
          <form  [formGroup]="resetForm" #formReset="ngForm" (ngSubmit)="resetPassword()" *ngIf="!mailsent && !submitted">
            <email-input [form]="resetForm" [tabIndex]="1" #resetEmail (emailBlur)="checkUniqueEmail($event,resetEmail.form.get('email').value)"></email-input>
            <button type="submit" class="btn mb-2" [ngClass]="{'btn-outline-primary': resetForm.invalid, 'btn-primary': resetForm.valid}" [disabled]="resetForm.invalid" tabindex="2" >RESET PASSWORD</button>
            <button type="button" class="btn btn-outline-secondary no-email-check" tabindex="3" (mousedown)="toggleResetForm()" >CANCEL</button>
          </form>
          <div class="alert alert-danger" *ngIf="uniqueEmail">Email Address not found.</div>
          <div class="alert alert-success" *ngIf="submitted">Processing</div>
          <div class="alert alert-success" *ngIf="mailsent">Reset Instructions have been to sent to your Email.</div>
          <button type="button" class="btn btn-primary close-modal" *ngIf="mailsent" (click)="toggleResetForm()" >OK</button>
        </div>
        <div *ngIf="!accountService.authenticated && !showResetForm">
          <form [formGroup]="logInForm" *ngIf="!loggedIn"  (ngSubmit)="onSubmit()">
            <email-input [form]="logInForm" [tabIndex]="1" #logInEmail (emailBlur)="checkUniqueEmail($event,logInEmail.form.get('email').value)" ></email-input>
            <password-input  [form]="logInForm" [tabIndex]="2"></password-input>
            <button type="submit" class="btn float-right" [ngClass]="{'btn-outline-primary': logInForm.invalid, 'btn-primary': logInForm.valid}" [disabled]="logInForm.invalid" tabindex="3" >LOG IN</button><br><br>
          </form>
          <div class="alert" [ngClass]="{'alert-success': loggedIn, 'alert-danger': !loggedIn}" *ngIf="serverMessage">{{serverMessage}}</div>
          <div class="alert alert-danger" *ngIf="uniqueEmail">Email Address not found.</div>
          <div *ngIf="!accountService.authenticated && !loggedIn" >
            <hr>
            <button class="btn btn-outline-secondary mb-2 no-email-check" (mousedown)="toggleResetForm()" >RESET PASSWORD</button>
            <a routerLink="account" class="btn btn-primary close-modal" >FREE ACCOUNT</a>
          </div>
        </div>

        <div *ngIf="accountService.authenticated">
          <a (click)="accountService.logOut()" class="btn btn-outline-secondary mb-2 close-modal"  >LOG OUT</a>
          <a routerLink="/account" class="btn btn-secondary close-modal">VIEW PROFILE</a>
        </div>
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
  uniqueEmail:boolean = null;
  mailsent = null;

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

  toggleResetForm(){

    this.uniqueEmail = null;
    this.showResetForm = !this.showResetForm;
    this.logInForm.reset();
    this.resetForm.reset();
    this.logInForm.focus = null;
    this.resetForm.focus = null;
    this.mailsent = false;
  }

  checkUniqueEmail(event,email){
    if(event.relatedTarget){
      if(event.relatedTarget.className.search(/no-email-check/) <= -1  ){
        this.accountService.uniqueEmail(email).then( data => {
          this.uniqueEmail = data;
        });
      }
    }
  }

  resetPassword(){
    this.submitted = true;
    this.accountService.resetPassword(this.resetForm.get('email').value).then( mailsent =>{
      this.mailsent = mailsent;
      this.submitted = false;
    });
  }
}

/* Copyright AEO all rights reserved */
