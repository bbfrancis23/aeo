import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MilieuVue } from './milieu/milieu-vue';
import { MilieuService } from './milieu/milieu.service';

'use strict';

@Component({
  selector: 'aeo-log-in',
  template: `

      <div class="card border-primary log-in" >
        <div class="card-header bg-secondary"><h4>Log In</h4></div>
        <div class="card-block p-3" >
          <form  (ngSubmit)="onSubmit();" [formGroup]="logInForm" #formDir="ngForm">
            <div >
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
                    <button type="submit" class="btn btn-outline-success float-right" [disabled]="logInForm.invalid" >Log In</button><br><br>
                    <div class="alert" [ngClass]="{'alert-success': message === 'Login Successful', 'alert-danger': message !== 'Login Successful'}" *ngIf="message">{{message}}</div>
            </div>
          </form>
        </div>
      </div>`,
    styles:[`
      .log-in{
        position: fixed;
        right: 50px;
        z-index: 10000;
        width: 500px;
        box-shadow: 10px 10px 1px 0 rgba(0,0,0,0.3)
      }
    `]
})
export class AeoLogInComponent extends MilieuVue implements OnInit {
  submitted = false;
  logInForm: FormGroup;
  message: string;

  @Input() milieuService: any;

  //constructor(protected data: MilieuService) { super(data); }

  ngOnInit() {
    this.logInForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  onSubmit(): void {

    this.milieuService.login(this.logInForm.value).then((data)=>{
      this.message = data;
    });

    //this.message

    //console.log(this.message, 'here');
  }

  get email() { return this.logInForm.get('email') }
  get password() { return this.logInForm.get('password') }
}

/* Copyright AEO all rights reserved */
