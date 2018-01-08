import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from './account.service';
import { Account } from './account';

'use strict';

@Component({
  selector: 'account-services',
  template: `
    <div class="card" >
      <modal-controls></modal-controls>
      <div class="card-header" >{{this.accountService.authenticated ? 'Account' : 'Log In'}}</div>
      <div class="card-block" >
        <div *ngIf="accountService.authenticated === false">
          <form  (ngSubmit)="onSubmit();" [formGroup]="logInForm" #formLogIn="ngForm" *ngIf="!loggedIn">
              <div class="form-group">
                <label for="email" class="sr-only">Email</label>
                <input class="form-control" formControlName="email" placeholder="Email" required >
                <div *ngIf="email.invalid && (email.touched)" class="alert alert-danger">
                  <aside *ngIf="email.errors.required">Email is required.</aside>
                  <aside *ngIf="email.errors.minlength">Email must have at least {{accountService.email.min}} characters.</aside>
                  <aside *ngIf="email.errors.maxlength">Email can only have {{accountService.email.max}} characters.</aside>
                  <aside *ngIf="email.errors.email">Must be valid Email.</aside>
                </div>
              </div>
              <div class="form-group">
                <label for="email" class="sr-only">Password</label>
                  <input id="password" type="password" class="form-control "  formControlName="password" placeholder="Password" required>
                  <div *ngIf="password.invalid && (password.touched)" class="alert alert-danger">
                    <aside *ngIf="password.errors.required">Password is required.</aside>
                    <aside *ngIf="password.errors.minlength">Password must be at least {{accountService.password.min}}</aside>
                    <aside *ngIf="password.errors.maxlength">Password can only have {{accountService.password.max}} characters.</aside>
                    <aside *ngIf="password.errors.pattern">Invalid Password.</aside>
                  </div>
                </div>
              <button type="submit" class="btn btn-outline-success float-right" [disabled]="logInForm.invalid" >LOG IN</button><br><br>
          </form>
          <div class="alert" [ngClass]="{'alert-success': loggedIn, 'alert-danger': !loggedIn}" *ngIf="serverMessage">{{serverMessage}}</div>

          <div class="create-account" *ngIf="!accountService.authenticated" ><hr><a routerLink="account" class="btn btn-outline-primary close-modal" >CREATE ACCOUNT</a></div>
        </div>

        <div class="create-account mb-2" *ngIf="accountService.authenticated === true"><a (click)="accountService.logOut()" class="btn btn-outline-primary close-modal" >LOG OUT</a></div>
        <div class="create-account" *ngIf="accountService.authenticated === true"><a (click)="accountService.logOut()" class="btn btn-outline-primary close-modal" >VIEW PROFILE</a></div>
      </div>
    </div>`
})
export class AccountServicesComponent implements OnInit {

  title = this.accountService.authenticated ? 'Account' : 'Log In';

  logInForm: FormGroup;
  submitted = false;
  serverMessage = '';
  loggedIn: boolean = null;
  model = new Account();

  constructor(private accountService: AccountService){
  }

  ngOnInit() {
    this.logInForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.minLength(this.accountService.email.min),Validators.maxLength(this.accountService.email.max),Validators.email]),
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

  get email() { return this.logInForm.get('email') }
  get password() { return this.logInForm.get('password') }
}

/* Copyright AEO all rights reserved */
