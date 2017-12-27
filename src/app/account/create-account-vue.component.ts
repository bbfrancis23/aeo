import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AccountService } from "./account.service";
import { Account } from './account';

"use strict";

@Component({
  selector: "create-account-vue",
  template: `
    <main class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <div class="card">
        <div class="card-header">Introduce Your Self</div>
          <div class="card-block">
            <form  (ngSubmit)="onSubmit();" [formGroup]="createAccountForm" #formCreateAccount="ngForm" *ngIf="accountCreated !== true">
              <div class="form-group">
                <label for="username" class="sr-only">User Name</label>
                <input id="username" class="form-control" formControlName="username" placeholder="User Name - Public" required (blur)="checkUserName()" [(ngModel)]="model.username" >
                <div *ngIf="username.invalid && username.touched" class="alert alert-danger">
                  <div *ngIf="username.errors.required">User Name is required.</div>
                  <div *ngIf="username.errors.minlength">User Name must be at least 4 characters.</div>
                  <div *ngIf="username.errors.minlength">User Name must not ve over characters.</div>
                  <div *ngIf="username.errors.pattern">User Name can only use Alpha Numberic characters and NO spaces.</div>
                </div>
                <div *ngIf="uniqueUser===false && username.touched"><br><div class="alert alert-danger">User Name is already Taken.</div></div>
              </div>
              <div class="form-group">
                <label for="email" class="sr-only">E-mail Address</label>
                <input id="email" class="form-control" formControlName="email" placeholder="E-Mail Address - Private" required (blur)="checkUniqueEmail()" [(ngModel)]="model.email">
                <div *ngIf="email.invalid && email.touched" class="alert alert-danger">
                  <div *ngIf="email.errors.required">E-mail Address is Required</div>
                  <div *ngIf="email.errors.email">E-mail Address is Invalid</div>
                </div>
                <div *ngIf="uniqueEmail===false && email.touched" class="alert alert-danger">E-mail Address has already been taken. <button>E-Mail Password Reset</button></div>
              </div>
              <div class="form-group">
                <label for="password" class="sr-only">Password</label>
                <input id="password" type="password" class="form-control "  formControlName="password" placeholder="Password" required [(ngModel)]="model.password">
                <div *ngIf="password.invalid && (password.touched)" class="alert alert-danger">
                  <div *ngIf="password.errors.required">Password is required.</div>
                  <div *ngIf="password.errors.minlength">Must be at least 4 character long.</div>
                </div>
              </div>
              <button type="submit" class="btn btn-outline-success float-right" [disabled]="createAccountForm.invalid || uniqueEmail === false || uniqueUser == false" >Create Account</button>

            </form>

            <div class="alert" [ngClass]="{'alert-success': accountCreated === true, 'alert-danger': accountCreated === false}" *ngIf="message">{{message}}</div>
          </div>
        </div>
      </div>
      <div class="col-md-3"></div>
    </main>`
})
export class CreateAccountVueComponent implements OnInit{
  createAccountForm: FormGroup;
  uniqueUser: boolean = null;
  uniqueEmail: boolean = null;
  model: Account = new Account();
  accountCreated = null;
  message = "";
  userNameParams = {min:4, max:16, pattern:/^[\w]+$/ };
  emailParams = {max: 64 };
  passwordParams = {min:4, max: 16};


  @Input() accountService: AccountService;

  ngOnInit(){
    this.createAccountForm = new FormGroup({
      'username': new FormControl('', [Validators.required, Validators.minLength(this.userNameParams.min), Validators.maxLength(this.userNameParams.max), Validators.pattern(this.userNameParams.pattern) ]),
      'email': new FormControl('', [Validators.required, Validators.maxLength(64), Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.maxLength(64), Validators.minLength(4)])
    });
  }

  onSubmit(): void {
    this.accountService.createItem(this.model).then((data)=>{
      this.accountCreated = data.created;
      this.message = data.message;
      console.log(this.message);
    });
  }

  checkUserName(){
    this.accountService.uniqueUserName(this.username.value).then((data)=>{
      this.uniqueUser = data;
    });
  }

  checkUniqueEmail(){
    this.accountService.uniqueEmail(this.email.value).then( data => {
      this.uniqueEmail = data;
    });
  }

  get username() { return this.createAccountForm.get('username'); }
  get email(){ return this.createAccountForm.get('email'); }
  get password(){ return this.createAccountForm.get('password'); }
}

/* Copyright AEO all rights reserved */
