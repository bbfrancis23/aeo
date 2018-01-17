import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AccountService } from './account.service';
import { Account } from './account';

import { MilieuFormGroup } from '../milieu/core';

'use strict';

@Component({
  selector: 'account-services',
  host:{
    '(document:keypress)': 'handleKeyboardEvent($event)'
  },
  template: `
    <div class="card" >
      <modal-controls></modal-controls>
      <div class="card-header" *ngIf="!showResetForm">{{accountService.authenticated ? 'Account' : 'Log In'}}</div>
      <div class="card-header" *ngIf="showResetForm">Reset Password</div>
      <div class="card-block" >
        <div *ngIf="showResetForm">
          <form (ngSubmit)="resetPassword()" [formGroup]="resetForm" #formReset="ngForm">
            <!-- <email-input [emailFormGroup]="resetForm"></email-input> -->
          </form>
        </div>
        <div *ngIf="!accountService.authenticated && !showResetForm">
          <form  (ngSubmit)="onSubmit()" [formGroup]="logInForm" #formLogIn="ngForm" *ngIf="!loggedIn">
            <email-input [emailFormGroup]="logInForm" ></email-input><br>
            <div class="form-group">
              <div class="input-group">
                <input class="form-control" [type]="inputType" formControlName="password" placeholder="Password" (focus)="logInForm.focus='password'" autocorrect="off" autocomplete="off" required>
                <button class="btn btn-outline-secondary material-icons" *ngIf="logInForm.focus==='password'" title="Show Password" (mousedown)="inputType ='text'" (mouseup)="inputType='password'">visibility</button>
                <button class="btn btn-outline-secondary material-icons" *ngIf="logInForm.focus==='password'" title="Reset Password" (click)="password.reset()">clear</button>
              </div>
              <div *ngIf="password.invalid && (password.touched)" class="alert alert-danger">
                <aside *ngIf="password.errors.required">Password is required.</aside>
                <aside *ngIf="password.errors.minlength">Password must be at least {{accountService.password.min}}</aside>
                <aside *ngIf="password.errors.maxlength">Password can only have {{accountService.password.max}} characters.</aside>
                <aside *ngIf="password.errors.pattern">Invalid Password.</aside>
              </div>
            </div>
            <div class="alert alert-warning" *ngIf="caps">CAPS IS ON</div><button type="submit" class="btn btn-success float-right" [disabled]="logInForm.invalid" >LOG IN</button><br><br>
          </form>
          <div class="alert" [ngClass]="{'alert-success': loggedIn, 'alert-danger': !loggedIn}" *ngIf="serverMessage">{{serverMessage}}</div>

          <hr>
          <div class="create-account mb-2" *ngIf="!accountService.authenticated" ><button class="btn btn-outline-secondary" (click)="showResetForm=true" >RESET PASSWORD</button></div>
          <div class="create-account" *ngIf="!accountService.authenticated" ><a routerLink="account" class="btn btn-primary close-modal" >FREE ACCOUNT</a></div>
        </div>

        <div class="create-account mb-2" *ngIf="accountService.authenticated === true"><a (click)="accountService.logOut()" class="btn btn-outline-primary close-modal" >LOG OUT</a></div>
        <div class="create-account" *ngIf="accountService.authenticated === true"><a routerLink="/account" class="btn btn-outline-primary close-modal" >VIEW PROFILE</a></div>

      </div>
    </div>`
})
export class AccountServicesComponent implements OnInit {


  showResetForm = false;

  inputType = 'password';
  caps = false;

  logInForm: MilieuFormGroup;
  resetForm: MilieuFormGroup;
  submitted = false;
  serverMessage = '';
  loggedIn: boolean = null;
  model = new Account();

  constructor(private accountService: AccountService){

  }

  handleKeyboardEvent(event: KeyboardEvent) {
    this.caps = event.getModifierState( 'CapsLock' );
  }

  ngOnInit() {
    this.logInForm = new MilieuFormGroup({
      'password': new FormControl('', [Validators.required, Validators.minLength(this.accountService.password.min), Validators.maxLength(this.accountService.password.max), Validators.pattern(this.accountService.password.pattern)])
    });
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


  get password() { return this.logInForm.get('password') }
}

/* Copyright AEO all rights reserved */
