import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

'use strict';

@Component({
  selector: 'app-log-in',
  template: `
    <div class="card" [ngClass]="{'border-danger': message && message !== 'Login Successful'}">
      <modal-controls></modal-controls>
      <div class="card-header"  [ngClass]="{'bg-danger': message && message !== 'Login Successful'}">Log In</div>
      <div class="card-block" >
        <form  (ngSubmit)="onSubmit();" [formGroup]="logInForm" #formLogIn="ngForm" *ngIf="message !== 'Login Successful'">
            <div class="form-group">
              <label for="email" class="sr-only">Email</label>
              <input id="email" class="form-control" formControlName="email" placeholder="Email" required >
              <div *ngIf="email.invalid && (email.touched)" class="alert alert-danger">
                <div *ngIf="email.errors.required">Email is required.</div>
                <div *ngIf="email.errors.email">Must be valid Email.</div>
              </div>
            </div>
            <div class="form-group">
              <label for="email" class="sr-only">Password</label>
                <input id="password" type="password" class="form-control "  formControlName="password" placeholder="Password" required>
                <div *ngIf="password.invalid && (password.touched)" class="alert alert-danger">
                  <div *ngIf="password.errors.required">Password is required.</div>
                  <div *ngIf="password.errors.minlength">Must be at least 4 character long.</div>
                </div>
              </div>
            <button type="submit" class="btn btn-outline-success float-right" [disabled]="logInForm.invalid" >LOG IN</button><br><br>
        </form>
        <div class="alert" [ngClass]="{'alert-success': message === 'Login Successful', 'alert-danger': message !== 'Login Successful'}" *ngIf="message">{{message}}</div>
        <hr>
        <div style="text-align: center"><a routerLink="account" class="btn btn-outline-primary" style="margin: 0 auto">CREATE ACCOUNT</a></div>
      </div>
    </div>`
})
export class AppLogInComponent implements OnInit {
  submitted = false;
  logInForm: FormGroup;
  message: string;

  @Input() milieuService: any;
  @Output() modalCloseEvent = new EventEmitter();

  ngOnInit() {
    this.logInForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  onSubmit(): void {
    this.milieuService.login(this.logInForm.value).then((data)=>{
      this.message = data;


      if(this.message === 'Login Successful'){
        setTimeout( () =>{
          this.modalCloseEvent.emit();
          this.logInForm.reset();
          this.message = null;
        }, 3000);
      }
    });
  }

  get email() { return this.logInForm.get('email') }
  get password() { return this.logInForm.get('password') }
}

/* Copyright AEO all rights reserved */
